'use client';

import type { ReactNode } from 'react';
import type { SiteConfig, LayoutConfig } from '@portfolio/data';
import { SiteLayout } from './site-layout';

// ---------------------------------------------------------------------------
// Default layout config fallback (used when layoutConfig is not in JSON)
// ---------------------------------------------------------------------------
const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  headerStyle: 'minimal',
  colorMode: 'light',
  headingFont: 'sans',
};

// ---------------------------------------------------------------------------
// Build nav items from SiteConfig
// ---------------------------------------------------------------------------
function buildNavItems(config: SiteConfig) {
  const items: Array<{ label: string; href: string }> = [];

  items.push({ label: '소개', href: '#about' });

  if (config.services?.items?.length) {
    items.push({ label: config.services.title || '서비스', href: '#services' });
  }
  if (config.team?.members?.length) {
    items.push({ label: '팀 소개', href: '#team' });
  }
  if (config.gallery?.images?.length) {
    items.push({ label: '갤러리', href: '#gallery' });
  }
  if (config.testimonials?.items?.length) {
    items.push({ label: '후기', href: '#testimonials' });
  }
  if (config.faq?.items?.length) {
    items.push({ label: 'FAQ', href: '#faq' });
  }

  items.push({ label: '오시는 길', href: '#contact' });

  return items;
}

// ---------------------------------------------------------------------------
// ArchetypeShell — now delegates to SiteLayout with per-site layoutConfig
// ---------------------------------------------------------------------------

interface ArchetypeShellProps {
  config: SiteConfig;
  children: ReactNode;
}

export function ArchetypeShell({ config, children }: ArchetypeShellProps) {
  const navItems = buildNavItems(config);
  const ctaLabel = config.hero.cta?.text || '문의하기';
  const ctaHref = config.hero.cta?.action?.startsWith('/')
    ? `/demo/${config.category}/${config.slug}${config.hero.cta.action}`
    : config.hero.cta?.action || '#contact';

  const layoutConfig = config.layoutConfig ?? DEFAULT_LAYOUT_CONFIG;

  return (
    <SiteLayout
      siteName={config.name}
      layoutConfig={layoutConfig}
      navItems={navItems}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref.startsWith('#') ? ctaHref : '#contact'}
      phone={config.contact?.phone}
      contact={config.contact}
    >
      {children}
    </SiteLayout>
  );
}
