'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SectionHeader as SectionHeaderData } from '@/data/types';
import Badge from '@/components/ui/Badge';

interface Props {
  header: SectionHeaderData;
  sectionId: string;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const line = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function SectionHeader({ header, sectionId }: Props) {
  const { variant } = header;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  if (variant === 'part') {
    return (
      <motion.div
        ref={ref}
        id={sectionId}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="px-6 py-10 text-center relative"
        style={{ borderBottom: '1px solid var(--c-border-faint)', scrollMarginTop: '88px' }}
      >
        <div
          aria-hidden
          className="absolute bottom-0 left-[20%] right-[20%] h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--c-primary), transparent)',
          }}
        />
        <motion.p
          variants={line}
          className="font-cinzel uppercase mb-3"
          style={{ fontSize: '10px', letterSpacing: '0.45em', color: 'var(--c-text-faint)' }}
        >
          {header.badge}
        </motion.p>
        <motion.h2
          variants={line}
          className="font-cinzel-decorative mb-3"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            letterSpacing: '0.04em',
            color: 'var(--c-primary-bright)',
          }}
        >
          {header.title}
        </motion.h2>
        {header.cantoRange && (
          <motion.p
            variants={line}
            className="font-cinzel uppercase mb-4"
            style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'var(--c-text-faint)' }}
          >
            {header.cantoRange}
          </motion.p>
        )}
        {header.intro && (
          <motion.p
            variants={line}
            className="font-garamond italic mx-auto"
            style={{
              maxWidth: '560px',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--c-text-mid)',
            }}
          >
            {header.intro}
          </motion.p>
        )}
      </motion.div>
    );
  }

  // circle / terrace / heaven — all share the same compact layout
  const labelKey = {
    circle:  'circle-title',
    terrace: 'terrace-title',
    heaven:  'heaven-title',
  }[variant];

  return (
    <motion.div
      ref={ref}
      id={sectionId}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="px-6 pt-12 pb-6"
      style={{ scrollMarginTop: '88px' }}
    >
      <motion.div variants={line} className="mb-3">
        <Badge>{header.badge}</Badge>
      </motion.div>
      <motion.h2
        variants={line}
        className="font-cinzel mb-2"
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          letterSpacing: '0.06em',
          color: 'var(--c-primary-bright)',
        }}
        aria-label={`${labelKey}: ${header.title}`}
      >
        {header.title}
      </motion.h2>
      {header.subtitle && (
        <motion.p
          variants={line}
          className="font-garamond italic"
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.65,
            color: 'var(--c-text-mid)',
          }}
        >
          {header.subtitle}
        </motion.p>
      )}
      <motion.div
        variants={line}
        className="mt-5 h-px"
        style={{
          background:
            'linear-gradient(to right, var(--c-primary), transparent)',
          opacity: 0.35,
        }}
      />
    </motion.div>
  );
}
