# AI Osha - Website

Sito web ufficiale di **AI Osha** (Aliosha Battaglini) - formazione e consulenza sull'AI applicata al business per PMI e professionisti.

## 📋 Contenuti del Sito

- **Homepage** (`index.html`) - Hero section, features, lead magnet per guida gratuita
- **Blog** (`blog.html`) - 5 articoli pratici sull'AI:
  - Email professionali con Claude
  - Immagini AI generative
  - Ottimizzare Google Docs con Gemini
  - Ricerche avanzate con Perplexity
  - Guida completa al prompting
- **Corso** (`corso.html`) - Community Skool con video avanzati e consulenze 1-to-1 mensili
- **Chi Sono** (`chi-sono.html`) - Biografia e background
- **FAQ** (`faq.html`) - Domande frequenti
- **Pagine Placeholder**:
  - `libro.html` - Libro in arrivo
  - `risorse.html` - Risorse gratuite in arrivo
  - `consulenza.html` - Servizio consulenza in arrivo
  - `contatti.html` - Pagina contatti in arrivo

## 🎨 Design

- **Design System**: CSS custom properties per colori e tipografia
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Colori**:
  - Primary: `#00A8E8` (blu)
  - Highlight: `#F5A623` (arancione)
  - Dark: `#0D1117`
- **Responsive**: Mobile-first design con breakpoint per tablet e desktop

## 🚀 Deploy

Il sito è configurato per GitHub Pages. Puoi anche usare Vercel o Netlify per deploy più veloce.

### GitHub Pages Setup

1. Vai su Settings → Pages nel repository
2. Source: Deploy from branch `main`, folder `/` (root)
3. Aggiungi dominio personalizzato (opzionale)
4. Abilita HTTPS

## 📁 Struttura File

```
.
├── index.html              # Homepage
├── blog.html               # Pagina blog
├── corso.html              # Pagina corso/community
├── chi-sono.html           # About page
├── faq.html                # FAQ page
├── libro.html              # Placeholder libro
├── risorse.html            # Placeholder risorse
├── consulenza.html         # Placeholder consulenza
├── contatti.html           # Placeholder contatti
├── blog/                   # Articoli blog
│   ├── email-professionali-claude.html
│   ├── immagini-ai-generative.html
│   ├── ottimizzare-google-docs-gemini.html
│   ├── ricerche-avanzate-perplexity.html
│   └── guida-completa-prompting.html
└── README.md
```

## 🛠 Tecnologie

- HTML5 semantico
- CSS3 (custom properties, Grid, Flexbox)
- JavaScript vanilla (accordion FAQ, copy-to-clipboard, newsletter form)
- Schema.org markup per SEO
- Open Graph meta tags per social sharing

## 📝 Note

- Tutti i link interni usano percorsi relativi (`.html`)
- Nessuna dipendenza esterna (no npm, no build process)
- Sito statico puro, pronto per hosting su qualsiasi server
