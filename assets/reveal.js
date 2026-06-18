/* AI Osha — reveal on scroll (montaggio bidirezionale). Caricare con defer, DOPO partners.js. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    // 1) Copertura: aggiunge la classe a tutti i tipi di box, su qualsiasi pagina
    var sel = [
      '.problem-card', '.result-card', '.step', '.step-card', '.lesson-card',
      '.risorsa-card', '.prompt-card', '.tool-card', '.about-card', '.path-card',
      '.feature-card', '.ba-card', '.stat-card', '.testimonial', '.testimonial-card',
      '.wa-card', '.faq-item', '.section__header', '.section__description',
      '.cta-section__content', '.how-cta', '.pt-item'
    ];
    document.querySelectorAll(sel.join(',')).forEach(function (el) {
      el.classList.add('animate-on-scroll');
    });

    // 2) Montaggio: direzione alternata dai lati per i box in griglia + cascata
    var totals = new Map();
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      var p = el.parentElement;
      totals.set(p, (totals.get(p) || 0) + 1);
    });
    var seen = new Map();
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      var p = el.parentElement;
      var i = seen.get(p) || 0; seen.set(p, i + 1);
      var total = totals.get(p);
      if (i > 0) el.style.setProperty('--reveal-delay', Math.min(i * 110, 660) + 'ms');
      var fromBelow = el.matches('.section__header, .section__description, .cta-section__content, .how-cta');
      if (!fromBelow && total >= 2) {
        el.style.setProperty('--rx', (i % 2 === 0 ? -64 : 64) + 'px');
        el.style.setProperty('--ry', '24px');
        el.style.setProperty('--rs', '0.9');
      } else {
        el.style.setProperty('--ry', '60px');
        el.style.setProperty('--rs', '0.94');
      }
    });

    // 3) Observer bidirezionale: si compone entrando e si ri-compone tornandoci
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
