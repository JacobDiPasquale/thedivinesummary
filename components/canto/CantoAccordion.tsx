'use client';

import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Canto } from '@/data/types';
import CharactersSidebar from './CharactersSidebar';
import { AccordionContext } from './AccordionContext';

interface Props {
  canto: Canto;
}

export default function CantoAccordion({ canto }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = useContext(AccordionContext);

  // Respond to expand-all / collapse-all from context
  useEffect(() => {
    if (ctx.allOpen !== null) setIsOpen(ctx.allOpen);
  }, [ctx.allOpen, ctx.generation]);

  // Register this accordion with the context so it can report back its state
  useEffect(() => {
    ctx.register(canto.slug, setIsOpen);
    return () => ctx.unregister(canto.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canto.slug]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-[3px] cursor-pointer select-none"
      style={{ background: 'var(--c-card-bg)' }}
      onClick={() => setIsOpen(o => !o)}
      role="button"
      aria-expanded={isOpen}
      aria-controls={`canto-body-${canto.slug}`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(o => !o);
        }
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="flex items-start gap-4 px-5 py-4 transition-colors duration-200"
        whileHover={{ backgroundColor: 'var(--c-card-hover)' }}
      >
        {/* Roman numeral */}
        <div
          className="font-cinzel-decorative shrink-0 leading-none"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: 'var(--c-primary)',
            opacity: isOpen ? 0.7 : 0.35,
            minWidth: '3rem',
            transition: 'opacity 0.2s',
          }}
          aria-hidden
        >
          {canto.numeralRoman}
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0 pt-1">
          <p
            className="font-cinzel uppercase mb-1"
            style={{
              fontSize: '9px',
              letterSpacing: '0.32em',
              color: 'var(--c-text-faint)',
            }}
          >
            {canto.ordinalLabel}
          </p>
          <h3
            className="font-cinzel mb-1"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.03em',
              color: 'var(--c-primary-bright)',
              lineHeight: 1.4,
            }}
          >
            {canto.title}
          </h3>
          <p
            className="font-garamond italic"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--c-text-mid)',
            }}
          >
            {canto.hook}
          </p>
        </div>

        {/* Toggle icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 font-cinzel text-xl leading-none mt-1"
          style={{ color: 'var(--c-primary)', opacity: 0.7 }}
          aria-hidden
        >
          +
        </motion.div>
      </motion.div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`canto-body-${canto.slug}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height:  { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height:  { duration: 0.3 },
                opacity: { duration: 0.15 },
              },
            }}
            style={{ overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="font-garamond px-5 pb-6 pt-1"
              style={{
                paddingLeft: 'clamp(1.25rem, 5vw, 6.5rem)',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--c-text-body)',
              }}
            >
              {canto.body.map((para, i) => (
                <p
                  key={i}
                  className={i > 0 ? 'mt-4' : ''}
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
              <CharactersSidebar characters={canto.characters} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
