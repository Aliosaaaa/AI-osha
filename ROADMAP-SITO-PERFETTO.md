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

## 🔴 DA FARE — servono decisioni/accessi di Aliosha

1. **Cloudflare davanti a GitHub Pages** (DNS su Aruba, vedi CONFIGURAZIONE-ARUBA.md).
   Un solo intervento sblocca: security headers (HSTS/CSP/nosniff), Brotli, cache lunga sugli asset,
   301 dei duplicati senza estensione (/blog → /blog.html). Vale ~5-8 punti dello score tecnico.
2. **Google Search Console + API key Google** (`/seo google setup`): senza GSC non possiamo misurare
   indicizzazione, CTR e Core Web Vitals reali. Necessario per certificare il 95/100.
3. **Prezzo del corso online visibile** su corso-online.html + checkout (Stripe payment link?).
   La SERP è dominata da corsi con prezzo in chiaro; il mailto è il freno n.1 alla conversione.
4. **Canale YouTube "AI Osha"**: è il segnale con la correlazione più alta con le citazioni AI (~0.74).
   Anche solo clip dei corsi/testimonianze. Poi aggiungerlo ai sameAs dello schema.
5. **Link del secondo libro Battaglini Edizioni** (ora è linkato solo "AI in Pratica" nei 2 formati).
6. **Case study partner**: 1-2 pagine con risultati reali di AgroIO / Fondazione Poma / Fratelli
   Maltagliati / RelaxInNoTime (serve ok dei clienti). È il fix principale per l'Autorevolezza (40/100).
7. **Numero "100+ studenti formati"**: confermare che sia difendibile o dare il numero reale.
8. **Prenotazione sessioni**: ora la CTA è WhatsApp. Valutare Calendly/Stripe per prenotare+pagare online.

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
