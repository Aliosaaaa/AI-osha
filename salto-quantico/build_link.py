#!/usr/bin/env python3
"""Genera salto-quantico/link/index.html: la landing «link in bio» (IG, YouTube, TikTok).

È la landing del Salto Quantico con, subito dopo l'iscrizione, un blocco in più
«Chi sono e cosa faccio». Tracciamento: ogni canale usa il suo ?src=
  aiosha.it/salto-quantico/link/?src=ig-bio   (bio Instagram)
  aiosha.it/salto-quantico/link/?src=yt       (descrizioni e canale YouTube)
  aiosha.it/salto-quantico/link/?src=tt       (TikTok)
  senza src → fonte «link-bio».
La fonte finisce nel foglio iscrizioni e in Brevo (attributo FONTE), e negli eventi Lead di pixel e GA4.

Rigenerare ogni volta che cambia salto-quantico/index.html:  python3 build_link.py
"""
import re, pathlib

QUI = pathlib.Path(__file__).parent
src = (QUI / "index.html").read_text()
h = src

# 1) percorsi relativi: la pagina sta un livello più in basso
h = re.sub(r'(src|href|poster)="(images/|sq-invito)', r'\1="../\2', h)
h = h.replace("url('images/", "url('../images/")

# 2) head: titolo, niente indicizzazione (la versione da indicizzare è /salto-quantico/)
h = h.replace("<title>SALTO QUANTICO — 2 sere live gratis con l'AI | AI Osha</title>",
              "<title>Aliosha Battaglini · Salto Quantico, 2 sere live gratis sull'AI</title>\n<meta name=\"robots\" content=\"noindex, follow\" />")

# 3) fonte di default per il tracciamento
h = h.replace("(p.get('src')||'landing-salto-quantico')", "(p.get('src')||'link-bio')")

# 4) il vecchio blocco «Chi te lo dice» sparisce: lo sostituisce quello più completo in alto
h = re.sub(r'<section>\s*<div class="wrap">\s*<span class="eyebrow-c reveal">Chi te lo dice</span>.*?</section>\s*', '', h, count=1, flags=re.S)

CHI_SONO = r'''
<!-- CHI SONO (solo landing link in bio) -->
<style>
.chi{padding-top:70px}
.chi .lead2{max-width:720px;margin:0 auto 2.2rem;text-align:center;color:var(--g300);font-size:1.08rem}
.fa{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}
@media(max-width:720px){.fa{grid-template-columns:1fr}}
.fa .c{background:var(--card);border:1px solid var(--line);border-radius:1.2rem;padding:22px 22px 20px}
.fa .c .ico{font-size:1.5rem;margin-bottom:.5rem}
.fa .c h4{color:#fff;font-size:1.08rem;font-weight:800;margin-bottom:.35rem}
.fa .c p{color:var(--g300);font-size:.95rem;line-height:1.55}
.fa .c b{color:#fff}
.chi .cta-c{text-align:center;margin-top:30px}
.chi .cta-c small{display:block;margin-top:.7rem;color:var(--g400);font-size:.85rem}
</style>
<section class="chi">
  <div class="wrap">
    <span class="eyebrow-c reveal">Piacere, sono Aliosha</span>
    <h2 class="reveal">L'AI non la devi imparare tutta. <span class="hl">Te la cucio addosso.</span></h2>
    <p class="lead2 reveal">Ti hanno mandato qui da Instagram o da YouTube: ecco chi sono, in breve, prima di passare due sere con me.</p>
    <div class="author reveal spot">
      <img class="author-photo" src="../images/aliosha-foto.jpg" alt="Aliosha Battaglini" />
      <div>
        <h3>Aliosha Battaglini</h3>
        <p class="role">AI Osha · consulente e formatore, Pescia</p>
        <p>Ho fatto il fotografo, l'agente di commercio, l'immobiliare, il cameriere. L'intelligenza artificiale l'ho imparata da autodidatta, lavorandoci ogni giorno. Non da un'aula.</p>
        <p>Oggi la porto nel lavoro vero di professionisti, negozi e piccole aziende. Non ti insegno tutto: guardiamo cosa fai e scegliamo le due o tre cose che ti ridanno ore.</p>
        <div class="badges"><span class="pill">📚 14 libri pubblicati</span><span class="pill">🔴 100+ live</span><span class="pill">🎓 Formatore Fondazione Poma · Pescia</span></div>
      </div>
    </div>
    <div class="fa">
      <div class="c reveal"><div class="ico">🧵</div><h4>Consulenze su misura</h4><p>Partiamo dal tuo lavoro, non dagli strumenti. Mail, preventivi, post, organizzazione: ti preparo l'AI su quello che fai tu, e la usi da subito.</p></div>
      <div class="c reveal"><div class="ico">🎓</div><h4>Corsi in aula e online</h4><p>Il corso <b>AI in Pratica</b> e la formazione per aziende e scuole, come quella alla Fondazione Poma di Pescia. Pratica, niente teoria a vuoto.</p></div>
      <div class="c reveal"><div class="ico">🤖</div><h4>Assistenti che lavorano per te</h4><p>Agenti AI che rispondono, organizzano e fanno i compiti ripetitivi. Con due persone e gli agenti abbiamo gestito un evento da <b>oltre 1.000 persone</b>.</p></div>
      <div class="c reveal"><div class="ico">📘</div><h4>Libro e contenuti gratis</h4><p>Il libro <b>«AI in Pratica per chi lavora»</b>, guide gratuite e video ogni settimana su Instagram e YouTube. Il Salto Quantico è il modo più veloce per cominciare.</p></div>
    </div>
    <div class="cta-c reveal">
      <a class="btn" href="#iscriviti">🎟️ Prenota il posto gratis</a>
      <small>Domenica 22 e lunedì 23 novembre · ore 21 · su Zoom · gratis</small>
    </div>
  </div>
</section>
'''
marker = "<!-- IL PROBLEMA -->"
assert marker in h
h = h.replace(marker, CHI_SONO + "\n" + marker, 1)

out = QUI / "link" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(h)
print("scritto", out, len(h))
