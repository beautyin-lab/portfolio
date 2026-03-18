// ============================================================================
// Theme Presets — All 30 industry-specific presets (15 categories x 2)
// ============================================================================

// Medical
export { default as medicalClean } from './medical-clean';
export { default as medicalWarm } from './medical-warm';

// Legal
export { default as legalProfessional } from './legal-professional';
export { default as legalModern } from './legal-modern';

// Pension
export { default as pensionNature } from './pension-nature';
export { default as pensionLuxury } from './pension-luxury';

// Wellness
export { default as wellnessCalm } from './wellness-calm';
export { default as wellnessModern } from './wellness-modern';

// Fitness
export { default as fitnessBold } from './fitness-bold';
export { default as fitnessDark } from './fitness-dark';

// Pet & Kids
export { default as petKidsPlayful } from './pet-kids-playful';
export { default as petKidsWarm } from './pet-kids-warm';

// Beauty
export { default as beautyElegant } from './beauty-elegant';
export { default as beautyTrendy } from './beauty-trendy';

// Cafe
export { default as cafeWarm } from './cafe-warm';
export { default as cafeMinimal } from './cafe-minimal';

// Realty
export { default as realtyTrust } from './realty-trust';
export { default as realtyModern } from './realty-modern';

// Wedding
export { default as weddingRomantic } from './wedding-romantic';
export { default as weddingLuxury } from './wedding-luxury';

// Study Cafe
export { default as studyFocus } from './study-focus';
export { default as studyModern } from './study-modern';

// Interior
export { default as interiorPortfolio } from './interior-portfolio';
export { default as interiorMinimal } from './interior-minimal';

// Flower
export { default as flowerRomantic } from './flower-romantic';
export { default as flowerNatural } from './flower-natural';

// Education
export { default as educationTrust } from './education-trust';
export { default as educationBright } from './education-bright';

// Restaurant
export { default as restaurantAppetizing } from './restaurant-appetizing';
export { default as restaurantTraditional } from './restaurant-traditional';

// ---------------------------------------------------------------------------
// Aggregate collections for programmatic access
// ---------------------------------------------------------------------------
import type { ThemePreset } from '../tokens/design-tokens';

import medicalCleanPreset from './medical-clean';
import medicalWarmPreset from './medical-warm';
import legalProfessionalPreset from './legal-professional';
import legalModernPreset from './legal-modern';
import pensionNaturePreset from './pension-nature';
import pensionLuxuryPreset from './pension-luxury';
import wellnessCalmPreset from './wellness-calm';
import wellnessModernPreset from './wellness-modern';
import fitnessBoldPreset from './fitness-bold';
import fitnessDarkPreset from './fitness-dark';
import petKidsPlayfulPreset from './pet-kids-playful';
import petKidsWarmPreset from './pet-kids-warm';
import beautyElegantPreset from './beauty-elegant';
import beautyTrendyPreset from './beauty-trendy';
import cafeWarmPreset from './cafe-warm';
import cafeMinimalPreset from './cafe-minimal';
import realtyTrustPreset from './realty-trust';
import realtyModernPreset from './realty-modern';
import weddingRomanticPreset from './wedding-romantic';
import weddingLuxuryPreset from './wedding-luxury';
import studyFocusPreset from './study-focus';
import studyModernPreset from './study-modern';
import interiorPortfolioPreset from './interior-portfolio';
import interiorMinimalPreset from './interior-minimal';
import flowerRomanticPreset from './flower-romantic';
import flowerNaturalPreset from './flower-natural';
import educationTrustPreset from './education-trust';
import educationBrightPreset from './education-bright';
import restaurantAppetizingPreset from './restaurant-appetizing';
import restaurantTraditionalPreset from './restaurant-traditional';

/** All 30 presets indexed by id */
export const presetMap: Record<string, ThemePreset> = {
  'medical-clean': medicalCleanPreset,
  'medical-warm': medicalWarmPreset,
  'legal-professional': legalProfessionalPreset,
  'legal-modern': legalModernPreset,
  'pension-nature': pensionNaturePreset,
  'pension-luxury': pensionLuxuryPreset,
  'wellness-calm': wellnessCalmPreset,
  'wellness-modern': wellnessModernPreset,
  'fitness-bold': fitnessBoldPreset,
  'fitness-dark': fitnessDarkPreset,
  'pet-kids-playful': petKidsPlayfulPreset,
  'pet-kids-warm': petKidsWarmPreset,
  'beauty-elegant': beautyElegantPreset,
  'beauty-trendy': beautyTrendyPreset,
  'cafe-warm': cafeWarmPreset,
  'cafe-minimal': cafeMinimalPreset,
  'realty-trust': realtyTrustPreset,
  'realty-modern': realtyModernPreset,
  'wedding-romantic': weddingRomanticPreset,
  'wedding-luxury': weddingLuxuryPreset,
  'study-focus': studyFocusPreset,
  'study-modern': studyModernPreset,
  'interior-portfolio': interiorPortfolioPreset,
  'interior-minimal': interiorMinimalPreset,
  'flower-romantic': flowerRomanticPreset,
  'flower-natural': flowerNaturalPreset,
  'education-trust': educationTrustPreset,
  'education-bright': educationBrightPreset,
  'restaurant-appetizing': restaurantAppetizingPreset,
  'restaurant-traditional': restaurantTraditionalPreset,
};

/** All 30 presets as an array */
export const allPresets: ThemePreset[] = Object.values(presetMap);

/** Presets grouped by category */
export const presetsByCategory: Record<string, [ThemePreset, ThemePreset]> = {
  medical: [medicalCleanPreset, medicalWarmPreset],
  legal: [legalProfessionalPreset, legalModernPreset],
  pension: [pensionNaturePreset, pensionLuxuryPreset],
  wellness: [wellnessCalmPreset, wellnessModernPreset],
  fitness: [fitnessBoldPreset, fitnessDarkPreset],
  'pet-kids': [petKidsPlayfulPreset, petKidsWarmPreset],
  beauty: [beautyElegantPreset, beautyTrendyPreset],
  cafe: [cafeWarmPreset, cafeMinimalPreset],
  realty: [realtyTrustPreset, realtyModernPreset],
  wedding: [weddingRomanticPreset, weddingLuxuryPreset],
  study: [studyFocusPreset, studyModernPreset],
  interior: [interiorPortfolioPreset, interiorMinimalPreset],
  flower: [flowerRomanticPreset, flowerNaturalPreset],
  education: [educationTrustPreset, educationBrightPreset],
  restaurant: [restaurantAppetizingPreset, restaurantTraditionalPreset],
};
