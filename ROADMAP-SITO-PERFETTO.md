# ROADMAP — Sito AI Osha perfetto (obiettivo: SEO Health Score 95+/100)

> Stato al 3 luglio 2026. Audit completo eseguito con 9 analisi specialistiche
> (tecnico, contenuti E-E-A-T, schema, sitemap, performance, visual/mobile, GEO/AI, SXO, backlink).
> Punteggio di partenza: **65/100**. Dopo i fix di oggi stimato: **~85/100**.
> Per arrivare a 95+ servono i punti nelle sezioni "DA FARE" qui sotto.

---

## ✅ FATTO (3 luglio 2026)

### Schema e dati strutturati
- [x] Logo 404 nello schema (`logo.png` → `uccello.png`) su homepage e guida prompting
- [x] Foto Person 404 su chi-sono (`aliosha-battaglini-ai-osha.jpg` → `aliosha-foto.jpg`)
- [x] JSON-LD rotto su guida-completa-prompting (escape `\'` non valido)
- [x] Rimosse Review/AggregateRating self-serving dalla homepage (rischio policy Google)
- [x] Entità unificata: `@id` https://aiosha.it/#organization + riferimenti da ProfessionalService, Course, Person, Article, Blog, Book
- [x] Course + CourseInstance su corso.html (Pescia + online) e corso-online.html
- [x] Blog schema con 11 BlogPosting su blog.html
- [x] Book schema con entrambe le offerte (cartaceo B0H4RNXR8C + Kindle B0H4RH9FRQ), publisher Battaglini Edizioni
- [x] Service + OfferCatalog con prezzi reali sulla nuova pagina Servizi

### Indicizzazione
- [x] Canonical corretti su blog.html e risorse.html (puntavano a URL senza .html in conflitto con la sitemap)
- [x] Canonical aggiunti ai 4 post che non lo avevano + Open Graph/Twitter card complete
- [x] Breadcrumb uniformati alla forma .html (chi-sono, faq, blog)
- [x] Sitemap pulita (rimossi priority/changefreq ignorati da Google, lastmod aggiornati)
- [x] robots.txt: aggiunti Applebot-Extended, Amazonbot, Meta-ExternalAgent; rimossa la riga `Sitemap: llms.txt` non conforme

### Contenuti e claim
- [x] Rimosso ovunque il claim "1.000+ persone a un evento" (non autorizzato dal cliente) → sostituito con claim verificabili (100+ live, 100+ studenti formati)
- [x] Aggiornato "13 libri" → "14 libri" in tutto il sito (index, chi-sono, llms.txt, corso-online, 5 post, salto-quantico)
- [x] **consulenza.html ricostruita da zero come pagina Servizi**: Sessioni 1-to-1 (250€/2h, pacchetto 5×999€), Sito Web (500€ in 2 sessioni), Marketing (ads/social/email/WhatsApp su preventivo) + FAQ lunghe + Service schema + CTA WhatsApp
- [x] "Servizi" aggiunto alla navigazione di tutte le pagine principali
- [x] Rimossi i corsi "AI per Agenzie Immobiliari" e "CourseKit" da i-miei-corsi.html (card + schema + meta)
- [x] Link interni blog→money: CTA corso+sessioni nei 5 post vecchi, link diretto a corso.html nel post Pescia
- [x] Guida prompting riallineata: canonical, OG, data/firma visibili, dateModified, link interni
- [x] FAQ allungate a 120-160 parole (costi + confronto AI) per citabilità AI/LLM
- [x] llms.txt aggiornato: post Excel aggiunto, sezione Servizi con prezzi, claim corretti

### Performance e mobile
- [x] Cookie banner compattato su mobile (prima copriva le CTA hero: 206px = 24% dello schermo)
- [x] Video hero: poster + preload=metadata (prima scaricava 860KB subito)
- [x] Sfondo aurora hero → WebP (172KB → 32KB)
- [x] Loghi partner → WebP con width/height (196KB → 36KB)
- [x] width/height su immagini homepage (anti-CLS)
- [x] Thumbnails testimonianze convertite in WebP (anna, simone-del-freo, simone-estro)
- [x] Fix overflow orizzontale mobile su index/corso/libro (grid minmax + overflow-x clip)

---

## 🔴 DA FARE — priorità (aggiornato 5 lug 2026 con le decisioni di Aliosha)

1. **Cloudflare davanti a GitHub Pages** — IN CORSO, guida passo-passo fornita (stesso pattern già
   usato per salviamoicastagni.it il 3 lug). Sblocca: security headers, Brotli, cache asset,
   301 dei duplicati /blog → /blog.html. DNS su Aruba (vedi CONFIGURAZIONE-ARUBA.md).
2. **Google Search Console** — GA4 c'è già (property www.aiosha.it) ma NON basta: GA4 misura il
   traffico, GSC misura Google (indicizzazione, query, CTR, CWV). Setup 10 min: verifica dominio
   (può usare il tag GA4 già installato), poi inviare sitemap.xml. Opzionale: API key per audit automatici.
3. **Prezzo corso online**: decisione presa di mostrarlo (consiglio: prezzo pieno ancorato + garanzia,
   vedi note in fondo). Da definire la cifra → poi aggiorniamo pagina + Offer schema + Stripe link.
4. ~~Canale YouTube~~ ✅ ESISTE: https://www.youtube.com/@AlioshaBattaglini (aperto da poco, 22 iscritti,
   29 video). Aggiunto ai sameAs di tutto il sito e a llms.txt il 5 lug. Prossimo passo: link visibile
   nel footer del sito + 2 video/mese con titoli SEO ("come usare X per Y").
5. **Secondo libro Battaglini Edizioni**: esce tra ~1 mese, "AI in Pratica" per una NICCHIA specifica
   da identificare (analisi in corso — candidate: agenti immobiliari, commercialisti/studi professionali,
   ristorazione/turismo). Quando esce: pagina dedicata + Book schema + link incrociati.
6. **Case study partner**: inviare richiesta di ok a AgroIO / Fondazione Poma / Fratelli Maltagliati /
   RelaxInNoTime (template messaggio WhatsApp preparato). Poi 1 pagina caso-studio ciascuno
   (problema → soluzione con AI → risultato con numero).
7. ~~Claim~~ ✅ RISOLTO 5 lug: il claim "1.000+ persone gestite a un evento con l'AI e un team di 2"
   è VERO e autorizzato (senza altri dettagli) → ripristinato su tutto il sito. Persone formate:
   30 col metodo AI Osha + 60-80 in Karma → si usa "circa un centinaio di professionisti formati"
   e "4.9/5 dai partecipanti ai corsi" (non più "100+ studenti").
8. ~~Prenotazione sessioni~~ ✅ DECISO: CTA WhatsApp, poi Aliosha invia Calendly manualmente ai lead
   qualificati. Nessuna modifica al sito necessaria.

## 🟠 DA FARE — contenuti (prossime 2-4 settimane)

9. **Screenshot reali nei post** (soprattutto "30 prompt ChatGPT"): i competitor mostrano output reali,
   i nostri post hanno solo testo. 3-5 screenshot per post pillar.
10. **Allungare i 3 post sotto le 1.100 parole** che promettono "guida completa/definitiva"
    (guida-prompting, confronto AI, Pescia) verso le 1.800-2.500 parole, o ridimensionare i titoli.
11. **Sezione "perché questo corso vs Udemy/marketplace"** su corso.html + ore/certificato/formato
    in chiaro (la SERP "corso AI online" premia chi li mostra).
12. **Testimonianze con nome completo + link** (LinkedIn) dove i clienti acconsentono.
13. **Nuovi articoli blog** 1-2/mese collegati alle pagine money (il post Excel è il modello giusto).
14. **Filtro intent sul post "prompt chatgpt lavoro"**: distinguere "prompt per lavorare" da
    "prompt per cercare lavoro" (la SERP mescola i due intenti).

## 🟡 DA FARE — tecnico minore (backlog)

15. Consolidare i due blocchi FAQPage della homepage in uno solo
16. width/height sulle immagini delle altre pagine (corso, libro, blog)
17. Meta robots uniformi su tutte le pagine (template head condiviso)
18. Tap target <44px su mobile home (link WhatsApp/Contattami footer) e font <16px
19. Verificare cookie banner coerente su tutte le pagine (ora appare solo in home — Q. GDPR)
20. `courseWorkload` reale (ore effettive del corso) negli schema Course
21. Self-host dei font Google (toglie un round-trip alla LCP)
22. Ridurre i 72KB di CSS inline nella head della homepage a critical CSS (~15KB) + resto differito

## 📈 LINK BUILDING (mesi 1-3)

23. Stampa locale: La Nazione (ed. Pistoia), Il Tirreno, Valdinievole Online — storia "consulente AI locale"
24. Directory: AIxIA, directory business italiane (PagineGialle, aziende.it)
25. Guest post: Agenda Digitale, AI4Business, blog marketing italiani
26. Podcast italiani business/AI come ospite
27. Cross-link dai siti dei clienti/partner (salviamoicastagni.it, parcogiochivellano.dev, canali collegati)
28. Bing Webmaster Tools + IndexNow (gratis, alimenta anche Copilot)

## 📊 COME MISURARE (dopo ogni fase)

- Google Search Console: copertura (i duplicati senza .html devono sparire), query "consulenza AI",
  "sessione AI", "corso AI Pescia", CTR in crescita dopo le nuove meta
- Rich Results Test su corso.html, consulenza.html, libro.html (Course/Service/Book validi)
- PageSpeed Insights mobile: target LCP < 2.5s
- Ri-audit completo con `/seo audit https://aiosha.it` tra 4 settimane
