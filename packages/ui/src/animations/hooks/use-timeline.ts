'use client';

import { useEffect, useRef } from 'react';

export interface TimelineStep {
  selector: string;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  position?: string | number;
}

interface TimelineOptions {
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export function useTimeline(
  animations: TimelineStep[],
  options: TimelineOptions = {},
) {
  const { scrub = 1, start = 'top 80%', end = 'bottom 20%' } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || animations.length === 0) return;

    let tl: { kill: () => void } | null = null;

    (async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      gsap.registerPlugin(ScrollTrigger);

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub,
          start,
          end,
        },
      });

      for (const step of animations) {
        const targets = container.querySelectorAll(step.selector);
        if (targets.length === 0) continue;

        (tl as ReturnType<typeof gsap.timeline>).fromTo(
          targets,
          step.from,
          step.to,
          step.position,
        );
      }
    })();

    return () => {
      tl?.kill();
    };
  }, [animations, scrub, start, end]);

  return { containerRef };
}
