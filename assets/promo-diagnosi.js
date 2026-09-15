/* ============================================================
   AI OSHA — Barra fissa "Diagnosi AI su misura" (in alto, su tutto il sito)
   Non compare sulle pagine /diagnosi/. Si chiude con la X (resta chiusa 3 giorni).
   Sposta in basso gli header fissi/sticky, come la fascia di agosto.
   Fino al 31 ottobre 2026 mostra il prezzo di lancio; dal 1° novembre senza prezzo.
   ============================================================ */
(function () {
  "use strict";
  if (/\/diagnosi(\/|$)/.test(location.pathname)) return;
  if (window.__dgBarLoaded) return;
  window.__dgBarLoaded = true;

  var KEY = "aio_dg_bar_chiusa";
  try {
    var chiusa = +localStorage.getItem(KEY) || 0;
    if (chiusa && Date.now() - chiusa < 3 * 864e5) return;
  } catch (e) {}

  var LANCIO = Date.now() < new Date(2026, 10, 1, 0, 0, 0).getTime();
  var LINK = "/diagnosi/?src=barra";

  var css = document.createElement("style");
  css.textContent =
    "#dg-bar{position:fixed;top:0;left:0;right:0;z-index:2147483000;background:#1E3A5F;color:#fff;" +
    "font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
    "border-bottom:2px solid #F5A623;box-shadow:0 2px 14px rgba(0,0,0,.18)}" +
    "#dg-bar .in{position:relative;max-width:1180px;margin:0 auto;min-height:50px;display:flex;align-items:center;" +
    "justify-content:center;gap:16px;padding:7px 48px 7px 16px}" +
    "#dg-bar .txt{font-size:15px;line-height:1.3;font-weight:500;color:#e6eef7}" +
    "#dg-bar .txt b{font-weight:800;color:#fff}" +
    "#dg-bar .pr{color:#F5A623;font-weight:800;white-space:nowrap}" +
    "#dg-bar .sep{opacity:.45;margin:0 7px}" +
    "#dg-bar .cta{flex:none;display:inline-flex;align-items:center;min-height:38px;background:#F5A623;color:#16202c;" +
    "font-weight:800;font-size:14px;text-decoration:none;padding:0 16px;border-radius:8px;white-space:nowrap;" +
    "box-shadow:0 2px 0 #b9781a;transition:background .15s ease}" +
    "#dg-bar .cta:hover{background:#ffb640}" +
    "#dg-bar .cta:focus-visible,#dg-bar .x:focus-visible{outline:2px solid #fff;outline-offset:2px}" +
    "#dg-bar .x{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:0;" +
    "background:none;color:rgba(255,255,255,.7);font-size:22px;line-height:1;cursor:pointer;border-radius:8px}" +
    "#dg-bar .x:hover{color:#fff;background:rgba(255,255,255,.1)}" +
    "#dg-bar .m{display:none}" +
    "@media(max-width:760px){" +
      "#dg-bar .d{display:none}#dg-bar .m{display:inline}" +
      "#dg-bar .in{justify-content:space-between;gap:10px;padding:6px 44px 6px 12px;min-height:54px}" +
      "#dg-bar .txt{font-size:13.5px;text-align:left}" +
      "#dg-bar .cta{min-height:40px;font-size:13.5px;padding:0 13px}" +
      "#dg-bar .x{right:2px;width:40px;height:40px}" +
    "}" +
    "@media(max-width:360px){#dg-bar .txt{font-size:12.5px}#dg-bar .cta{padding:0 10px}}" +
    "@media print{#dg-bar{display:none}}";
  document.head.appendChild(css);

  var prezzoD = LANCIO ? '<span class="sep">·</span><span class="pr">29 € fino al 31 ottobre</span>' : "";
  var prezzoM = LANCIO ? ' · <span class="pr">29 €</span>' : "";

  var bar = document.createElement("div");
  bar.id = "dg-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Diagnosi AI su misura");
  bar.innerHTML =
    '<div class="in">' +
      '<span class="txt">' +
        '<span class="d"><b>Diagnosi AI su misura</b><span class="sep">·</span>20 minuti con me e la tua roadmap personale' + prezzoD + '</span>' +
        '<span class="m"><b>Diagnosi AI su misura</b>' + prezzoM + '</span>' +
      '</span>' +
      '<a class="cta" href="' + LINK + '"><span class="d">Scopri la Diagnosi →</span><span class="m">Scopri →</span></a>' +
      '<button class="x" type="button" aria-label="Chiudi">×</button>' +
    "</div>";

  var moved = [];

  function offset() {
    var h = bar.offsetHeight || 50;
    document.body.style.paddingTop = h + "px";
    document.documentElement.style.scrollPaddingTop = h + "px";
    var sel = "header, .header, .topbar, .navbar, .site-header, #header, nav.nav, .nav-fixed";
    document.querySelectorAll(sel).forEach(function (el) {
      if (el === bar || bar.contains(el)) return;
      var cs = getComputedStyle(el);
      if (cs.position === "fixed" || cs.position === "sticky") {
        var top = parseFloat(cs.top) || 0;
        if (top <= h + 2) {
          el.style.top = h + "px";
          if (moved.indexOf(el) === -1) moved.push(el);
        }
      }
    });
  }

  function unmount() {
    window.removeEventListener("resize", offset);
    if (bar.parentNode) bar.parentNode.removeChild(bar);
    document.body.style.paddingTop = "";
    document.documentElement.style.scrollPaddingTop = "";
    moved.forEach(function (el) { el.style.top = ""; });
    moved = [];
  }

  function mount() {
    if (!document.body || document.getElementById("dg-bar")) return;
    document.body.insertBefore(bar, document.body.firstChild);
    offset();
    window.addEventListener("resize", offset);
    bar.querySelector(".x").addEventListener("click", function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      try { if (window.gtag) gtag("event", "barra_diagnosi_chiusa"); } catch (e) {}
      unmount();
    });
    bar.querySelector(".cta").addEventListener("click", function () {
      try { if (window.gtag) gtag("event", "barra_diagnosi_click"); } catch (e) {}
    });
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
