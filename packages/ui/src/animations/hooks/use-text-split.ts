'use client';

import { useEffect, useRef } from 'react';

interface TextSplitOptions {
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
}

function splitTextIntoSpans(
  el: HTMLElement,
  type: 'chars' | 'words' | 'lines',
): HTMLSpanElement[] {
  const text = el.textContent || '';
  el.textContent = '';

  let parts: string[];

  switch (type) {
    case 'chars':
      parts = text.split('');
      break;
    case 'words':
      parts = text.split(/(\s+)/);
      break;
    case 'lines':
      parts = text.split('\n');
      break;
  }

  const spans: HTMLSpanElement[] = [];

  for (const part of parts) {
    if (type === 'words' && /^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      continue;
    }

    const span = document.createElement('span');
    span.style.display = type === 'lines' ? 'block' : 'inline-block';
    span.textContent = part;
    el.appendChild(span);
    spans.push(span);
  }

  return spans;
}

export function useTextSplit(options: TextSplitOptions = {}) {
  const { type = 'chars', stagger = 0.03 } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const originalHTML = el.innerHTML;
    const spans = splitTextIntoSpans(el, type);

    if (spans.length === 0) return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(spans, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }, el);
    })();

    return () => {
      ctx?.revert();
      el.innerHTML = originalHTML;
    };
  }, [type, stagger]);

  return { ref };
}
