import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Inferno ──────────────────────────────────────────────────────────
        inferno: {
          void:           '#0d0a09',
          coal:           '#151010',
          char:           '#1e1614',
          ash:            '#2a2020',
          'ash-mid':      '#362828',
          'ash-light':    '#4a3535',
          'crimson-deep': '#6b0f0f',
          crimson:        '#8b1a1a',
          'crimson-mid':  '#a82020',
          'crimson-bright': '#c0392b',
          ember:          '#c44a1a',
          'ember-light':  '#d4622a',
          rust:           '#7a3520',
          blood:          '#5c1010',
          stone:          '#3d3535',
          'stone-light':  '#5a4a4a',
          bone:           '#c8b8a8',
          'bone-dim':     '#a09080',
          'bone-faint':   '#786860',
          'bone-fainter': '#584848',
          'text-body':    '#c0aeaa',
          'text-mid':     '#a09090',
          'text-faint':   '#7a6868',
        },
        // ── Purgatorio ───────────────────────────────────────────────────────
        purgatorio: {
          ink:            '#070d06',
          dark:           '#0d1309',
          'dark-mid':     '#121a0f',
          deep:           '#182214',
          'deep-mid':     '#1f2d1a',
          mid:            '#2a3d22',
          'mid-light':    '#3a5030',
          'gold-light':   '#5a9038',
          'gold-mid':     '#6aaa45',
          'gold-bright':  '#76aa50',
          'gold-glow':    '#90c060',
          parchment:      '#b0d285',
          'parchment-dim': '#889860',
          'text-body':    '#a8c870',
          'text-mid':     '#88a055',
          'text-faint':   '#607040',
        },
        // ── Paradiso ─────────────────────────────────────────────────────────
        paradiso: {
          ink:            '#170e04',
          deep:           '#1f1408',
          'deep-mid':     '#2a1c0c',
          mid:            '#382610',
          'mid-light':    '#4a3418',
          'gold-deep':    '#7a5a08',
          gold:           '#d4a820',
          'gold-mid':     '#e0b830',
          'gold-bright':  '#f8d048',
          'gold-glow':    '#fce878',
          cream:          '#f8e8b0',
          'cream-mid':    '#e8d090',
          'text-body':    '#dcc270',
          'text-mid':     '#c0a050',
          'text-faint':   '#906830',
        },
        // ── Landing (shared neutral tones) ───────────────────────────────────
        landing: {
          void:           '#0a0806',
          crimson:        '#8b1a1a',
          'crimson-bright': '#c0392b',
          ember:          '#c44a1a',
          gold:           '#b07d10',
          'gold-bright':  '#e0aa28',
          'gold-glow':    '#f5c842',
          cream:          '#fdf8ee',
          'cream-mid':    '#f3e8c0',
          bone:           '#c8b8a8',
        },
      },

      fontFamily: {
        // These reference the CSS variables injected by next/font/google in layout.tsx
        'cinzel-decorative': ['var(--font-cinzel-decorative)', '"Cinzel Decorative"', 'serif'],
        cinzel:              ['var(--font-cinzel)', '"Cinzel"', 'serif'],
        garamond:            ['var(--font-eb-garamond)', '"EB Garamond"', 'Georgia', 'serif'],
      },

      letterSpacing: {
        'ultra':      '0.50em',
        'widest-xl':  '0.38em',
        'widest-lg':  '0.28em',
        'nav':        '0.28em',
      },

      fontSize: {
        // Fluid display sizes using clamp
        'display':    ['clamp(2rem, 6vw, 5rem)',         { lineHeight: '1.1' }],
        'display-sm': ['clamp(1.6rem, 4vw, 3rem)',       { lineHeight: '1.15' }],
        'canto-title': ['1.1rem',                         { lineHeight: '1.4', letterSpacing: '0.03em' }],
        'overline':   ['11px',                            { lineHeight: '1', letterSpacing: '0.38em' }],
        'nav':        ['9.5px',                           { lineHeight: '1', letterSpacing: '0.28em' }],
      },

      maxWidth: {
        'content': '860px',
      },
    },
  },
  plugins: [],
};

export default config;
