/* X Planner — AI tasks button (ai-tasks-btn.js)
   Wires the "✨ AI tasks" header button (right of Today).
   Kept as a separate tiny file so the main page only needs a one-tag append.
   Loaded with defer after ai-tasks.js; runs after the main planner script. */
(function(){
  "use strict";
  function wire(){
    if(typeof openAiTaskDialog!=="function")return;
    const b=document.getElementById("aiTasksBtn");
    if(!b||b.getAttribute("data-ai-wired"))return;
    b.setAttribute("data-ai-wired","1");
    b.title="Paste text or upload a document — AI creates the tasks (Cmd/Ctrl+Shift+A)";
    b.addEventListener("click",()=>{
      if(typeof locked!=="undefined"&&locked)return;
      openAiTaskDialog(()=>{if(typeof render==="function")render();});
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wire);
  else wire();
})();
