/* Daily AI News Briefing — teaser gate.
 * Anonymous visitors see only up to "Key Takeaways"; signed-in readers get the full briefing.
 * Auth uses the same Firebase project (x-planner-99dd3) as X Planner / WordType / Secret Garden,
 * so one site account works everywhere. */
(function () {
  'use strict';

  var FB_CONFIG = {
    apiKey: "AIzaSyCHnVILIv_TKx9DcJ-07Z5smN0NUIhxrQw",
    authDomain: "x-planner-99dd3.firebaseapp.com",
    projectId: "x-planner-99dd3",
    appId: "1:146714833806:web:d1c4516985514f7c35eadf"
  };

  /* ---------- styles (self-contained) ---------- */
  var CSS = [
    ".ai-gate-banner{max-width:720px;margin:36px auto 48px;padding:32px 28px;background:#0e2a47;color:#f4f1ea;border-radius:14px;box-shadow:0 8px 28px rgba(10,25,45,.25);font-family:inherit;text-align:center}",
    ".ai-gate-banner h3{margin:0 0 8px;font-size:22px;color:#f4c95d;letter-spacing:.3px}",
    ".ai-gate-banner p.ai-gate-sub{margin:0 0 18px;font-size:14.5px;line-height:1.6;color:#d8dce3}",
    ".ai-gate-form{display:flex;flex-direction:column;gap:10px;max-width:360px;margin:0 auto}",
    ".ai-gate-form input{padding:11px 14px;border:1px solid #33507a;border-radius:8px;background:#fff;color:#16283f;font-size:15px}",
    ".ai-gate-form input:focus{outline:2px solid #f4c95d;border-color:#f4c95d}",
    ".ai-gate-row{display:flex;gap:10px;justify-content:center}",
    ".ai-gate-btn{flex:1;padding:11px 0;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer}",
    ".ai-gate-btn.primary{background:#f4c95d;color:#16283f}",
    ".ai-gate-btn.primary:hover{background:#ffd97a}",
    ".ai-gate-btn.ghost{background:transparent;color:#f4c95d;border:1px solid #f4c95d}",
    ".ai-gate-btn.ghost:hover{background:rgba(244,201,93,.12)}",
    ".ai-gate-btn:disabled{opacity:.55;cursor:wait}",
    ".ai-gate-err{min-height:20px;margin:6px 0 0;font-size:13.5px;color:#ff9d9d}",
    ".ai-gate-note{margin:14px 0 0;font-size:12.5px;color:#9fb0c8}",
    ".ai-gate-checking{max-width:720px;margin:36px auto 48px;padding:24px;text-align:center;color:#5a6b85;font-size:14px}"
  ].join("\n");
  var st = document.createElement("style");
  st.textContent = CSS;
  document.head.appendChild(st);

  /* ---------- find where the free preview ends ---------- */
  function gateAnchor() {
    var s = document.getElementById("key-takeaways");
    if (s) return s;
    var ul = document.querySelector("ul.takeaway-list");
    if (ul) return ul.closest("section") || ul.parentElement;
    var toc = document.querySelector(".toc-grid");
    if (toc) return toc;
    return null;
  }
  function isFooterish(el) {
    if (!el || el.nodeType !== 1) return false;
    var tag = el.tagName;
    if (tag === "FOOTER") return true;
    var c = " " + (el.className || "") + " ";
    return c.indexOf(" page-footer ") !== -1 || c.indexOf(" footer ") !== -1;
  }

  var anchor = gateAnchor();
  var hiddenEls = [];
  var banner = null;

  function lock() {
    if (!anchor || banner) return;
    var sib = anchor.nextElementSibling;
    while (sib) {
      var nxt = sib.nextElementSibling;
      if (!isFooterish(sib)) {
        hiddenEls.push({ el: sib, display: sib.style.display });
        sib.style.display = "none";
      }
      sib = nxt;
    }
    banner = document.createElement("div");
    banner.className = "ai-gate-banner";
    banner.id = "aiGateBanner";
    banner.innerHTML =
      "<h3>Continue reading</h3>" +
      "<p class='ai-gate-sub'>You have reached the end of the free preview.<br>Sign in to read the full briefing — article-level analysis, cross-article synthesis, and research directions.</p>" +
      "<div class='ai-gate-form'>" +
      "<input type='email' id='aiGateEmail' placeholder='Email address' autocomplete='email'>" +
      "<input type='password' id='aiGatePass' placeholder='Password' autocomplete='current-password'>" +
      "<div class='ai-gate-row'>" +
      "<button class='ai-gate-btn primary' id='aiGateSignIn'>Sign in</button>" +
      "<button class='ai-gate-btn ghost' id='aiGateSignUp'>Create account</button>" +
      "</div>" +
      "<p class='ai-gate-err' id='aiGateErr'></p>" +
      "</div>" +
      "<p class='ai-gate-note'>One account works across this site — X Planner, WordType, and the Daily AI News Briefing.</p>";
    anchor.parentNode.insertBefore(banner, anchor.nextSibling);
    wireForm();
  }

  function unlock() {
    hiddenEls.forEach(function (h) { h.el.style.display = h.display; });
    hiddenEls = [];
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function friendlyError(code) {
    switch (code) {
      case "auth/user-not-found": return "No account found with this email — try creating an account.";
      case "auth/wrong-password": return "Incorrect password. Please try again.";
      case "auth/invalid-email": return "That email address doesn't look right.";
      case "auth/email-already-in-use": return "This email already has an account — please sign in instead.";
      case "auth/weak-password": return "Please choose a password with at least 6 characters.";
      case "auth/too-many-requests": return "Too many attempts — please wait a moment and try again.";
      case "auth/network-request-failed": return "Network error — please check your connection and try again.";
      default: return "Something went wrong. Please try again.";
    }
  }

  function wireForm() {
    var emailEl = document.getElementById("aiGateEmail");
    var passEl = document.getElementById("aiGatePass");
    var errEl = document.getElementById("aiGateErr");
    var inBtn = document.getElementById("aiGateSignIn");
    var upBtn = document.getElementById("aiGateSignUp");
    function setErr(m) { errEl.textContent = m || ""; }
    function busy(b) { inBtn.disabled = b; upBtn.disabled = b; }
    function creds() { return { e: emailEl.value.trim(), p: passEl.value }; }
    inBtn.addEventListener("click", function () {
      var c = creds();
      if (!c.e || !c.p) { setErr("Please enter your email and password."); return; }
      setErr(""); busy(true);
      auth.signInWithEmailAndPassword(c.e, c.p).catch(function (e) { setErr(friendlyError(e.code)); busy(false); });
    });
    upBtn.addEventListener("click", function () {
      var c = creds();
      if (!c.e || !c.p) { setErr("Please enter your email and password."); return; }
      setErr(""); busy(true);
      auth.createUserWithEmailAndPassword(c.e, c.p).catch(function (e) { setErr(friendlyError(e.code)); busy(false); });
    });
    passEl.addEventListener("keydown", function (e) { if (e.key === "Enter") inBtn.click(); });
  }

  /* ---------- boot ---------- */
  // Lock immediately (before auth resolves) so anonymous visitors never see a flash of full content.
  lock();

  if (typeof firebase === "undefined") {
    var b = document.getElementById("aiGateBanner");
    if (b) {
      var p = b.querySelector(".ai-gate-sub");
      if (p) p.textContent = "Sign-in is unavailable right now (couldn't reach the authentication service). Please check your connection and reload.";
    }
    return;
  }
  try {
    if (!firebase.apps.length) firebase.initializeApp(FB_CONFIG);
  } catch (e) { return; }
  var auth = firebase.auth();
  try { auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) {}

  auth.onAuthStateChanged(function (user) {
    if (user) { unlock(); }
    else if (!banner) { lock(); }
  });
})();
