'use client';

import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { offset?: number; duration?: number; immediate?: boolean },
    ) => {
      lenisRef.current?.scrollTo(target, options);
    },
    [],
  );

  return { scrollTo };
}
