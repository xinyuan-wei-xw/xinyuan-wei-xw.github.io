/* X Planner — AI tasks (ai-tasks.js)
   Paste text or upload a document (.txt/.md/.pdf/.docx) → a free Gemini API key
   extracts tasks → you confirm → they are added to the right days' Tasks Today,
   and timed tasks are also written into empty Time-blocks slots.
   The API key lives ONLY in the user's own planner data (DB.aiKey → localStorage
   + their private Firestore doc). It is never in the repo. Loaded with defer after
   the main planner script, so all planner globals (DB, esc, pad, dayKey, getDay,
   save, render, openTaskDialog helpers) are available. */

const AI_DEFAULT_MODEL = "gemini-3.5-flash-lite";
const AI_FALLBACK_MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"];
const AI_MAX_CHARS = 30000;
const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const MAMMOTH_URL = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";

function aiKey(){ return (DB.aiKey || "").trim(); }
function aiModel(){ return (DB.aiModel || "").trim() || AI_DEFAULT_MODEL; }

/* ---------- document text extraction (all client-side) ---------- */
function aiLoadScript(src){
  return new Promise((res, rej)=>{
    if(document.querySelector('script[src="'+src+'"]')) return res();
    const s=document.createElement("script"); s.src=src;
    s.onload=()=>res(); s.onerror=()=>rej(new Error("解析库加载失败"));
    document.head.appendChild(s);
  });
}
function aiPdfText(buf){
  return aiLoadScript(PDFJS_URL).then(()=>{
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    return pdfjsLib.getDocument({data: buf}).promise;
  }).then(pdf=>{
    const ps=[];
    for(let i=1;i<=pdf.numPages;i++)
      ps.push(pdf.getPage(i).then(pg=>pg.getTextContent().then(tc=>tc.items.map(it=>it.str).join(" "))));
    return Promise.all(ps).then(pages=>pages.join("\n"));
  });
}
function aiDocxText(buf){
  return aiLoadScript(MAMMOTH_URL).then(()=>mammoth.extractRawText({arrayBuffer: buf})).then(r=>r.value);
}
function aiReadFile(f){
  const name=(f.name||"").toLowerCase();
  if(/\.(txt|md|markdown|text)$/.test(name))
    return new Promise((res,rej)=>{ const r=new FileReader();
      r.onload=()=>res(String(r.result||"")); r.onerror=()=>rej(new Error("读取失败"));
      r.readAsText(f); });
  if(name.endsWith(".pdf")) return f.arrayBuffer().then(aiPdfText);
  if(name.endsWith(".docx")) return f.arrayBuffer().then(aiDocxText);
  return Promise.reject(new Error("暂不支持该文件类型，请用 .txt / .md / .pdf / .docx"));
}

/* ---------- Gemini API (free tier) ---------- */
function aiPrompt(text){
  const now=new Date();
  const ds=now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日";
  const dw="日一二三四五六"[now.getDay()];
  return "今天是"+ds+"（星期"+dw+"）。请从以下文本中提取待办事项。只输出一个 JSON 数组，不要输出其他任何文字（不要 markdown 代码块标记）。\n"+
    "数组每个元素是一个对象，字段如下：\n"+
    "- title：任务标题（必填，简洁）\n"+
    "- date：YYYY-MM-DD。文本中的相对日期按今天换算（今天/明天/后天/大后天/本周X/下周X/X号/X月X日）；没有明确日期的任务用今天的日期。\n"+
    "- start：开始时间 HH:MM（24小时制）。只有文本明确提到开始时间才填，否则填 null。\n"+
    "- end：结束时间 HH:MM。只有文本明确提到结束时间才填，否则填 null。\n"+
    "- place：地点，没有则填 null。\n"+
    "- notes：备注，没有则填 null。\n文本：\n"+text;
}
function aiParseJson(t){
  t=String(t||"").trim().replace(/^```(json)?\s*/,"").replace(/\s*```$/,"");
  const a=JSON.parse(t);
  if(!Array.isArray(a)) throw new Error("AI 返回格式不对");
  const today=dayKey(new Date());
  return a.filter(x=>x&&x.title).map(x=>({
    title: String(x.title).slice(0,200),
    date: /^\d{4}-\d{2}-\d{2}$/.test(x.date||"") ? x.date : today,
    start: /^\d{2}:\d{2}$/.test(x.start||"") ? x.start : null,
    end: /^\d{2}:\d{2}$/.test(x.end||"") ? x.end : null,
    place: x.place ? String(x.place).slice(0,120) : "",
    notes: x.notes ? String(x.notes).slice(0,500) : ""
  }));
}
function aiCall(model, text, key){
  return fetch("https://generativelanguage.googleapis.com/v1beta/models/"+model+":generateContent?key="+encodeURIComponent(key),{
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ contents:[{parts:[{text: aiPrompt(text)}]}],
      generationConfig:{ responseMimeType:"application/json", temperature:0.2 } })
  }).then(res=>{
    if(res.status===404){ const e=new Error("model not found"); e.notFound=true; throw e; }
    if(res.status===400) throw new Error("key 无效或请求有误（400）");
    if(res.status===429) throw new Error("免费额度用完，请稍后再试（429）");
    if(!res.ok) throw new Error("AI 请求失败（"+res.status+"）");
    return res.json();
  }).then(j=>{
    const parts=j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts;
    return aiParseJson((parts||[]).map(p=>p.text||"").join(""));
  });
}
function aiExtract(text){
  const key=aiKey();
  if(!key) return Promise.reject(new Error("请先设置 API key"));
  const models=[aiModel()].concat(AI_FALLBACK_MODELS.filter(m=>m!==aiModel()));
  const attempt=i=>{
    if(i>=models.length) return Promise.reject(new Error("模型不可用，请检查 AI 设置中的模型名称"));
    return aiCall(models[i], text, key).catch(e=>e&&e.notFound?attempt(i+1):Promise.reject(e));
  };
  return attempt(0);
}

/* ---------- add confirmed tasks ---------- */
function aiBlockKey(hm){
  const m=/^(\d{2}):(\d{2})$/.exec(hm||""); if(!m) return null;
  let mins=(+m[1])*60+(+m[2]);
  if(mins<7*60||mins>22*60) return null;
  mins=Math.floor(mins/30)*30; if(mins>22*60) mins=22*60;
  return pad(Math.floor(mins/60))+":"+pad(mins%60);
}
function aiAddTasks(items, syncBlocks){
  items.forEach(it=>{
    const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(it.date||"");
    const dt=m?new Date(+m[1],+m[2]-1,+m[3]):new Date();
    const day=getDay(dt);
    day.top3.push({ t:it.title, d:false, place:it.place||"",
      time: it.start?it.date+"T"+it.start:"", end: it.end?it.date+"T"+it.end:"",
      notes: it.notes||"" });
    if(syncBlocks && it.start){
      const bk=aiBlockKey(it.start);
      if(bk && !day.blocks[bk]) day.blocks[bk]=it.title;
    }
  });
  save();
}

/* ---------- dialog ---------- */
function openAiTaskDialog(redraw){
  closeTaskDialog();
  const ov=document.createElement("div"); ov.id="taskDialog";
  ov.style.cssText="position:fixed;inset:0;background:rgba(28,52,84,.45);z-index:300;display:flex;align-items:center;justify-content:center;padding:24px";
  const box=document.createElement("div");
  box.style.cssText="background:#fff;border-radius:14px;max-width:620px;width:100%;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);max-height:88vh;overflow:auto";
  const labCss="display:block;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2b5488;margin:12px 0 4px";
  const inCss="width:100%;padding:9px 11px;border:1px solid #d9e4f0;border-radius:9px;font-size:14px;font-family:var(--sans);box-sizing:border-box";
  const btnPri="border:1px solid #4183c4;background:#4183c4;color:#fff;border-radius:9px;padding:8px 16px;cursor:pointer;font-weight:600";
  const btnSec="border:1px solid #d9e4f0;background:#fff;border-radius:9px;padding:8px 14px;cursor:pointer;font-weight:600";
  const hasKey=!!aiKey();
  box.innerHTML=
    '<b style="font-size:16px;color:#2b5488">✨ Create tasks with AI</b>'+
    '<div style="font-size:12.5px;color:#5a6875;margin-top:3px">粘贴文本或上传文档，AI 提取任务，你确认后写入对应日期；有时间的任务可同步到 Time blocks 的空格子。</div>'+
    '<div id="aiKeySec" style="'+(hasKey?"display:none":"")+'">'+
      '<label style="'+labCss+'">Gemini API key（免费）</label>'+
      '<input id="aiKeyIn" type="password" autocomplete="off" style="'+inCss+'" placeholder="粘贴你的 key，只保存在你的私人数据中">'+
      '<div style="display:flex;gap:10px;align-items:center;margin-top:8px;flex-wrap:wrap">'+
        '<button id="aiKeySave" style="'+btnSec+'">保存 key</button>'+
        '<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style="font-size:12.5px">去 aistudio.google.com 免费获取 →</a>'+
      '</div>'+
      '<label style="'+labCss+'">模型（默认即可）</label>'+
      '<input id="aiModelIn" autocomplete="off" style="'+inCss+'" value="'+esc(aiModel())+'">'+
      '<div style="font-size:11.5px;color:#8a97a3;margin-top:6px">免费版的内容 Google 可能用于改进产品；key 不在代码里，只在你的 planner 数据中。</div>'+
    '</div>'+
    (hasKey?'<div id="aiKeyOk" style="margin-top:8px;font-size:12.5px;color:#2b5488">✓ API key 已设置 <a href="#" id="aiKeyChange" style="font-size:12px">更换</a></div>':"")+
    '<div id="aiMain" style="'+(hasKey?"":"display:none")+'">'+
      '<label style="'+labCss+'">粘贴文本</label>'+
      '<textarea id="aiText" rows="6" style="'+inCss+';resize:vertical" placeholder="例如：明天上午9点开组会，讨论Q3计划；周五前交论文初稿；记得买牛奶和鸡蛋"></textarea>'+
      '<div style="display:flex;gap:10px;align-items:center;margin-top:10px;flex-wrap:wrap">'+
        '<label style="font-size:13px;color:#2b5488">或上传文档 <input id="aiFile" type="file" accept=".txt,.md,.markdown,.pdf,.docx" style="font-size:12.5px"></label>'+
        '<span id="aiFileName" style="font-size:12px;color:#8a97a3"></span>'+
      '</div>'+
      '<div style="margin-top:12px"><button id="aiGo" style="'+btnPri+'">生成任务</button><span id="aiStatus" style="font-size:12.5px;color:#8a97a3;margin-left:8px"></span></div>'+
      '<div id="aiResults" style="margin-top:10px"></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;align-items:center">'+
      '<label id="aiSyncWrap" style="font-size:12.5px;color:#5a6875;display:none;margin-right:auto"><input type="checkbox" id="aiSync" checked> 同步有时间的任务到 Time blocks</label>'+
      '<button id="aiCancel" style="'+btnSec+'">取消</button>'+
      '<button id="aiConfirm" style="'+btnPri+';opacity:.45" disabled>确认添加</button>'+
    '</div>';
  ov.appendChild(box); document.body.appendChild(ov);

  const $=id=>box.querySelector("#"+id);
  const status=t=>{ $("aiStatus").textContent=t; };
  ov.addEventListener("click",e=>{ if(e.target===ov) closeTaskDialog(); });
  box.addEventListener("keydown",e=>{ if(e.key==="Escape") closeTaskDialog(); });
  $("aiCancel").onclick=closeTaskDialog;
  const keySec=$("aiKeySec"), main=$("aiMain");
  const chg=$("aiKeyChange");
  if(chg) chg.onclick=e=>{ e.preventDefault(); const ok=$("aiKeyOk"); if(ok) ok.style.display="none"; keySec.style.display=""; main.style.display="none"; };
  $("aiKeySave").onclick=()=>{
    const k=$("aiKeyIn").value.trim();
    if(!k){ $("aiKeyIn").focus(); return; }
    DB.aiKey=k; DB.aiModel=$("aiModelIn").value.trim()||AI_DEFAULT_MODEL;
    save(); keySec.style.display="none"; main.style.display="";
    const ok=$("aiKeyOk"); if(ok) ok.style.display=""; else status("key 已保存");
  };
  $("aiFile").addEventListener("change",e=>{ const f=e.target.files[0]; $("aiFileName").textContent=f?f.name:""; });

  function renderResults(items){
    const wrap=$("aiResults"); wrap.innerHTML="";
    if(!items.length){ status("没有识别出任务，换个说法试试"); return; }
    items.forEach(it=>{
      const r=document.createElement("label");
      r.style.cssText="display:flex;gap:8px;align-items:flex-start;padding:8px 10px;border:1px solid #e3ecf5;border-radius:9px;margin-bottom:6px;cursor:pointer;font-size:13.5px";
      const tm=it.start?(" "+it.start+(it.end?"–"+it.end:"")):"";
      r.innerHTML='<input type="checkbox" checked style="margin-top:3px;flex:none"><span><b>'+esc(it.title)+'</b>'+
        '<span style="color:#5a6875"> · '+esc(it.date)+esc(tm)+'</span>'+
        (it.place?'<span style="color:#5a6875"> · 📍'+esc(it.place)+'</span>':"")+
        (it.notes?'<div style="color:#8a97a3;font-size:12px">'+esc(it.notes)+'</div>':"")+'</span>';
      wrap.appendChild(r);
    });
    const syncW=$("aiSyncWrap"), cf=$("aiConfirm");
    syncW.style.display=""; cf.disabled=false; cf.style.opacity="";
    const recount=()=>{
      const n=wrap.querySelectorAll("input:checked").length;
      cf.textContent="确认添加 ("+n+")"; cf.disabled=!n; cf.style.opacity=n?"":"0.45";
    };
    wrap.onchange=recount; recount();
    cf.onclick=()=>{
      const picked=[];
      wrap.querySelectorAll("label").forEach((lab,i)=>{ if(lab.querySelector("input").checked) picked.push(items[i]); });
      if(!picked.length) return;
      aiAddTasks(picked, $("aiSync").checked);
      closeTaskDialog(); redraw();
    };
  }

  $("aiGo").onclick=()=>{
    const f=$("aiFile").files[0];
    const txt=$("aiText").value.trim();
    if(!f&&!txt){ status("请粘贴文本或选择文档"); return; }
    const go=$("aiGo"); go.disabled=true; go.style.opacity=".5";
    $("aiResults").innerHTML=""; $("aiConfirm").disabled=true; $("aiConfirm").style.opacity=".45";
    status("AI 识别中…");
    const done=ok=>{ go.disabled=false; go.style.opacity=""; if(!ok) $("aiSyncWrap").style.display="none"; };
    const got=text=>{
      text=String(text||"").trim();
      if(!text){ status("文档里没有读到文字"); done(false); return; }
      let cut="";
      if(text.length>AI_MAX_CHARS){ text=text.slice(0,AI_MAX_CHARS); cut="（文档较长，已取前 "+AI_MAX_CHARS+" 字）"; }
      aiExtract(text).then(items=>{ renderResults(items); status("识别出 "+items.length+" 个任务"+cut); done(true); })
        .catch(err=>{ status("出错："+err.message+cut); done(false); });
    };
    if(f) aiReadFile(f).then(got).catch(err=>{ status("文档读取失败："+err.message); done(false); });
    else got(txt);
  };
}

/* ---------- keyboard shortcut: Cmd/Ctrl + Shift + A (Mac-first) ---------- */
document.addEventListener("keydown",e=>{
  if(!(e.metaKey||e.ctrlKey)||!e.shiftKey) return;
  if((e.key||"").toLowerCase()!=="a") return;
  const t=e.target;
  if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)) return;
  if(typeof locked!=="undefined"&&locked) return;
  e.preventDefault();
  openAiTaskDialog(()=>{ if(typeof render==="function") render(); });
});
