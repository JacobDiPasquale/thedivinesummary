# La Divina Commedia — A Canto by Canto Commentary

A narrative and academic web-based commentary on Dante Alighieri's *Divine Comedy*, covering all three canticles: *Inferno*, *Purgatorio*, and *Paradiso*.

## About

This project presents a canto-by-canto prose summary and literary commentary on Dante's *Divina Commedia* (c. 1304–1321), the foundational work of Italian literature and one of the supreme achievements of Western poetry. Each canto receives a substantive summary that goes beyond plot synopsis to address the poem's theology, allegory, political content, literary sources, and the human drama of the individual souls Dante encounters.

The commentary is written for a general educated reader — someone who may not have read the poem in its entirety but who wants to engage seriously with its ideas, its structure, and its remarkable cast of characters.

## Tech Stack

**Next.js 15 · Tailwind CSS · Framer Motion · TypeScript**

- App Router with static generation (100+ pre-rendered pages)
- Three-canticle theme system via CSS custom properties
- Framer Motion for accordion animations and page transitions
- Docker-based development and production workflows

## Development

All development runs inside Docker — no local Node.js installation required.

```bash
# Start the dev server (hot-reload at localhost:3000)
docker compose up

# Run the one-time data extraction script (first time only)
docker compose run --rm dev node scripts/extract-html.mjs
# → Generates data/inferno.ts, data/purgatorio.ts, data/paradiso.ts
# Review the generated files, then commit them.
# After committing, delete inferno.html, purgatorio.html, paradiso.html, index.html

# Production build
docker build -t divine-summary .
docker run -p 3000:3000 divine-summary
```

## Project Structure

```
thedivinesummary/
├── app/
│   ├── layout.tsx           # Root shell: Google Fonts, global metadata
│   ├── page.tsx             # Landing page
│   ├── inferno/
│   │   ├── layout.tsx       # data-canticle="inferno" theme wrapper
│   │   ├── page.tsx         # Full Inferno accordion page
│   │   └── canto/[slug]/    # Individual canto pages (SEO)
│   ├── purgatorio/          # Same structure
│   └── paradiso/            # Same structure
├── components/
│   ├── layout/              # SiteNav, CanticleHeader, QuickNav, Footer
│   ├── canto/               # CantoAccordion, CantoSection, SectionHeader, etc.
│   ├── home/                # Hero, CanticleCard, Introduction
│   └── ui/                  # Badge, GradientDivider
├── data/
│   ├── types.ts             # Shared TypeScript interfaces
│   ├── inferno.ts           # Generated — 34 cantos + sections
│   ├── purgatorio.ts        # Generated — 33 cantos + sections
│   └── paradiso.ts          # Generated — 33 cantos + sections
├── lib/
│   ├── canticle-utils.ts    # getCanticle(), getCantoBySlug(), etc.
│   └── theme.ts             # Per-canticle CSS variable tokens
├── scripts/
│   └── extract-html.mjs     # One-time HTML→TypeScript extractor
├── styles/globals.css
├── tailwind.config.ts
├── Dockerfile               # Multi-stage production build
├── Dockerfile.dev           # Dev server
└── docker-compose.yml       # Local dev workflow
```

## The Three Canticles

### Inferno
*c. 1304–1308 · 34 Cantos*

Dante descends through the nine circles of Hell on Good Friday, 1300, guided by the Roman poet Virgil. The *Inferno* is organized around a moral taxonomy of sin derived from Aristotle's *Nicomachean Ethics*, moving from the sins of incontinence through violence to fraud and treachery.

### Purgatorio
*c. 1308–1320 · 33 Cantos*

Dante ascends the mountain of Purgatory, organized around the seven capital sins. The *Purgatorio* is the most humanly warm of the three canticles: souls here are moving toward the light, not fixed in eternal darkness.

### Paradiso
*c. 1314–1320 · 33 Cantos*

Beatrice guides Dante through the nine celestial spheres and into the Empyrean, where he has a direct vision of God. The most theologically ambitious of the three canticles.

## Sources and Approach

The commentary draws on the following scholarly traditions:

- The Italian text of the *Petrocchi* critical edition
- Translations by Allen Mandelbaum, Robert Hollander, and Charles Singleton
- Commentary traditions of Sapegno, Singleton, and Hollander
- Theological sources including Aquinas's *Summa Theologiae*

---

*Dante Alighieri · La Divina Commedia · c. 1304–1321*
