'use client';

import { motion } from 'framer-motion';
import type { CanticleId } from '@/data/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VARIANTS: Record<CanticleId, { initial: any; animate: any; exit: any }> = {
  // Inferno: descends in from above
  inferno: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: 16,  transition: { duration: 0.25 } },
  },
  // Purgatorio: rises in from below
  purgatorio: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -14, transition: { duration: 0.25 } },
  },
  // Paradiso: radiates in (scale + opacity)
  paradiso: {
    initial: { opacity: 0, scale: 0.975 },
    animate: { opacity: 1, scale: 1,    transition: { duration: 0.65, ease: 'easeOut' } },
    exit:    { opacity: 0, scale: 1.01, transition: { duration: 0.25 } },
  },
};

interface Props {
  canticleId: CanticleId;
  children: React.ReactNode;
}

export default function PageTransition({ canticleId, children }: Props) {
  const v = VARIANTS[canticleId];
  return (
    <motion.div initial={v.initial} animate={v.animate} exit={v.exit}>
      {children}
    </motion.div>
  );
}
