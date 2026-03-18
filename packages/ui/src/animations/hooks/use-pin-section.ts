'use client';

import { useEffect, useRef } from 'react';

interface PinSectionOptions {
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export function usePinSection(options: PinSectionOptions = {}) {
  const { scrub = 1, start = 'top top', end = '+=100%' } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let trigger: { kill: () => void } | null = null;

    (async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: el,
        pin: true,
        scrub,
        start,
        end,
      });
    })();

    return () => {
      trigger?.kill();
    };
  }, [scrub, start, end]);

  return { ref };
}
