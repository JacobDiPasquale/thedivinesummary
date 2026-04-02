import type { CanticleId } from '@/data/types';

/**
 * Per-canticle theme tokens surfaced as CSS custom properties.
 * Applied by each canticle's layout.tsx via data-canticle attribute.
 * Components consume them via var(--c-*) in Tailwind arbitrary values.
 */
export type ThemeTokens = {
  /** Page background colour */
  background: string;
  /** Primary accent (nav active border, badge bg, etc.) */
  primary: string;
  /** Bright accent (hover states, active nav links) */
  primaryBright: string;
  /** Secondary warm accent */
  accent: string;
  /** Body text colour */
  textBody: string;
  /** Mid-tone text */
  textMid: string;
  /** Faint/muted text */
  textFaint: string;
  /** Card/canto background */
  cardBg: string;
  /** Card hover background */
  cardHover: string;
  /** Border / separator colour */
  border: string;
  /** Subtle border */
  borderFaint: string;
  /** Radial gradient string for the body background image */
  bodyGradient: string;
  /** Page-enter animation direction: 'down' | 'up' | 'scale' */
  enterAnimation: 'down' | 'up' | 'scale';
};

export const themes: Record<CanticleId, ThemeTokens> = {
  inferno: {
    background:    '#0d0a09',
    primary:       '#8b1a1a',
    primaryBright: '#c0392b',
    accent:        '#c44a1a',
    textBody:      '#c0aeaa',
    textMid:       '#a09090',
    textFaint:     '#7a6868',
    cardBg:        '#151010',
    cardHover:     '#1e1614',
    border:        'rgba(139,26,26,0.2)',
    borderFaint:   'rgba(139,26,26,0.08)',
    bodyGradient:
      'radial-gradient(ellipse at 50% 0%, #1a0808 0%, transparent 60%),' +
      'radial-gradient(ellipse at 20% 100%, #1a0d08 0%, transparent 55%),' +
      'radial-gradient(ellipse at 80% 50%, #110808 0%, transparent 45%)',
    enterAnimation: 'down',
  },
  purgatorio: {
    background:    '#070d06',
    primary:       '#5a9038',
    primaryBright: '#76aa50',
    accent:        '#6aaa45',
    textBody:      '#a8c870',
    textMid:       '#88a055',
    textFaint:     '#607040',
    cardBg:        '#0d1309',
    cardHover:     '#121a0f',
    border:        'rgba(90,144,56,0.2)',
    borderFaint:   'rgba(90,144,56,0.08)',
    bodyGradient:
      'radial-gradient(ellipse at 50% 0%, rgba(20,50,10,0.6) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 20% 100%, rgba(10,30,5,0.4) 0%, transparent 55%)',
    enterAnimation: 'up',
  },
  paradiso: {
    background:    '#170e04',
    primary:       '#d4a820',
    primaryBright: '#f8d048',
    accent:        '#e0b830',
    textBody:      '#dcc270',
    textMid:       '#c0a050',
    textFaint:     '#906830',
    cardBg:        '#1f1408',
    cardHover:     '#2a1c0c',
    border:        'rgba(212,168,32,0.2)',
    borderFaint:   'rgba(212,168,32,0.08)',
    bodyGradient:
      'radial-gradient(ellipse at 50% 0%, rgba(120,80,10,0.2) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 50% 100%, rgba(80,50,5,0.15) 0%, transparent 55%)',
    enterAnimation: 'scale',
  },
};

export function getTheme(id: CanticleId): ThemeTokens {
  return themes[id];
}

/**
 * Converts a ThemeTokens object to a CSS custom property block string.
 * Used in globals.css via the [data-canticle="..."] selector.
 */
export function themeToCSSVars(t: ThemeTokens): string {
  return `
  --c-background:   ${t.background};
  --c-primary:      ${t.primary};
  --c-primary-bright: ${t.primaryBright};
  --c-accent:       ${t.accent};
  --c-text-body:    ${t.textBody};
  --c-text-mid:     ${t.textMid};
  --c-text-faint:   ${t.textFaint};
  --c-card-bg:      ${t.cardBg};
  --c-card-hover:   ${t.cardHover};
  --c-border:       ${t.border};
  --c-border-faint: ${t.borderFaint};
  --c-body-gradient: ${t.bodyGradient};
`.trim();
}
