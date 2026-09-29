/* X Planner — AI tasks (ai-tasks.js)
   Paste text or upload a document (.txt/.md/.pdf/.docx) → a free Gemini API key
   extracts tasks → you confirm → they are added to the right days' Tasks Today,
   and timed tasks are also written into empty Time-blocks slots.
   If a document was uploaded, it is also uploaded to the user's own Firebase
   Storage and attached to the created tasks (downloadable via the 📄 chip).
   The API key lives ONLY in the user's own data: a dedicated device-local
   slot (primary) plus DB.aiKey (so it can roam via cloud sync). It is never
   in the repo. Loaded with defer after the main planner script, so all planner
   globals (DB, esc, pad, dayKey, getDay, save, render, fbUser, fstore, newMid,
   openTaskDialog helpers) are available. */

const AI_DEFAULT_MODEL = "gemini-2.5-flash";
const AI_KEY_LS = "xplanner.geminiKey";
const AI_MAX_FILE_MB = 15;
const AI_FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];
const AI_MAX_CHARS = 30000;
const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const MAMMOTH_URL = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";

function aiKey(){
  try{ const l=localStorage.getItem(AI_KEY_LS); if(l&&l.trim()) return l.trim(); }catch(e){}
  return (DB.aiKey || "").trim();
}
function aiSaveKey(k){
  try{ localStorage.setItem(AI_KEY_LS, k); }catch(e){}
  DB.aiKey = k;
}
function aiModel(){ return (DB.aiModel || "").trim() || AI_DEFAULT_MODEL; }

/* ---------- document text extraction (all client-side) ---------- */
function aiLoadScript(src){
  return new Promise((res, rej)=>{
    if(document.querySelector('script[src="'+src+'"]')) return res();
    const s=document.createElement("script"); s.src=src;
    s.onload=()=>res(); s.onerror=()=>rej(new Error("Parser library failed to load"));
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
      r.onload=()=>res(String(r.result||"")); r.onerror=()=>rej(new Error("Read failed"));
      r.readAsText(f); });
  if(name.endsWith(".pdf")) return f.arrayBuffer().then(aiPdfText);
  if(name.endsWith(".docx")) return f.arrayBuffer().then(aiDocxText);
  return Promise.reject(new Error("File type not supported — please use .txt / .md / .pdf / .docx"));
}

/* ---------- Gemini API (free tier) ---------- */
function aiPrompt(text){
  const now=new Date();
  const ds=now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日";
  const dw="日一二三四五六"[now.getDay()];
  return "今天是"+ds+"（星期"+dw+"）。请从以下文本中提取待办事项。只输出一个 JSON 数组，不要输出其他任何文字（不要 markdown 代码块标记）。\n"+
    "数组每个元素是一个对象，字段如下：\n"+
    "- title：任务标题（必填，简洁；会议/答辩/讲座类请写清事件类型和人物或主题，例如“Caroline Gavin 学位论文开题答辩”）\n"+
    "- date：YYYY-MM-DD。文本中的相对日期按今天换算（今天/明天/后天/大后天/本周X/下周X/X号/X月X日）；没有明确日期的任务用今天的日期。\n"+
    "- start：开始时间 HH:MM（24小时制）。只有文本明确提到开始时间才填，否则填 null。\n"+
    "- end：结束时间 HH:MM。只有文本明确提到结束时间才填，否则填 null。\n"+
    "- place：地点；线上会议则填会议链接（如 Teams/Zoom 入会链接），没有则填 null。\n"+
    "- notes：备注。会议/答辩类请包含参会信息（会议号、密码等）；如果文本附带了摘要或正文，把摘要/要点也写入 notes。没有则填 null。\n文本：\n"+text;
}
function aiParseJson(t){
  t=String(t||"").trim().replace(/^```(json)?\s*/,"").replace(/\s*```$/,"");
  const a=JSON.parse(t);
  if(!Array.isArray(a)) throw new Error("AI returned an unexpected format");
  const today=dayKey(new Date());
  return a.filter(x=>x&&x.title).map(x=>({
    title: String(x.title).slice(0,200),
    date: /^\d{4}-\d{2}-\d{2}$/.test(x.date||"") ? x.date : today,
    start: /^\d{2}:\d{2}$/.test(x.start||"") ? x.start : null,
    end: /^\d{2}:\d{2}$/.test(x.end||"") ? x.end : null,
    place: x.place ? String(x.place).slice(0,300) : "",
    notes: x.notes ? String(x.notes).slice(0,2500) : ""
  }));
}
function aiCall(model, text, key){
  return fetch("https://generativelanguage.googleapis.com/v1beta/models/"+model+":generateContent?key="+encodeURIComponent(key),{
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ contents:[{parts:[{text: aiPrompt(text)}]}],
      generationConfig:{ responseMimeType:"application/json", temperature:0.2 } })
  }).then(res=>{
    if(res.status===404){ const e=new Error("model not found"); e.retryable=true; throw e; }
    if(res.status===400) throw new Error("Invalid key or bad request (400)");
    if(res.status===429) throw new Error("Free quota exhausted — please try again later (429)");
    if(res.status===500||res.status===503||res.status===529){ const e=new Error("AI request failed ("+res.status+")"); e.retryable=true; throw e; }
    if(!res.ok) throw new Error("AI request failed ("+res.status+")");
    return res.json();
  }).then(j=>{
    const parts=j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts;
    return aiParseJson((parts||[]).map(p=>p.text||"").join(""));
  });
}
function aiExtract(text){
  const key=aiKey();
  if(!key) return Promise.reject(new Error("Please set your API key first"));
  const models=[aiModel()].concat(AI_FALLBACK_MODELS.filter(m=>m!==aiModel()));
  const attempt=i=>{
    if(i>=models.length) return Promise.reject(new Error("AI models are temporarily unavailable — please try again later"));
    return aiCall(models[i], text, key).catch(e=>e&&e.retryable?attempt(i+1):Promise.reject(e));
  };
  return attempt(0);
}

/* ---------- add confirmed tasks ---------- */
function aiBlockKeys(start,end){
  const keys=[];
  const p=/^(\d{2}):(\d{2})$/;
  const ms=p.exec(start||""), me=p.exec(end||"");
  if(!ms) return keys;
  let s=(+ms[1])*60+(+ms[2]);
  let e=me?(+me[1])*60+(+me[2]):s+30;
  if(!(e>s)) e=s+30;
  s=Math.floor(s/30)*30;
  for(let m=s;m<e&&m<=22*60;m+=30){
    if(m<7*60) continue;
    keys.push(pad(Math.floor(m/60))+":"+pad(m%60));
  }
  return keys;
}
function aiNewId(){
  try{ if(typeof newMid==="function") return newMid(); }catch(e){}
  return "m"+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36);
}
function aiAddTasks(items, syncBlocks){
  const created=[];
  items.forEach(it=>{
    const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(it.date||"");
    const dt=m?new Date(+m[1],+m[2]-1,+m[3]):new Date();
    const day=getDay(dt);
    const task={ id:aiNewId(), t:it.title, d:false, place:it.place||"",
      time: it.start?it.date+"T"+it.start:"", end: it.end?it.date+"T"+it.end:"",
      due: it.start?it.date+"T"+it.start:it.date, dueEnd: it.end?it.date+"T"+it.end:"",
      quad:1, added:Date.now(), notes: it.notes||"", files:[] };
    day.top3.push(task);
    try{ DB.matrix=DB.matrix||[]; DB.matrix.push(task); }catch(e){}
    created.push(task);
    if(syncBlocks && it.start){
      aiBlockKeys(it.start,it.end).forEach(bk=>{ if(!day.blocks[bk]) day.blocks[bk]=it.title; });
    }
  });
  save();
  return created;
}
function aiAttachFile(tasks, file, redraw){
  if(!file||!tasks.length) return;
  const fbU=(typeof fbUser!=="undefined")?fbUser:null;
  const fs=(typeof fstore!=="undefined")?fstore:null;
  if(!fbU||!fs) return;
  if(file.size>AI_MAX_FILE_MB*1024*1024){ alert("Attachment exceeds "+AI_MAX_FILE_MB+" MB — not attached to the tasks."); return; }
  const path="users/"+fbU.uid+"/task-files/"+aiNewId()+"/"+file.name;
  fs.ref(path).put(file).then(snap=>snap.ref.getDownloadURL()).then(url=>{
    tasks.forEach(t=>{ t.files=t.files||[]; t.files.push({name:file.name,url:url,path:path}); });
    save(); redraw();
  }).catch(err=>{ alert("Attachment upload failed: "+((err&&err.message)||err)); });
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
    '<div style="font-size:12.5px;color:#5a6875;margin-top:3px">Paste text or upload a document — AI extracts the tasks. On confirm they go to each date\u2019s Tasks Today and the Eisenhower matrix (default: Not important \u00b7 Not urgent). Timed tasks can also sync into empty Time-blocks slots. An uploaded document is attached to the created tasks.</div>'+
    '<div id="aiKeySec" style="'+(hasKey?"display:none":"")+'">'+
      '<label style="'+labCss+'">Gemini API key (free)</label>'+
      '<input id="aiKeyIn" type="password" autocomplete="off" style="'+inCss+'" placeholder="Paste your key — it lives only in your private data">'+
      '<div style="display:flex;gap:10px;align-items:center;margin-top:8px;flex-wrap:wrap">'+
        '<button id="aiKeySave" style="'+btnSec+'">Save key</button>'+
        '<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style="font-size:12.5px">Get one free at aistudio.google.com →</a>'+
      '</div>'+
      '<label style="'+labCss+'">Model (the default is fine)</label>'+
      '<input id="aiModelIn" autocomplete="off" style="'+inCss+'" value="'+esc(aiModel())+'">'+
      '<div style="font-size:11.5px;color:#8a97a3;margin-top:6px">Free-tier content may be used by Google to improve its products. The key is not in the code — only in your planner data.</div>'+
    '</div>'+
    (hasKey?'<div id="aiKeyOk" style="margin-top:8px;font-size:12.5px;color:#2b5488">✓ API key is set <a href="#" id="aiKeyChange" style="font-size:12px">Change</a></div>':"")+
    '<div id="aiMain" style="'+(hasKey?"":"display:none")+'">'+
      '<label style="'+labCss+'">Paste text</label>'+
      '<textarea id="aiText" rows="6" style="'+inCss+';resize:vertical" placeholder="e.g.: Team meeting tomorrow at 9am to discuss the Q3 plan; paper draft due Friday; buy milk and eggs"></textarea>'+
      '<div style="display:flex;gap:10px;align-items:center;margin-top:10px;flex-wrap:wrap">'+
        '<label style="font-size:13px;color:#2b5488">Or upload a document <input id="aiFile" type="file" accept=".txt,.md,.markdown,.pdf,.docx" style="font-size:12.5px"></label>'+
        '<span id="aiFileName" style="font-size:12px;color:#8a97a3"></span>'+
      '</div>'+
      '<div style="margin-top:12px"><button id="aiGo" style="'+btnPri+'">Generate tasks</button><span id="aiStatus" style="font-size:12.5px;color:#8a97a3;margin-left:8px"></span></div>'+
      '<div id="aiResults" style="margin-top:10px"></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;align-items:center">'+
      '<label id="aiSyncWrap" style="font-size:12.5px;color:#5a6875;display:none;margin-right:auto"><input type="checkbox" id="aiSync" checked> Sync timed tasks into every Time block they span</label>'+
      '<button id="aiCancel" style="'+btnSec+'">Cancel</button>'+
      '<button id="aiConfirm" style="'+btnPri+';opacity:.45" disabled>Add</button>'+
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
    aiSaveKey(k); DB.aiModel=$("aiModelIn").value.trim()||AI_DEFAULT_MODEL;
    save(); keySec.style.display="none"; main.style.display="";
    const ok=$("aiKeyOk"); if(ok) ok.style.display=""; else status("key saved");
  };
    let aiPickedFile=null;
  $("aiFile").addEventListener("change",e=>{
    const f=e.target.files[0]||null; aiPickedFile=f;
    $("aiFileName").textContent=f?(f.name+" (attached to the tasks on confirm)"):"";
  });

  function aiPlaceHtml(place){
    if(!place) return "";
    if(/^https?:\/\//i.test(place))
      return ' · 📍<a href="'+esc(place)+'" target="_blank" rel="noopener">Meeting link</a>';
    return ' · 📍'+esc(place);
  }
  function renderResults(items){
    const wrap=$("aiResults"); wrap.innerHTML="";
    wrap.style.maxHeight="46vh"; wrap.style.overflowY="auto"; wrap.style.paddingRight="2px";
    if(!items.length){ status("No tasks recognized — try rephrasing"); return; }
    if(aiPickedFile){
      const att=document.createElement("div");
      att.style.cssText="font-size:12.5px;color:#2b5488;margin-bottom:8px";
      att.textContent="📎 Attachment: "+aiPickedFile.name+" (uploaded and attached to the selected tasks on confirm)";
      wrap.appendChild(att);
    }
    const rows=[];
    items.forEach(it=>{
      const r=document.createElement("div");
      r.style.cssText="padding:10px 12px;border:1px solid #e3ecf5;border-radius:9px;margin-bottom:8px;font-size:13.5px;background:#fbfdfe";
      r.innerHTML=
        '<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">'+
          '<input type="checkbox" data-k="pick" checked style="flex:none;width:16px;height:16px">'+
          '<input data-k="title" value="'+esc(it.title)+'" placeholder="Task title" style="'+inCss+';flex:1;font-weight:600;padding:7px 9px">'+
        '</div>'+
        '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:6px">'+
          '<label style="font-size:12.5px;color:#5a6875">Date <input type="date" data-k="date" value="'+esc(it.date||"")+'" style="'+inCss+';width:auto;padding:6px 8px"></label>'+
          '<label style="font-size:12.5px;color:#5a6875">Start <input type="time" data-k="start" value="'+esc(it.start||"")+'" style="'+inCss+';width:auto;padding:6px 8px"></label>'+
          '<label style="font-size:12.5px;color:#5a6875">End <input type="time" data-k="end" value="'+esc(it.end||"")+'" style="'+inCss+';width:auto;padding:6px 8px"></label>'+
        '</div>'+
        '<div style="margin-bottom:6px"><input data-k="place" value="'+esc(it.place||"")+'" placeholder="Location" style="'+inCss+';width:100%;padding:7px 9px"></div>'+
        '<div><textarea data-k="notes" rows="2" placeholder="Notes" style="'+inCss+';width:100%;resize:vertical;padding:7px 9px">'+esc(it.notes||"")+'</textarea></div>';
      wrap.appendChild(r); rows.push(r);
    });
    const syncW=$("aiSyncWrap"), cf=$("aiConfirm");
    syncW.style.display=""; cf.disabled=false; cf.style.opacity="";
    const recount=()=>{
      const n=rows.filter(r=>r.querySelector('[data-k="pick"]').checked).length;
      cf.textContent="Add ("+n+")"; cf.disabled=!n; cf.style.opacity=n?"":"0.45";
    };
    wrap.onchange=recount; recount();
    cf.onclick=()=>{
      const picked=[];
      rows.forEach(r=>{
        if(!r.querySelector('[data-k="pick"]').checked) return;
        const v=k=>{ const el=r.querySelector('[data-k="'+k+'"]'); return el?el.value.trim():""; };
        const t=v("title"); if(!t) return;
        picked.push({title:t, date:v("date"), start:v("start"), end:v("end"), place:v("place"), notes:v("notes")});
      });
      if(!picked.length) return;
      const tasks=aiAddTasks(picked, $("aiSync").checked);
      const f=aiPickedFile;
      closeTaskDialog(); redraw();
      aiAttachFile(tasks, f, redraw); /* uploads in background; 📄 chip appears when done */
    };
  }

  $("aiGo").onclick=()=>{
    const f=$("aiFile").files[0];
    const txt=$("aiText").value.trim();
    if(!f&&!txt){ status("Please paste text or choose a document"); return; }
    const go=$("aiGo"); go.disabled=true; go.style.opacity=".5";
    $("aiResults").innerHTML=""; $("aiConfirm").disabled=true; $("aiConfirm").style.opacity=".45";
    status("Reading with AI…");
    const done=ok=>{ go.disabled=false; go.style.opacity=""; if(!ok) $("aiSyncWrap").style.display="none"; };
    const got=text=>{
      text=String(text||"").trim();
      if(!text){ status("No text found in the document"); done(false); return; }
      let cut="";
      if(text.length>AI_MAX_CHARS){ text=text.slice(0,AI_MAX_CHARS); cut=" (document is long — using the first "+AI_MAX_CHARS+" characters)"; }
      aiExtract(text).then(items=>{ renderResults(items); status("Found "+items.length+" task(s)"+cut); done(true); })
        .catch(err=>{ status("Error: "+err.message+cut); done(false); });
    };
    if(f) aiReadFile(f).then(got).catch(err=>{ status("Document read failed: "+err.message); done(false); });
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
