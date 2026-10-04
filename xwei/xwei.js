/* Xinyuan's Secret Garden (/xwei).
   Privacy model: nothing renders until Firebase confirms sign-in;
   all content lives in the Firestore doc xwei/{uid}, protected by
   owner-only rules. Shares one Firebase account with X Planner.
   Every page builds its UI from JS only after sign-in, so the
   static HTML holds no card names and no content. */
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
      return "That email or password doesn’t match. Passwords are at least 6 characters — check the spelling and try again.";
    if(c === "auth/invalid-email") return "That email address doesn’t look right. Check it and try again.";
    if(c === "auth/email-already-in-use") return "That email is already registered — just sign in instead.";
    if(c === "auth/weak-password") return "That password is too short — it needs at least 6 characters.";
    if(c === "auth/network-request-failed") return "Couldn’t reach Firebase. Check your connection and refresh.";
    if(c === "auth/too-many-requests") return "Too many attempts — you’ve been paused for a bit. Try again in a few minutes.";
    return "Sign-in didn’t work (" + (c || "unknown error") + "). Check your connection, email, and password, then try again.";
  }

  function injectGate(){
    const g = $("#gate");
    if(!g || g.dataset.built) return;
    g.dataset.built = "1";
    g.innerHTML =
      '<form id="gateForm" class="gate-card">' +
        '<div class="gate-emoji">🏡</div>' +
        '<h1 class="gate-title">Xinyuan’s Secret Garden</h1>' +
        '<p class="gate-sub">Sign in to see what’s inside.</p>' +
        '<label class="fld"><span>Email</span><input id="gateEmail" type="email" autocomplete="username" placeholder="you@example.com"></label>' +
        '<label class="fld"><span>Password</span><input id="gatePw" type="password" autocomplete="current-password" placeholder="At least 6 characters"></label>' +
        '<p id="gateErr" class="gate-err"></p>' +
        '<button class="btn primary" type="submit">Sign in</button>' +
        '<button class="btn ghost" type="button" id="gateRegister">New here? Create an account</button>' +
        '<p class="gate-note">Same account as X Planner. Nothing here is visible until you sign in.</p>' +
      '</form>';
  }

  function boot(startFn){
    injectGate();
    const gate = $("#gate"), app = $("#app"), err = $("#gateErr");
    const fail = m => { if(err) err.textContent = m; };
    if(typeof firebase === "undefined"){
      fail("The sign-in component didn’t load — check your connection and refresh. Don’t worry: nothing here shows while you’re signed out.");
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
    /* Subpages build their topbar (with #signOut) only after sign-in,
       so sign-out is handled by delegation rather than a direct bind. */
    document.addEventListener("click", e => {
      if(e.target && e.target.id === "signOut") auth.signOut();
    });
  }

  /* Hub cards live here (never in the hub's static HTML) and are
     rendered only after sign-in, so visitors see nothing but the
     login form on /xwei. */
  const HUB_CARDS = [
    {em: "📝", name: "Notes", desc: "A quiet notebook. Jot things down — they add up.", href: "/xwei/notes/"},
    {em: "🏠", name: "Digital Home", desc: "Imagining, and slowly building, my home of the future.", href: "/xwei/house/"},
    {em: "👯", name: "Digital Twins", desc: "Animated GIF stickers made from my own photos.", href: "/xwei/stickers/"},
    {em: "🌿", name: "My Life in a Few Years?", desc: "A sketch of the life I want. Add a line whenever it gets clearer.", href: "/xwei/life/"}
  ];

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
    hubCards: () => HUB_CARDS,
    storage: () => storageRef,
    user: () => user
  };
})();
