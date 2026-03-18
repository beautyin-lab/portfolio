'use client';

import type { Variants } from 'framer-motion';

interface StaggerRevealOptions {
  stagger?: number;
  delay?: number;
}

export function useStaggerReveal(options: StaggerRevealOptions = {}) {
  const { stagger = 0.1, delay = 0 } = options;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return { containerVariants, childVariants };
}
