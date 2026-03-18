'use client';

import type { ReactNode } from 'react';
import type { SiteConfig } from '@portfolio/data';
import { AT01Layout } from '@portfolio/ui/archetypes/at-01';
import { AT02Layout } from '@portfolio/ui/archetypes/at-02';
import { AT03Layout } from '@portfolio/ui/archetypes/at-03';
import { AT04Layout } from '@portfolio/ui/archetypes/at-04';
import { AT05Layout } from '@portfolio/ui/archetypes/at-05';
import { AT06Layout } from '@portfolio/ui/archetypes/at-06';
import { AT07Layout } from '@portfolio/ui/archetypes/at-07';
import { AT08Layout } from '@portfolio/ui/archetypes/at-08';
import { AT09Layout } from '@portfolio/ui/archetypes/at-09';
import { AT10Layout } from '@portfolio/ui/archetypes/at-10';

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
// ArchetypeShell
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

  const commonProps = {
    siteName: config.name,
    navItems,
    ctaLabel,
    ctaHref: ctaHref.startsWith('#') ? ctaHref : '#contact',
    phone: config.contact?.phone,
    contact: config.contact,
  };

  switch (config.archetype) {
    case 'AT-01':
      return <AT01Layout {...commonProps}>{children}</AT01Layout>;
    case 'AT-02':
      return <AT02Layout {...commonProps}>{children}</AT02Layout>;
    case 'AT-03':
      return <AT03Layout {...commonProps}>{children}</AT03Layout>;
    case 'AT-04':
      return <AT04Layout {...commonProps}>{children}</AT04Layout>;
    case 'AT-05':
      return <AT05Layout {...commonProps}>{children}</AT05Layout>;
    case 'AT-06':
      return <AT06Layout {...commonProps}>{children}</AT06Layout>;
    case 'AT-07':
      return <AT07Layout {...commonProps}>{children}</AT07Layout>;
    case 'AT-08':
      return <AT08Layout {...commonProps}>{children}</AT08Layout>;
    case 'AT-09':
      return <AT09Layout {...commonProps}>{children}</AT09Layout>;
    case 'AT-10':
      return <AT10Layout {...commonProps}>{children}</AT10Layout>;
    default:
      return <AT03Layout {...commonProps}>{children}</AT03Layout>;
  }
}
