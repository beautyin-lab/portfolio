// ============================================================================
// Site Registry — 30 demo sites lookup
// ============================================================================

import type { SiteConfig, Category } from './schemas/site-config';

// Medical
import gangnamSmile from './content/medical/gangnam-smile.json';
import hanbitClinic from './content/medical/hanbit-clinic.json';

// Legal
import jungLaw from './content/legal/jung-law.json';
import seojinLegal from './content/legal/seojin-legal.json';

// Pension
import bluewaveResort from './content/pension/bluewave-resort.json';
import forestHouse from './content/pension/forest-house.json';

// Wellness
import bodylinePilates from './content/wellness/bodyline-pilates.json';
import flowYoga from './content/wellness/flow-yoga.json';

// Fitness
import ironGym from './content/fitness/iron-gym.json';
import vitalFitness from './content/fitness/vital-fitness.json';

// Pet & Kids
import happyPaws from './content/pet-kids/happy-paws.json';
import littleStar from './content/pet-kids/little-star.json';

// Beauty
import hairMoment from './content/beauty/hair-moment.json';
import nailArtistry from './content/beauty/nail-artistry.json';

// Cafe
import flourStory from './content/cafe/flour-story.json';
import sinsaBeans from './content/cafe/sinsa-beans.json';

// Realty
import gangnamHomes from './content/realty/gangnam-homes.json';
import trustRealty from './content/realty/trust-realty.json';

// Wedding
import blossomWedding from './content/wedding/blossom-wedding.json';
import graceHall from './content/wedding/grace-hall.json';

// Study Cafe
import deepStudy from './content/study-cafe/deep-study.json';
import focusZone from './content/study-cafe/focus-zone.json';

// Interior
import modamInterior from './content/interior/modam-interior.json';
import spaceDesign from './content/interior/space-design.json';

// Flower
import bloomFlorist from './content/flower/bloom-florist.json';
import petiteFlower from './content/flower/petite-flower.json';

// Education
import englishPlus from './content/education/english-plus.json';
import topAcademy from './content/education/top-academy.json';

// Restaurant
import hansang from './content/restaurant/hansang.json';
import pastaLane from './content/restaurant/pasta-lane.json';

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

const allSites: SiteConfig[] = [
  gangnamSmile,
  hanbitClinic,
  jungLaw,
  seojinLegal,
  bluewaveResort,
  forestHouse,
  bodylinePilates,
  flowYoga,
  ironGym,
  vitalFitness,
  happyPaws,
  littleStar,
  hairMoment,
  nailArtistry,
  flourStory,
  sinsaBeans,
  gangnamHomes,
  trustRealty,
  blossomWedding,
  graceHall,
  deepStudy,
  focusZone,
  modamInterior,
  spaceDesign,
  bloomFlorist,
  petiteFlower,
  englishPlus,
  topAcademy,
  hansang,
  pastaLane,
] as unknown as SiteConfig[];

/** Lookup map: `category/slug` -> SiteConfig */
const siteMap = new Map<string, SiteConfig>();
for (const site of allSites) {
  siteMap.set(`${site.category}/${site.slug}`, site);
}

/**
 * Get a single site config by category and slug.
 */
export function getSiteConfig(category: string, slug: string): SiteConfig | null {
  return siteMap.get(`${category}/${slug}`) ?? null;
}

/**
 * Get all 30 site configs.
 */
export function getAllSites(): SiteConfig[] {
  return allSites;
}

/**
 * Get all sites for a given category.
 */
export function getSitesByCategory(category: string): SiteConfig[] {
  return allSites.filter((s) => s.category === category);
}

/**
 * Get a single site config by slug (across all categories).
 */
export function getSiteBySlug(slug: string): SiteConfig | null {
  return allSites.find((s) => s.slug === slug) ?? null;
}

/**
 * Get all unique category slugs.
 */
export function getAllCategories(): Category[] {
  const cats = new Set<Category>();
  for (const s of allSites) {
    cats.add(s.category);
  }
  return Array.from(cats);
}
