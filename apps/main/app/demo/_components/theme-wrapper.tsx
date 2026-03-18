'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, presetMap } from '@portfolio/theme';
import { MockBackendProvider } from '@portfolio/mock-backend';
import type { SiteConfig } from '@portfolio/data';

// ---------------------------------------------------------------------------
// Category-to-preset fallback: first preset for each category
// Used when config.theme does not match any presetMap key
// ---------------------------------------------------------------------------
const categoryPresetMap: Record<string, [string, string]> = {
  medical: ['medical-clean', 'medical-warm'],
  legal: ['legal-professional', 'legal-modern'],
  pension: ['pension-nature', 'pension-luxury'],
  wellness: ['wellness-calm', 'wellness-modern'],
  fitness: ['fitness-bold', 'fitness-dark'],
  'pet-kids': ['pet-kids-playful', 'pet-kids-warm'],
  beauty: ['beauty-elegant', 'beauty-trendy'],
  cafe: ['cafe-warm', 'cafe-minimal'],
  realty: ['realty-trust', 'realty-modern'],
  wedding: ['wedding-romantic', 'wedding-luxury'],
  'study-cafe': ['study-focus', 'study-modern'],
  interior: ['interior-portfolio', 'interior-minimal'],
  flower: ['flower-romantic', 'flower-natural'],
  education: ['education-trust', 'education-bright'],
  restaurant: ['restaurant-appetizing', 'restaurant-traditional'],
};

// Site-specific overrides: `category/slug` -> presetMap key index (0 or 1)
const sitePresetIndex: Record<string, number> = {
  'beauty/hair-moment': 0,
  'beauty/nail-artistry': 1,
  'cafe/flour-story': 0,
  'cafe/sinsa-beans': 1,
  'education/english-plus': 1,
  'education/top-academy': 0,
  'fitness/vital-fitness': 1,
  'flower/bloom-florist': 0,
  'flower/petite-flower': 1,
  'interior/modam-interior': 0,
  'interior/space-design': 1,
  'pension/bluewave-resort': 1,
  'pet-kids/happy-paws': 1,
  'pet-kids/little-star': 0,
  'realty/gangnam-homes': 0,
  'realty/trust-realty': 1,
  'restaurant/hansang': 1,
  'restaurant/pasta-lane': 0,
  'study-cafe/deep-study': 0,
  'study-cafe/focus-zone': 1,
  'wedding/blossom-wedding': 0,
  'wedding/grace-hall': 1,
  'wellness/bodyline-pilates': 0,
  'wellness/flow-yoga': 1,
};

function resolvePresetKey(config: SiteConfig): string {
  // Direct match first
  if (presetMap[config.theme]) return config.theme;

  // Site-specific override
  const siteKey = `${config.category}/${config.slug}`;
  const idx = sitePresetIndex[siteKey];
  const catPresets = categoryPresetMap[config.category];
  if (catPresets && idx !== undefined) {
    return catPresets[idx];
  }

  // Category fallback: first preset
  if (catPresets) {
    return catPresets[0];
  }

  return config.theme;
}

interface ThemeWrapperProps {
  config: SiteConfig;
  children: ReactNode;
}

export function ThemeWrapper({ config, children }: ThemeWrapperProps) {
  const resolvedKey = resolvePresetKey(config);
  const preset = presetMap[resolvedKey] ?? Object.values(presetMap)[0];

  // Determine mock backend features
  const enabledFeatures: ('reservation' | 'inquiry' | 'order')[] = ['inquiry'];
  if (config.reservation) enabledFeatures.push('reservation');
  if (config.features?.menuBoard?.enabled || config.features?.order?.enabled) {
    enabledFeatures.push('order');
  }

  return (
    <ThemeProvider preset={preset}>
      <MockBackendProvider
        siteSlug={config.slug}
        config={{
          enabledFeatures,
          seedDataFile: '',
          simulateErrors: false,
        }}
      >
        {children}
      </MockBackendProvider>
    </ThemeProvider>
  );
}
