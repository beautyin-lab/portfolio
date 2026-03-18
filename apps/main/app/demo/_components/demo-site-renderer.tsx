'use client';

import type { ReactNode } from 'react';
import type { SiteConfig } from '@portfolio/data';
import { cn } from '@portfolio/ui/lib/utils';
import { HeroSection } from '@portfolio/ui/composites/hero-section';
import { ServiceCards } from '@portfolio/ui/composites/service-cards';
import { TeamSection } from '@portfolio/ui/composites/team-section';
import { GalleryGrid } from '@portfolio/ui/composites/gallery-grid';
import { TestimonialSlider } from '@portfolio/ui/composites/testimonial-slider';
import { FAQSection } from '@portfolio/ui/composites/faq-section';
import { ContactSection } from '@portfolio/ui/composites/contact-section';

// ---------------------------------------------------------------------------
// Archetypes with uniformly dark background -- all sections use dark styling
// ---------------------------------------------------------------------------
const DARK_ARCHETYPES = new Set(['AT-02']);

// ---------------------------------------------------------------------------
// AT-10: alternating dark/light sections (black/white).
// Hero occupies position 0 (dark). Each subsequent rendered section
// alternates. We compute per-section darkness at render time.
// ---------------------------------------------------------------------------
const AT10_ARCHETYPE = 'AT-10';

// ---------------------------------------------------------------------------
// Hero variant mapping per archetype
// ---------------------------------------------------------------------------
const heroVariantMap: Record<string, 'fade-slider' | 'fullscreen' | 'split' | 'minimal' | 'parallax'> = {
  'AT-01': 'split',
  'AT-02': 'fullscreen',
  'AT-03': 'fade-slider',
  'AT-04': 'fullscreen',
  'AT-05': 'fade-slider',
  'AT-06': 'split',
  'AT-07': 'minimal',
  'AT-08': 'parallax',
  'AT-09': 'minimal',
  'AT-10': 'fullscreen',
};

// ---------------------------------------------------------------------------
// Section Wrapper -- handles padding, max-width, and bg colors.
// For dark archetypes: dark bg.
// For AT-10: alternating black/white based on sectionPos (even=dark, odd=light).
// ---------------------------------------------------------------------------
function SectionWrapper({
  children,
  className,
  fullBleed = false,
  id,
  dark = false,
  variant = 'primary',
  at10Pos,
}: {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
  id?: string;
  dark?: boolean;
  variant?: 'primary' | 'secondary';
  at10Pos?: number; // defined only for AT-10 sections; even=dark, odd=light
}) {
  let bgClass: string;
  if (at10Pos !== undefined) {
    // AT-10 alternating: even positions = black, odd = white
    bgClass = at10Pos % 2 === 0 ? 'bg-black text-white' : 'bg-white text-gray-900';
  } else if (dark) {
    bgClass = variant === 'primary' ? 'bg-gray-950 text-white' : 'bg-gray-900 text-white';
  } else {
    bgClass = variant === 'primary' ? 'bg-white' : 'bg-gray-50';
  }

  const paddingClass = at10Pos !== undefined
    ? 'px-6 py-24 md:px-12 md:py-40'
    : 'px-4 py-16 sm:px-6 md:py-24 lg:px-8';

  if (fullBleed) {
    return (
      <section id={id} className={cn('py-16 md:py-24', bgClass, className)}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} className={cn(paddingClass, bgClass, className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section Title wrapper -- adapts text color for dark backgrounds
// ---------------------------------------------------------------------------
function SectionTitle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2 className={cn(
      'mb-8 text-center text-3xl font-bold sm:text-4xl',
      dark ? 'text-white' : 'text-gray-900',
    )}>
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// Section Renderers
// ---------------------------------------------------------------------------

function renderHero(config: SiteConfig) {
  const variant = heroVariantMap[config.archetype] ?? 'fade-slider';
  const slides = config.hero.images.map((img, i) => ({
    image: img,
    title: config.hero.title,
    subtitle: i === 0 ? config.hero.subtitle : undefined,
    ctaLabel: config.hero.cta?.text,
    ctaHref: config.hero.cta?.action,
  }));

  return (
    <HeroSection
      key="hero"
      variant={variant}
      slides={slides}
      title={config.hero.title}
      subtitle={config.hero.subtitle}
      ctaLabel={config.hero.cta?.text}
      ctaHref={config.hero.cta?.action}
      backgroundImage={config.hero.images[0]}
      overlayOpacity={variant === 'fullscreen' ? 0.5 : 0.4}
    />
  );
}

function renderAbout(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.about) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="about" id="about" dark={dark} variant="primary" at10Pos={at10Pos}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className={cn(
          'text-3xl font-bold sm:text-4xl whitespace-pre-line',
          isDark ? 'text-white' : 'text-gray-900',
        )}>
          {config.about.title}
        </h2>
        <p className={cn(
          'mt-6 text-lg leading-relaxed whitespace-pre-line',
          isDark ? 'text-gray-300' : 'text-gray-600',
        )}>
          {config.about.description}
        </p>
      </div>
      {config.about.highlights && config.about.highlights.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.about.highlights.map((h, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl border p-6 text-center shadow-sm',
                isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white',
              )}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary,#3b82f6)]/10 text-[var(--color-primary,#3b82f6)]">
                <span className="text-lg font-bold">{h.icon.charAt(0)}</span>
              </div>
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-gray-900')}>
                {h.title}
              </h3>
              <p className={cn('mt-2 text-xs leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>
                {h.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

function renderServices(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.services?.items?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="services" id="services" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>{config.services.title}</SectionTitle>
      <ServiceCards
        items={config.services.items.map((item) => ({
          title: item.name,
          description: item.description,
          price: item.price,
        }))}
        columns={config.services.items.length === 4 ? 4 : 3}
      />
    </SectionWrapper>
  );
}

function renderTeam(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.team?.members?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="team" id="team" dark={dark} variant="primary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>{config.team.title}</SectionTitle>
      <TeamSection
        members={config.team.members.map((m) => ({
          name: m.name,
          role: m.role,
          avatar: m.image,
          description: m.description,
        }))}
        columns={config.team.members.length <= 3 ? 3 : 4}
      />
    </SectionWrapper>
  );
}

function renderGallery(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.gallery?.images?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  const categories = Array.from(
    new Set(config.gallery.images.map((img) => img.category).filter(Boolean) as string[]),
  );

  return (
    <SectionWrapper key="gallery" id="gallery" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>{config.gallery.title}</SectionTitle>
      <GalleryGrid
        images={config.gallery.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          category: img.category,
        }))}
        categories={categories}
        variant="grid"
      />
    </SectionWrapper>
  );
}

function renderTestimonials(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.testimonials?.items?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="testimonials" id="testimonials" dark={dark} variant="primary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>{config.testimonials.title}</SectionTitle>
      <TestimonialSlider
        testimonials={config.testimonials.items.map((t) => ({
          name: t.name,
          content: t.content,
          rating: t.rating,
          role: t.service,
        }))}
      />
    </SectionWrapper>
  );
}

function renderFAQ(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.faq?.items?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="faq" id="faq" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>{config.faq.title}</SectionTitle>
      <div className="mx-auto max-w-3xl">
        <FAQSection
          items={config.faq.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      </div>
    </SectionWrapper>
  );
}

function renderContact(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.contact) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="contact" id="contact" dark={dark} variant="primary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>오시는 길</SectionTitle>
      <ContactSection
        contactInfo={{
          phone: config.contact.phone,
          address: config.contact.address,
          hours: config.contact.hours,
          email: config.contact.email,
        }}
      />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// Industry-specific section renderers
// ---------------------------------------------------------------------------

function renderReservation(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.features?.reservation?.enabled) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="reservation" id="reservation" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>예약 안내</SectionTitle>
      <div className="mx-auto max-w-2xl text-center">
        <p className={cn('text-lg', isDark ? 'text-gray-300' : 'text-gray-600')}>
          온라인으로 간편하게 예약하세요
        </p>
        <button className="mt-6 rounded-lg bg-[var(--color-primary,#3b82f6)] px-8 py-3 font-semibold text-white transition-shadow hover:shadow-lg">
          예약하기
        </button>
      </div>
    </SectionWrapper>
  );
}

function renderMenuBoard(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.features?.menuBoard?.enabled) return null;
  if (!config.services?.items?.length) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="menuBoard" id="menu-board" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>메뉴</SectionTitle>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-3 sm:grid-cols-2">
          {config.services.items.map((item, ii) => (
            <div
              key={ii}
              className={cn(
                'flex items-center justify-between rounded-lg border p-4',
                isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white',
              )}
            >
              <div>
                <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>
                  {item.name}
                </span>
                {item.description && (
                  <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>
                    {item.description}
                  </p>
                )}
              </div>
              {item.price && (
                <span className={cn('ml-4 shrink-0 font-semibold', isDark ? 'text-gray-300' : 'text-gray-700')}>
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function renderPropertySearch(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.features?.propertySearch?.enabled) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);

  return (
    <SectionWrapper key="propertySearch" id="property-search" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>매물 검색</SectionTitle>
      <div className="mx-auto max-w-3xl text-center">
        <p className={cn('text-lg', isDark ? 'text-gray-300' : 'text-gray-600')}>
          원하시는 조건의 매물을 검색해 보세요
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className={cn(
            'flex-1 rounded-lg border px-4 py-3 text-left text-sm',
            isDark ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-400',
          )}>
            지역, 매물 유형 검색...
          </div>
          <button className="rounded-lg bg-[var(--color-primary,#3b82f6)] px-6 py-3 font-semibold text-white">
            검색
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}

function renderSeatStatus(config: SiteConfig, dark: boolean, at10Pos?: number) {
  if (!config.features?.seatStatus?.enabled) return null;
  const isDark = dark || (at10Pos !== undefined && at10Pos % 2 === 0);
  const totalSeats = config.features.seatStatus.totalSeats ?? 100;

  return (
    <SectionWrapper key="seatStatus" id="seat-status" dark={dark} variant="secondary" at10Pos={at10Pos}>
      <SectionTitle dark={isDark}>좌석 현황</SectionTitle>
      <div className="mx-auto max-w-md text-center">
        <div className={cn(
          'rounded-2xl border p-8',
          isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white shadow-sm',
        )}>
          <p className={cn('text-sm font-medium', isDark ? 'text-gray-400' : 'text-gray-500')}>
            현재 이용 가능 좌석
          </p>
          <p className="mt-2 text-5xl font-bold text-[var(--color-primary,#3b82f6)]">
            {totalSeats}
          </p>
          <p className={cn('mt-1 text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>
            / {totalSeats} 전체 좌석
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// DemoSiteRenderer
// ---------------------------------------------------------------------------

interface DemoSiteRendererProps {
  config: SiteConfig;
}

// ---------------------------------------------------------------------------
// Default section order (fallback when sectionOrder is not specified)
// ---------------------------------------------------------------------------
const DEFAULT_SECTION_ORDER = [
  'hero', 'about', 'services', 'team', 'gallery', 'testimonials', 'faq', 'contact',
] as const;

// ---------------------------------------------------------------------------
// Section availability check
// ---------------------------------------------------------------------------
function isSectionAvailable(section: string, config: SiteConfig): boolean {
  switch (section) {
    case 'hero':         return true;
    case 'about':        return !!config.about;
    case 'services':     return !!(config.services?.items?.length);
    case 'team':         return !!(config.team?.members?.length);
    case 'gallery':      return !!(config.gallery?.images?.length);
    case 'testimonials': return !!(config.testimonials?.items?.length);
    case 'faq':          return !!(config.faq?.items?.length);
    case 'contact':      return !!config.contact;
    case 'reservation':  return !!(config.features?.reservation?.enabled);
    case 'menuBoard':    return !!(config.features?.menuBoard?.enabled);
    case 'propertySearch': return !!(config.features?.propertySearch?.enabled);
    case 'seatStatus':   return !!(config.features?.seatStatus?.enabled);
    default:             return false;
  }
}

export function DemoSiteRenderer({ config }: DemoSiteRendererProps) {
  const dark = DARK_ARCHETYPES.has(config.archetype);
  const isAT10 = config.archetype === AT10_ARCHETYPE;

  const sectionOrder = config.sectionOrder ?? [...DEFAULT_SECTION_ORDER];

  // Filter to only sections that have data
  const activeSections = sectionOrder.filter((s) => isSectionAvailable(s, config));

  // For AT-10: compute section positions for alternating dark/light.
  // Hero = position 0 (dark). Non-hero sections start at position 1.
  let pos = 1;
  const posMap = new Map<number, number>();
  activeSections.forEach((s, idx) => {
    if (s !== 'hero') {
      posMap.set(idx, pos++);
    }
  });
  const at10 = (idx: number) => (isAT10 ? posMap.get(idx) : undefined);

  return (
    <>
      {activeSections.map((section, idx) => {
        switch (section) {
          case 'hero':         return renderHero(config);
          case 'about':        return renderAbout(config, dark, at10(idx));
          case 'services':     return renderServices(config, dark, at10(idx));
          case 'team':         return renderTeam(config, dark, at10(idx));
          case 'gallery':      return renderGallery(config, dark, at10(idx));
          case 'testimonials': return renderTestimonials(config, dark, at10(idx));
          case 'faq':          return renderFAQ(config, dark, at10(idx));
          case 'contact':      return renderContact(config, dark, at10(idx));
          case 'reservation':  return renderReservation(config, dark, at10(idx));
          case 'menuBoard':    return renderMenuBoard(config, dark, at10(idx));
          case 'propertySearch': return renderPropertySearch(config, dark, at10(idx));
          case 'seatStatus':   return renderSeatStatus(config, dark, at10(idx));
          default:             return null;
        }
      })}
    </>
  );
}
