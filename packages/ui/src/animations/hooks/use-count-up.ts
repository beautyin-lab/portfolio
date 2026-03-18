'use client';

import { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';

interface CountUpOptions {
  duration?: number;
  decimals?: number;
}

export function useCountUp(target: number, options: CountUpOptions = {}) {
  const { duration = 1.5, decimals = 0 } = options;
  const ref = useRef<HTMLElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const rounded = useTransform(motionValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, target, {
      duration,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [isInView, target, duration, motionValue]);

  return { ref, value: rounded, isInView };
}
