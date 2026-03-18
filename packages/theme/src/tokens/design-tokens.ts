// ============================================================================
// Design Tokens — Portfolio Agency Design System
// ============================================================================
// All color values use HSL format for easy manipulation.
// Spacing follows an 8px-grid with named aliases.
// Typography uses Pretendard as the primary typeface.
// ============================================================================

// ---------------------------------------------------------------------------
// Color Semantics
// ---------------------------------------------------------------------------
export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const typographyFamilies = {
  heading: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const;

export const typographySizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
} as const;

export const typographyLineHeights = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.5',
  relaxed: '1.65',
} as const;

export const typographyWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export type TypographyScale = 'compact' | 'standard' | 'spacious';

/** Multipliers applied to the base size scale per scale variant */
export const typographyScaleMultipliers: Record<TypographyScale, number> = {
  compact: 0.9,
  standard: 1,
  spacious: 1.15,
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------
export const spacingScale = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

export type SpacingDensity = 'tight' | 'normal' | 'relaxed';

/** Multipliers applied to the base spacing scale per density variant */
export const spacingDensityMultipliers: Record<SpacingDensity, number> = {
  tight: 0.75,
  normal: 1,
  relaxed: 1.25,
} as const;

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------
export const breakpoints = {
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------
export const borderRadiusScale = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
} as const;

export type BorderRadiusKey = keyof typeof borderRadiusScale;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------
export const shadowScale = {
  sm: '0 1px 2px 0 hsl(0 0% 0% / 0.05)',
  md: '0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.05)',
  lg: '0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.04)',
  xl: '0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.06)',
} as const;

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------
export const transitionDurations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '800ms',
} as const;

export const transitionEasings = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ---------------------------------------------------------------------------
// Theme Preset Interface
// ---------------------------------------------------------------------------
export interface ThemePreset {
  id: string;
  name: string;
  colors: ColorTokens;
  typography: {
    heading: string;
    body: string;
    scale: TypographyScale;
  };
  borderRadius: BorderRadiusKey;
  spacing: SpacingDensity;
  style: 'minimal' | 'modern' | 'warm' | 'luxury' | 'playful' | 'professional';
}

// ---------------------------------------------------------------------------
// Aggregate export for convenience
// ---------------------------------------------------------------------------
export const designTokens = {
  typography: {
    families: typographyFamilies,
    sizes: typographySizes,
    lineHeights: typographyLineHeights,
    weights: typographyWeights,
    scaleMultipliers: typographyScaleMultipliers,
  },
  spacing: {
    scale: spacingScale,
    densityMultipliers: spacingDensityMultipliers,
  },
  breakpoints,
  borderRadius: borderRadiusScale,
  shadows: shadowScale,
  transitions: {
    durations: transitionDurations,
    easings: transitionEasings,
  },
} as const;
