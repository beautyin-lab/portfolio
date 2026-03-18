// ============================================================================
// @portfolio/theme — Package Entry Point
// ============================================================================

// Design tokens & types
export type {
  ThemePreset,
  ColorTokens,
  TypographyScale,
  SpacingDensity,
  BorderRadiusKey,
} from './tokens/design-tokens';

export {
  designTokens,
  typographyFamilies,
  typographySizes,
  typographyLineHeights,
  typographyWeights,
  typographyScaleMultipliers,
  spacingScale,
  spacingDensityMultipliers,
  breakpoints,
  borderRadiusScale,
  shadowScale,
  transitionDurations,
  transitionEasings,
} from './tokens/design-tokens';

// Theme engine
export { ThemeProvider, useTheme } from './engine/theme-provider';

// All presets (named exports)
export {
  medicalClean,
  medicalWarm,
  legalProfessional,
  legalModern,
  pensionNature,
  pensionLuxury,
  wellnessCalm,
  wellnessModern,
  fitnessBold,
  fitnessDark,
  petKidsPlayful,
  petKidsWarm,
  beautyElegant,
  beautyTrendy,
  cafeWarm,
  cafeMinimal,
  realtyTrust,
  realtyModern,
  weddingRomantic,
  weddingLuxury,
  studyFocus,
  studyModern,
  interiorPortfolio,
  interiorMinimal,
  flowerRomantic,
  flowerNatural,
  educationTrust,
  educationBright,
  restaurantAppetizing,
  restaurantTraditional,
  // Collections
  presetMap,
  allPresets,
  presetsByCategory,
} from './presets';
