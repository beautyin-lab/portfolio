'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { type FMPresetKey } from '../presets';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  preset?: FMPresetKey;
  children: React.ReactNode;
}

const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ preset = 'fade-up', children, ...props }, ref) => {
    const revealProps = useScrollReveal(preset);

    return (
      <motion.div ref={ref} {...revealProps} {...props}>
        {children}
      </motion.div>
    );
  },
);
ScrollReveal.displayName = 'ScrollReveal';

export { ScrollReveal, type ScrollRevealProps };
