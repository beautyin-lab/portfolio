'use client';

import * as React from 'react';
import { ThemeProvider } from '@portfolio/theme';
import { presetMap } from '@portfolio/theme';
import { MockBackendProvider } from '@portfolio/mock-backend';
import type { SiteConfig } from '@portfolio/data';

interface ThemeWrapperProps {
  config: SiteConfig;
  children: React.ReactNode;
}

export function ThemeWrapper({ config, children }: ThemeWrapperProps) {
  const preset = presetMap[config.theme] ?? Object.values(presetMap)[0];

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
