/* ============================================================
   AI OSHA — Fascia promo "Salto Quantico" (fixed top, site-wide)
   Iniettata su tutte le pagine tranne la landing stessa.
   Si auto-adatta: sposta in basso qualsiasi header fisso/sticky.
   ============================================================ */
(function () {
  "use strict";
  // niente fascia sulla landing stessa (né in pagine di download/print)
  if (/\/salto-quantico(\/|$)/.test(location.pathname)) return;
  if (window.__sqBarLoaded) return;
  window.__sqBarLoaded = true;

  var TARGET = new Date(2026, 6, 15, 21, 0, 0).getTime(); // 15 lug 2026 21:00
  var LINK = "https://aiosha.it/salto-quantico/?src=sito";

  var css = document.createElement("style");
  css.textContent =
    "#sq-bar{position:fixed;top:0;left:0;right:0;z-index:2147483000;" +
    "background:linear-gradient(100deg,#0D1117 0%,#1E3A5F 42%,#00A8E8 100%);" +
    "background-size:220% 100%;animation:sqShift 9s ease-in-out infinite;" +
    "color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
    "box-shadow:0 4px 22px rgba(0,0,0,.28);border-bottom:1px solid rgba(255,255,255,.12)}" +
    "#sq-bar .in{max-width:1180px;margin:0 auto;min-height:46px;display:flex;align-items:center;justify-content:center;" +
    "gap:16px;padding:7px 16px;flex-wrap:wrap;text-align:center}" +
    "#sq-bar .txt{font-size:14.5px;font-weight:700;letter-spacing:.1px;line-height:1.3}" +
    "#sq-bar .txt b{color:#F5A623}" +
    "#sq-bar .cd{font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;font-weight:700;" +
    "background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:2px 9px;font-size:13px;white-space:nowrap}" +
    "#sq-bar .cta{flex:none;background:#F5A623;color:#0D1117;font-weight:800;font-size:13.5px;text-decoration:none;" +
    "padding:9px 18px;border-radius:9px;box-shadow:0 3px 0 #b9781a;transition:transform .12s ease, box-shadow .12s ease;white-space:nowrap}" +
    "#sq-bar .cta:hover{transform:translateY(-1px);box-shadow:0 5px 0 #b9781a}" +
    "#sq-bar .cta:active{transform:translateY(2px);box-shadow:0 1px 0 #b9781a}" +
    "#sq-bar .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#ff4d4d;margin-right:7px;" +
    "box-shadow:0 0 0 0 rgba(255,77,77,.7);animation:sqPulse 1.8s infinite}" +
    "@keyframes sqShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}" +
    "@keyframes sqPulse{0%{box-shadow:0 0 0 0 rgba(255,77,77,.7)}70%{box-shadow:0 0 0 9px rgba(255,77,77,0)}100%{box-shadow:0 0 0 0 rgba(255,77,77,0)}}" +
    "@media(max-width:640px){#sq-bar .in{gap:10px;padding:8px 12px}#sq-bar .txt{font-size:13px;flex-basis:100%}#sq-bar .cta{font-size:13px;padding:8px 15px}}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.id = "sq-bar";
  bar.setAttribute("role", "banner");
  bar.innerHTML =
    '<div class="in">' +
    '<span class="txt"><span class="dot"></span>GRATIS · 3 sere <b>LIVE con l\'AI</b> · 15·16·17 luglio, ore 21 ' +
    '<span class="cd" id="sq-cd"></span></span>' +
    '<a class="cta" href="' + LINK + '">🎟️ Prenota il posto →</a>' +
    "</div>";

  function mount() {
    if (!document.body || document.getElementById("sq-bar")) return;
    document.body.insertBefore(bar, document.body.firstChild);
    offset();
    tick();
    setInterval(tick, 1000);
    window.addEventListener("resize", offset);
  }

  function offset() {
    var h = bar.offsetHeight || 46;
    // spinge il contenuto sotto la fascia
    document.body.style.paddingTop = h + "px";
    document.documentElement.style.scrollPaddingTop = h + "px";
    // sposta in basso eventuali header fissi/sticky ancorati in alto
    var sel = "header, .header, .topbar, .navbar, .site-header, #header, nav.nav, .nav-fixed";
    document.querySelectorAll(sel).forEach(function (el) {
      if (el === bar || bar.contains(el)) return;
      var cs = getComputedStyle(el);
      if ((cs.position === "fixed" || cs.position === "sticky")) {
        var top = parseFloat(cs.top) || 0;
        if (top <= h + 2) el.style.top = h + "px";
      }
    });
  }

  function tick() {
    var el = document.getElementById("sq-cd");
    if (!el) return;
    var d = TARGET - Date.now();
    if (d <= 0) { el.textContent = "▶ È INIZIATO"; return; }
    var g = Math.floor(d / 864e5), h = Math.floor(d % 864e5 / 36e5), m = Math.floor(d % 36e5 / 6e4);
    el.textContent = "tra " + g + "g " + (h < 10 ? "0" : "") + h + "h " + (m < 10 ? "0" : "") + m + "m";
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
