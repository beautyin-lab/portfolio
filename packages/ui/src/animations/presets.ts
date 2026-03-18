'use client';

import type { Variants, Transition, MotionStyle } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FMPreset {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Transition;
}

export interface GSAPPinSectionPreset {
  scrub: boolean | number;
  pin: boolean;
  start: string;
  end: string;
}

export interface GSAPTimelinePreset {
  scrub: boolean | number;
  start: string;
  end: string;
}

export interface GSAPSplitTextPreset {
  type: 'chars' | 'words' | 'lines';
  stagger: number;
  from: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Framer Motion Presets
// ---------------------------------------------------------------------------

export const fmPresets = {
  'fade-up': {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  'fade-down': {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  'fade-left': {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  'fade-right': {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  'scale-in': {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  'blur-in': {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  'stagger-children': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  'stagger-grid': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  'spring-bounce': {
    initial: { opacity: 0, scale: 0.5, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  'count-up': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, ease: 'easeOut' },
  },
  'scroll-progress': {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.3, ease: 'linear' },
  },
} as const satisfies Record<string, FMPreset>;

export type FMPresetKey = keyof typeof fmPresets;

// ---------------------------------------------------------------------------
// GSAP Presets
// ---------------------------------------------------------------------------

export const gsapPresets = {
  'gsap-pin-section': {
    scrub: 1,
    pin: true,
    start: 'top top',
    end: '+=100%',
  },
  'gsap-timeline': {
    scrub: 1,
    start: 'top 80%',
    end: 'bottom 20%',
  },
  'gsap-split-text': {
    type: 'chars' as const,
    stagger: 0.03,
    from: { opacity: 0, y: 20 },
  },
} as const;

export type GSAPPresetKey = keyof typeof gsapPresets;
