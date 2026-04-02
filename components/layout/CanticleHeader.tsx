import type { CanticleData } from '@/data/types';

interface Props {
  canticle: CanticleData;
}

export default function CanticleHeader({ canticle }: Props) {
  return (
    <header
      className="text-center px-6 pt-20 pb-16 relative overflow-hidden"
      style={{ borderBottom: '1px solid var(--c-border)' }}
    >
      {/* Radial glow overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, var(--c-primary) 0%, transparent 60%)',
          opacity: 0.12,
        }}
      />
      {/* Bottom gradient rule */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--c-primary), transparent)',
        }}
      />

      <p
        className="font-cinzel uppercase relative"
        style={{
          fontSize: '11px',
          letterSpacing: '0.38em',
          color: 'var(--c-primary)',
          marginBottom: '28px',
        }}
      >
        {canticle.overline}
      </p>

      <h1
        className="font-cinzel-decorative relative"
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
          lineHeight: 1.12,
          letterSpacing: '0.04em',
          color: 'var(--c-primary-bright)',
          marginBottom: '14px',
        }}
      >
        {canticle.title}
      </h1>

      <p
        className="font-cinzel uppercase relative"
        style={{
          fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)',
          letterSpacing: '0.22em',
          color: 'var(--c-text-faint)',
          marginBottom: '48px',
        }}
      >
        {canticle.subtitle}
      </p>

      <blockquote
        className="relative mx-auto font-garamond italic"
        style={{
          maxWidth: '520px',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: 'var(--c-text-mid)',
        }}
      >
        {canticle.epigraph.lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < canticle.epigraph.lines.length - 1 && <br />}
          </span>
        ))}
        <cite
          className="not-italic block font-cinzel mt-3"
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.18em',
            color: 'var(--c-text-faint)',
            opacity: 0.6,
          }}
        >
          — {canticle.epigraph.attribution}
        </cite>
      </blockquote>
    </header>
  );
}
