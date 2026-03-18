'use client';

// Presets
export {
  fmPresets,
  gsapPresets,
  type FMPreset,
  type FMPresetKey,
  type GSAPPresetKey,
  type GSAPPinSectionPreset,
  type GSAPTimelinePreset,
  type GSAPSplitTextPreset,
} from './presets';

// Framer Motion hooks
export { useScrollReveal } from './hooks/use-scroll-reveal';
export { useCountUp } from './hooks/use-count-up';
export { useStaggerReveal } from './hooks/use-stagger-reveal';
export { useMouseFollow } from './hooks/use-mouse-follow';

// GSAP hooks
export { usePinSection } from './hooks/use-pin-section';
export { useTimeline, type TimelineStep } from './hooks/use-timeline';
export { useTextSplit } from './hooks/use-text-split';

// Lenis hooks
export { useSmoothScroll } from './hooks/use-smooth-scroll';

// Components
export {
  ScrollReveal,
  type ScrollRevealProps,
} from './components/scroll-reveal';
export {
  StaggerContainer,
  type StaggerContainerProps,
} from './components/stagger-container';
export {
  SmoothScrollProvider,
  type SmoothScrollProviderProps,
} from './components/smooth-scroll-provider';
