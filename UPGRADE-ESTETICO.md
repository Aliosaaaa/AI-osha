# ✨ UPGRADE ESTETICO AIOSHA.IT — Piano operativo
> Obiettivo: sito da vetrina per chi VENDE siti. Riferimenti: linear.app, resend.com, igloo.inc, lusion.co, stripe.com.
> Vincolo: HTML statico su GitHub Pages, tutto via CDN (niente build). Ricerca completa: 5 lug 2026.

## SKILL DA INSTALLARE (le "skill segrete" che cercavi — esistono davvero)
1. **anthropics/frontend-design** (ufficiale Anthropic) — impone scelte estetiche da designer vero, anti "AI slop" → `/plugin install frontend-design@anthropics`
2. **tsogjavklann/awwwards-3d** — siti scroll-driven 3D stile Awwwards in singolo file HTML (Three.js+GSAP+Lenis), perfetto per GitHub Pages
3. **freshtechbro/claudedesignskills** — marketplace con skill gsap-scrolltrigger, threejs-webgl, ecc. → `/plugin marketplace add freshtechbro/claudedesignskills`
4. **nextlevelbuilder/ui-ux-pro-max-skill** (17k stelle) — database di 67 stili UI / 57 coppie font / 99 regole UX

## LO STACK EFFETTI (in ordine di impatto/sforzo) — novità: dal 2025 TUTTI i plugin GSAP premium sono gratis
**Fase 1 (1 sessione di lavoro — trasforma la percezione):**
- **Lenis smooth scroll** → la singola cosa che dà più "premium feel"
- **GSAP + ScrollTrigger + SplitText** → titolo hero che si rivela lettera per lettera, sezioni che entrano in scena, contatori
- **Whatamesh** → gradiente WebGL animato stile Stripe nell'hero coi colori brand (#0D1117/#00A8E8/#F5A623)

**Fase 2 (1 sessione):**
- Bottoni magnetici + glow che segue il cursore (già c'è una base in micro.js)
- Tilt 3D sulle card (vanilla-tilt) + ScrambleText sulle parole chiave (effetto "decodifica AI", perfetto per il brand)
- Grana pellicola (overlay 4% opacity) → ammazza subito l'effetto "piatto"

**Fase 3 (il wow — 2 sessioni):**
- Hero Three.js: oggetto 3D vetro/wireframe che ruota con lo scroll, bloom + film grain (solo desktop, fallback statico su mobile)

**Guardrail:** 3-4 effetti fatti benissimo > 20 effetti sparsi (l'animazione ovunque È il segnale "fatto con AI"). Tutto dietro `prefers-reduced-motion`, script deferiti, LCP < 2,5s.

## IMMAGINI DA GENERARE (Aliosha — prompt pronti)
1. **Oggetto hero 3D**: "Abstract 3D glass and brushed-chrome geometric sculpture, translucent cyan (#00A8E8) refractions with thin gold (#F5A623) accent edges, floating on dark navy background (#0D1117), studio lighting, subtle bloom, octane render, ultra minimal, negative space on left side for text, 8k"
2. **Texture sfondo sezioni**: "Extremely subtle circuit-board traces, barely visible dark blue-grey (#161B22) lines on #0D1117, seamless tileable, minimal, flat vector"
3. **Streak di luce (divisori)**: "Single elegant light streak, gradient cyan #00A8E8 to gold #F5A623, sweeping curve on pure black, long exposure style, negative space"
4. **Grana pellicola**: "Monochrome fine film grain noise texture, uniform, seamless tile, 512x512"
(In alternativa li genero io via Higgsfield; l'oggetto 3D può diventare un GLB vero con generate_3d)

## PROSSIMO PASSO
Dire a Claude: "vai con la Fase 1" → installa le skill, implementa Lenis+GSAP+mesh gradient sulla home, e si valuta insieme prima di estendere alle altre pagine.
