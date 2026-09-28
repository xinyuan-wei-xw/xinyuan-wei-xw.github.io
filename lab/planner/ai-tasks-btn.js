/* X Planner — AI tasks button (ai-tasks-btn.js)
   Wires the "✨ AI tasks" button next to "+ add task" in the Tasks Today panel.
   Kept as a separate tiny file so the main page only needs a one-tag append.
   Loaded with defer after ai-tasks.js; runs after the main planner script. */
(function(){
  "use strict";
  if(typeof tasksTodayPanel!=="function"||typeof openAiTaskDialog!=="function")return;
  const _ttp=tasksTodayPanel;
  tasksTodayPanel=function(d,syncMatrix){
    const r=_ttp(d,syncMatrix);
    try{
      const btns=r.el.querySelectorAll("button.addbtn");
      let addBtn=null;
      for(let i=0;i<btns.length;i++){if(btns[i].textContent.trim()==="+ add task"){addBtn=btns[i];break;}}
      if(addBtn){
        const sib=addBtn.nextElementSibling;
        if(!sib||!sib.getAttribute("data-ai-btn")){
          const aib=document.createElement("button");
          aib.className="addbtn";aib.setAttribute("data-ai-btn","1");aib.textContent="✨ AI tasks";
          aib.title="Paste text or upload a document — AI creates the tasks (Cmd/Ctrl+Shift+A)";
          aib.addEventListener("click",()=>openAiTaskDialog(()=>r.redraw()));
          addBtn.insertAdjacentElement("afterend",aib);
        }
      }
    }catch(e){}
    return r;
  };
})();
