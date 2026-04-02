'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Canto, Section, CanticleId } from '@/data/types';
import CharactersSidebar from './CharactersSidebar';

interface Props {
  canticleId: CanticleId;
  canto: Canto;
  section: Section;
  prev: Canto | null;
  next: Canto | null;
}

const CANTICLE_LABELS: Record<CanticleId, string> = {
  inferno:    'Inferno',
  purgatorio: 'Purgatorio',
  paradiso:   'Paradiso',
};

export default function CantoPageContent({ canticleId, canto, section, prev, next }: Props) {
  const canticleLabel = CANTICLE_LABELS[canticleId];

  return (
    <main className="px-6 pb-20" style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav
        className="flex items-center gap-2 pt-8 pb-6 font-cinzel uppercase"
        style={{ fontSize: '9px', letterSpacing: '0.3em' }}
        aria-label="Breadcrumb"
      >
        <Link
          href={`/${canticleId}`}
          className="transition-colors duration-200"
          style={{ color: 'var(--c-text-faint)', textDecoration: 'none' }}
        >
          {canticleLabel}
        </Link>
        <span style={{ color: 'var(--c-border)' }} aria-hidden>·</span>
        <span style={{ color: 'var(--c-primary)' }}>{canto.ordinalLabel}</span>
      </nav>

      {/* ── Canto header ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
        style={{ borderBottom: '1px solid var(--c-border-faint)', paddingBottom: '2rem' }}
      >
        {/* Section badge */}
        <p
          className="font-cinzel uppercase mb-3"
          style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'var(--c-text-faint)' }}
        >
          {section.header.badge}
          {section.header.title && (
            <> · <span style={{ color: 'var(--c-text-faint)' }}>{section.header.title}</span></>
          )}
        </p>

        {/* Roman numeral + canto label */}
        <div className="flex items-baseline gap-4 mb-3">
          <span
            className="font-cinzel-decorative"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1,
              color: 'var(--c-primary)',
              opacity: 0.5,
            }}
            aria-hidden
          >
            {canto.numeralRoman}
          </span>
          <span
            className="font-cinzel uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.38em', color: 'var(--c-text-faint)' }}
          >
            {canto.ordinalLabel}
          </span>
        </div>

        <h1
          className="font-cinzel mb-4"
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            lineHeight: 1.35,
            letterSpacing: '0.04em',
            color: 'var(--c-primary-bright)',
          }}
        >
          {canto.title}
        </h1>

        <p
          className="font-garamond italic"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.72,
            color: 'var(--c-text-mid)',
            maxWidth: '640px',
          }}
        >
          {canto.hook}
        </p>
      </motion.header>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-garamond"
        style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--c-text-body)' }}
      >
        {canto.body.map((para, i) => (
          <p
            key={i}
            className={i > 0 ? 'mt-5' : ''}
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}
        <div className="mt-8">
          <CharactersSidebar characters={canto.characters} />
        </div>
      </motion.article>

      {/* ── Prev / Next navigation ───────────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between mt-16 pt-6 font-cinzel uppercase"
        style={{
          borderTop: '1px solid var(--c-border-faint)',
          fontSize: '9px',
          letterSpacing: '0.3em',
        }}
        aria-label="Adjacent cantos"
      >
        <div>
          {prev && (
            <Link
              href={`/${canticleId}/canto/${prev.slug}`}
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'var(--c-text-faint)', textDecoration: 'none' }}
            >
              <span aria-hidden>←</span>
              <span>
                <span style={{ color: 'var(--c-text-faint)', display: 'block' }}>
                  {prev.ordinalLabel}
                </span>
                <span
                  className="font-garamond normal-case mt-0.5 block"
                  style={{ fontSize: '0.8rem', letterSpacing: '0', color: 'var(--c-text-mid)' }}
                >
                  {prev.title.length > 42 ? prev.title.slice(0, 42) + '…' : prev.title}
                </span>
              </span>
            </Link>
          )}
        </div>

        <Link
          href={`/${canticleId}`}
          className="transition-colors duration-200"
          style={{ color: 'var(--c-text-faint)', textDecoration: 'none' }}
        >
          All Cantos
        </Link>

        <div className="text-right">
          {next && (
            <Link
              href={`/${canticleId}/canto/${next.slug}`}
              className="flex items-center gap-2 justify-end transition-colors duration-200"
              style={{ color: 'var(--c-text-faint)', textDecoration: 'none' }}
            >
              <span>
                <span style={{ color: 'var(--c-text-faint)', display: 'block' }}>
                  {next.ordinalLabel}
                </span>
                <span
                  className="font-garamond normal-case mt-0.5 block"
                  style={{ fontSize: '0.8rem', letterSpacing: '0', color: 'var(--c-text-mid)' }}
                >
                  {next.title.length > 42 ? next.title.slice(0, 42) + '…' : next.title}
                </span>
              </span>
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
