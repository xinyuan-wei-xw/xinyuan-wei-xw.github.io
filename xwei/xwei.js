/* xwei — 只属于 Xinyuan 的小角落。
   隐私模型：Firebase 没确认登录之前，页面什么内容都不渲染；
   内容存在 Firestore 的 xwei/{uid} 文档里，靠 owner-only 规则保护。
   与 X Planner 共用同一个 Firebase 账号。 */
const firebaseConfig = {
  "apiKey": "AIzaSyCHnVILIv_TKx9DcJ-07Z5smN0NUIhxrQw",
  "authDomain": "x-planner-99dd3.firebaseapp.com",
  "projectId": "x-planner-99dd3",
  "appId": "1:146714833806:web:d1c4516985514f7c35eadf"
};

const XW = (() => {
  let db = null, storageRef = null, user = null;
  const $ = s => document.querySelector(s);

  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  let uidN = 0;
  function uid(){
    uidN = (uidN + 1) % 46656;
    return "x" + Date.now().toString(36) +
      Math.floor(Math.random()*46656).toString(36) + uidN.toString(36);
  }

  function authErrText(er){
    const c = er && er.code || "";
    if(c === "auth/invalid-credential" || c === "auth/wrong-password" || c === "auth/user-not-found")
      return "邮箱或密码不对。密码至少 6 位；确认邮箱拼写后再试一次。";
    if(c === "auth/invalid-email") return "邮箱格式看起来不对，检查一下再试。";
    if(c === "auth/email-already-in-use") return "这个邮箱已经注册过了，直接点登录就好。";
    if(c === "auth/weak-password") return "密码太短了，至少要 6 位。";
    if(c === "auth/network-request-failed") return "网络连不上 Firebase，检查网络后刷新再试。";
    if(c === "auth/too-many-requests") return "试太多次被暂时拦住了，过几分钟再来。";
    return "登录没成功（" + (c || "未知错误") + "）。检查网络和邮箱密码后再试。";
  }

  function injectGate(){
    const g = $("#gate");
    if(!g || g.dataset.built) return;
    g.dataset.built = "1";
    g.innerHTML =
      '<form id="gateForm" class="gate-card">' +
        '<div class="gate-emoji">🏡</div>' +
        '<h1 class="gate-title">我的小角落</h1>' +
        '<p class="gate-sub">这里只属于你。登录后才能看到里面的内容。</p>' +
        '<label class="fld"><span>邮箱</span><input id="gateEmail" type="email" autocomplete="username" placeholder="you@example.com"></label>' +
        '<label class="fld"><span>密码</span><input id="gatePw" type="password" autocomplete="current-password" placeholder="至少 6 位"></label>' +
        '<p id="gateErr" class="gate-err"></p>' +
        '<button class="btn primary" type="submit">登录</button>' +
        '<button class="btn ghost" type="button" id="gateRegister">第一次来？注册账号</button>' +
        '<p class="gate-note">和 X Planner 用同一个账号。没登录时，这里什么都不显示。</p>' +
      '</form>';
  }

  function boot(startFn){
    injectGate();
    const gate = $("#gate"), app = $("#app"), err = $("#gateErr");
    const fail = m => { if(err) err.textContent = m; };
    if(typeof firebase === "undefined"){
      fail("登录组件没加载成功 — 检查网络后刷新。放心，未登录时你的内容不会显示。");
      return;
    }
    try{
      firebase.initializeApp(firebaseConfig);
    }catch(e){ /* already initialized on this page */ }
    db = firebase.firestore();
    storageRef = firebase.storage();
    const auth = firebase.auth();
    auth.onAuthStateChanged(u => {
      user = u;
      if(u){
        if(gate) gate.style.display = "none";
        if(app) app.style.display = "";
        if(err) err.textContent = "";
        startFn(u);
      }else{
        if(gate) gate.style.display = "";
        if(app) app.style.display = "none";
      }
    });
    const form = $("#gateForm");
    if(form){
      form.addEventListener("submit", e => {
        e.preventDefault();
        const em = $("#gateEmail").value.trim(), pw = $("#gatePw").value;
        fail("");
        auth.signInWithEmailAndPassword(em, pw).catch(er => fail(authErrText(er)));
      });
      const reg = $("#gateRegister");
      if(reg) reg.addEventListener("click", () => {
        const em = $("#gateEmail").value.trim(), pw = $("#gatePw").value;
        fail("");
        auth.createUserWithEmailAndPassword(em, pw).catch(er => fail(authErrText(er)));
      });
    }
    const out = $("#signOut");
    if(out) out.addEventListener("click", () => auth.signOut());
  }

  function doc(){ return db.collection("xwei").doc(user.uid); }

  function showRulesHint(){
    const b = $("#rulesHint");
    if(b) b.style.display = "";
  }

  function load(){
    return doc().get()
      .then(s => s.exists ? s.data() : {})
      .catch(e => { if(e && e.code === "permission-denied") showRulesHint(); throw e; });
  }

  function save(key, val){
    return doc().set({[key]: val}, {merge: true})
      .catch(e => { if(e && e.code === "permission-denied") showRulesHint(); throw e; });
  }

  return {
    boot, load, save, esc, uid,
    storage: () => storageRef,
    user: () => user
  };
})();
