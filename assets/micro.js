/* AI Osha — micro-interazioni: tilt 3D sulle card + bottoni magnetici.
   Solo su dispositivi con mouse, rispetta prefers-reduced-motion.
   Usa transform inline solo durante hover, poi lo libera (non rompe il reveal). */
(function () {
  if (!window.matchMedia) return;
  if (!window.matchMedia('(hover: hover)').matches) return;            // niente su touch
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    // ---- TILT 3D sulle card ----
    var tiltSel = '.problem-card,.result-card,.path-card,.lesson-card,.risorsa-card,.about-card,.feature-card,.step,.tool-card,.pt-card,.stat-card';
    document.querySelectorAll(tiltSel).forEach(function (card) {
      var raf = null;
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.style.transition = 'transform .08s ease-out';
          card.style.transform = 'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 6).toFixed(2) + 'deg)';
        });
      });
      card.addEventListener('mouseleave', function () {
        if (raf) cancelAnimationFrame(raf);
        card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        card.style.transform = '';                                     // torna allo stato CSS (reveal/visible)
      });
    });

    // ---- Bottoni magnetici ----
    var magSel = '.btn,.lead-form__btn,.header__cta';
    document.querySelectorAll(magSel).forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        btn.style.transition = 'transform .12s ease-out';
        btn.style.transform = 'translate(' + (mx * 0.18).toFixed(1) + 'px,' + (my * 0.28).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)';
        btn.style.transform = '';
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
