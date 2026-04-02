'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 py-20"
      style={{
        background: '#0a0806',
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(139,26,26,0.18) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 50% 100%, rgba(176,125,16,0.08) 0%, transparent 55%)',
      }}
    >
      {/* Bottom separator */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(139,26,26,0.4), rgba(176,125,16,0.4), rgba(139,26,26,0.4), transparent)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.p
          variants={item}
          className="font-cinzel uppercase mb-8"
          style={{
            fontSize: '11px',
            letterSpacing: '0.5em',
            color: '#a09090',
            opacity: 0.8,
          }}
        >
          A Canto by Canto Commentary
        </motion.p>

        <motion.h1
          variants={item}
          className="font-cinzel-decorative gradient-title mb-5"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
          }}
        >
          La Divina Commedia
        </motion.h1>

        <motion.p
          variants={item}
          className="font-cinzel uppercase mb-12"
          style={{
            fontSize: 'clamp(0.8rem, 1.6vw, 1rem)',
            letterSpacing: '0.22em',
            color: '#7a6868',
          }}
        >
          Dante Alighieri · c. 1304–1321
        </motion.p>

        <motion.blockquote
          variants={item}
          className="font-garamond italic mx-auto"
          style={{
            maxWidth: '520px',
            fontSize: '1.1rem',
            lineHeight: 1.75,
            color: '#a09090',
          }}
        >
          Nel mezzo del cammin di nostra vita<br />
          mi ritrovai per una selva oscura,<br />
          ché la diritta via era smarrita.
          <cite
            className="not-italic block font-cinzel mt-3"
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              color: '#584848',
            }}
          >
            — Dante Alighieri, Inferno I, 1–3
          </cite>
        </motion.blockquote>

        <motion.p
          variants={item}
          className="font-cinzel uppercase mt-16"
          style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#3a2828' }}
        >
          ↓ scroll
        </motion.p>
      </motion.div>
    </section>
  );
}
