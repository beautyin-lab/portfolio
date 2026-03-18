'use client';

import { type FMPresetKey, fmPresets } from '../presets';

export function useScrollReveal(preset: FMPresetKey = 'fade-up') {
  const { initial, animate, transition } = fmPresets[preset];

  return {
    initial,
    whileInView: animate,
    viewport: { once: true, amount: 0.3 },
    transition,
  };
}
