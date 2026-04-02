'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  id:         'inferno' | 'purgatorio' | 'paradiso';
  title:      string;
  numeral:    'I' | 'II' | 'III';
  overline:   string;
  description: string;
  cantoCount:  number;
  href:        string;
}

const THEMES = {
  inferno: {
    bg:       '#0a0806',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(100,8,8,0.45) 0%, transparent 65%)',
    numColor: 'rgba(139,26,26,0.1)',
    numHover: 'rgba(139,26,26,0.2)',
    primary:  '#8b1a1a',
    bright:   '#c0392b',
    text:     '#c8b8a8',
    textMid:  '#786860',
    border:   'rgba(139,26,26,0.15)',
    arrowColor: '#8b1a1a',
  },
  purgatorio: {
    bg:       '#070d06',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(15,40,8,0.6) 0%, transparent 65%)',
    numColor: 'rgba(80,120,50,0.1)',
    numHover: 'rgba(80,120,50,0.2)',
    primary:  '#5a9038',
    bright:   '#76aa50',
    text:     '#a8c870',
    textMid:  '#607040',
    border:   'rgba(90,144,56,0.15)',
    arrowColor: '#5a9038',
  },
  paradiso: {
    bg:       '#170e04',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(100,70,5,0.35) 0%, transparent 65%)',
    numColor: 'rgba(180,140,20,0.1)',
    numHover: 'rgba(180,140,20,0.2)',
    primary:  '#d4a820',
    bright:   '#f8d048',
    text:     '#dcc270',
    textMid:  '#906830',
    border:   'rgba(212,168,32,0.15)',
    arrowColor: '#d4a820',
  },
} as const;

export default function CanticleCard({
  id, title, numeral, overline, description, cantoCount, href,
}: Props) {
  const t = THEMES[id];

  return (
    <Link href={href} style={{ flex: 1, textDecoration: 'none', display: 'block', minWidth: '260px' }}>
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-none h-full"
      style={{
        background: t.bg,
        backgroundImage: t.gradient,
        border: `1px solid ${t.border}`,
        minHeight: '420px',
      }}
    >
      {/* Large decorative roman numeral */}
      <motion.div
        className="absolute font-cinzel-decorative select-none pointer-events-none"
        initial={{ color: t.numColor }}
        whileHover={{ color: t.numHover }}
        style={{
          fontSize: 'clamp(6rem, 14vw, 10rem)',
          lineHeight: 1,
          bottom: '-0.15em',
          right: '0.1em',
          letterSpacing: '-0.04em',
        }}
      >
        {numeral}
      </motion.div>

      <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: '420px' }}>
        <p
          className="font-cinzel uppercase mb-4"
          style={{ fontSize: '10px', letterSpacing: '0.38em', color: t.primary }}
        >
          {overline}
        </p>

        <h2
          className="font-cinzel-decorative mb-4"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            color: t.bright,
          }}
        >
          {title}
        </h2>

        <p
          className="font-garamond mb-6 flex-1"
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: t.text,
          }}
        >
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p
            className="font-cinzel uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.32em', color: t.textMid }}
          >
            {cantoCount} Cantos
          </p>

          <span
            className="font-cinzel uppercase flex items-center gap-2"
            style={{
              fontSize: '9px',
              letterSpacing: '0.32em',
              color: t.arrowColor,
            }}
          >
            Read <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
