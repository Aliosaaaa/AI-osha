/* AI Osha — sezione Partner & Collaborazioni iniettata sopra il footer.
   Caricare con defer, PRIMA di reveal.js (cosi reveal osserva anche i loghi).
   Se la sezione e gia presente nel markup (es. home) non fa nulla. */
(function () {
  function init() {
    if (document.querySelector('.pt-partners')) return;        // gia presente
    var footer = document.querySelector('footer');
    if (!footer) return;

    var partners = [
      ['https://agroio.it', 'images/partner/agroio.png', 'AgroIO'],
      ['https://www.pomaliberatutti.it', 'images/partner/fondazione-poma.png', 'Fondazione Poma Liberatutti'],
      ['https://salviamoicastagni.it', 'images/partner/fratelli-maltagliati.png', 'Fratelli Maltagliati - Le Ravi'],
      ['https://lullabyforkids.com', 'images/partner/relax-in-no-time.png', 'Relax In No Time']
    ];
    var cards = partners.map(function (p) {
      return '<div class="pt-item"><a class="pt-card" href="' + p[0] + '" target="_blank" rel="noopener" aria-label="' + p[2] + '"><img src="' + p[1] + '" alt="' + p[2] + '" loading="lazy"></a></div>';
    }).join('');

    var css = '<style>'
      + '.pt-partners{padding:64px 0;background:#f6f8fb;}'
      + '.pt-partners .pt-wrap{max-width:1100px;margin:0 auto;padding:0 24px;text-align:center;font-family:"Plus Jakarta Sans",-apple-system,Helvetica,Arial,sans-serif;}'
      + '.pt-eyebrow{font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#00A8E8;}'
      + '.pt-title{font-size:1.9rem;font-weight:800;color:#0D1117;margin:10px 0 6px;}'
      + '.pt-sub{color:#5b6470;margin:0 0 8px;}'
      + '.pt-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin-top:36px;}'
      + '.pt-item{display:flex;}'
      + '.pt-card{display:flex;align-items:center;justify-content:center;width:210px;height:122px;padding:22px 26px;background:#fff;border:1px solid #e9edf2;border-radius:16px;box-shadow:0 6px 20px rgba(13,17,23,.06);text-decoration:none;transition:transform .25s,box-shadow .25s,border-color .25s;}'
      + '.pt-card img{max-width:100%;max-height:78px;width:auto;height:auto;object-fit:contain;filter:none;opacity:1;transition:filter .25s,opacity .25s;}'
      + '.pt-card:hover{transform:translateY(-6px);box-shadow:0 16px 34px rgba(13,17,23,.13);border-color:#d7dee7;}'
      + '.pt-card:active img{filter:grayscale(100%);opacity:.85;}'
      + '@media(max-width:560px){.pt-card{width:44%;min-width:140px;height:100px;padding:16px 18px;}.pt-card img{max-height:58px;}}'
      + '</style>';

    var html = '<section class="pt-partners">' + css
      + '<div class="pt-wrap">'
      + '<div class="section__header"><span class="pt-eyebrow">Collaborazioni</span>'
      + '<h2 class="pt-title">Partner &amp; Collaborazioni</h2>'
      + '<p class="pt-sub">Progetti e realta con cui collaboro.</p></div>'
      + '<div class="pt-grid">' + cards + '</div>'
      + '</div></section>';

    footer.insertAdjacentHTML('beforebegin', html);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
