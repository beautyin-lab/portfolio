'use client';

import type { ReactNode } from 'react';
import type { SiteConfig, LayoutConfig } from '@portfolio/data';
import { cn } from '@portfolio/ui/lib/utils';
import { HeroSection } from '@portfolio/ui/composites/hero-section';
import { ServiceCards } from '@portfolio/ui/composites/service-cards';
import { TeamSection } from '@portfolio/ui/composites/team-section';
import { GalleryGrid } from '@portfolio/ui/composites/gallery-grid';
import { TestimonialSlider } from '@portfolio/ui/composites/testimonial-slider';
import { FAQSection } from '@portfolio/ui/composites/faq-section';
import { ContactSection } from '@portfolio/ui/composites/contact-section';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';
import { StaggerContainer } from '@portfolio/ui/animations/components/stagger-container';

// ---------------------------------------------------------------------------
// Heading font family mapping (mirrors site-layout.tsx)
// ---------------------------------------------------------------------------
const HEADING_FONT_MAP: Record<string, string> = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
  serif: "'Noto Serif KR', serif",
  mono: "'Space Grotesk', monospace",
  display: "'Playfair Display', serif",
};

// ---------------------------------------------------------------------------
// Content width mapping
// ---------------------------------------------------------------------------
const MAX_WIDTH_MAP: Record<string, string> = {
  narrow: 'max-w-3xl',
  standard: 'max-w-7xl',
  wide: 'max-w-[1600px]',
  full: 'max-w-none',
};

// ---------------------------------------------------------------------------
// Section spacing mapping
// ---------------------------------------------------------------------------
const SPACING_MAP: Record<string, string> = {
  tight: 'px-4 py-12 sm:px-6',
  normal: 'px-4 py-16 sm:px-6 md:py-24 lg:px-8',
  dramatic: 'px-4 py-24 sm:px-6 md:py-32 lg:px-8',
};

// ---------------------------------------------------------------------------
// Heading size mapping
// ---------------------------------------------------------------------------
const HEADING_SIZE_MAP: Record<string, string> = {
  normal: 'text-3xl sm:text-4xl',
  large: 'text-4xl sm:text-5xl',
  dramatic: 'text-5xl sm:text-6xl lg:text-7xl',
};

// ---------------------------------------------------------------------------
// Helper: resolve layout config with defaults
// ---------------------------------------------------------------------------
function getLayout(config: SiteConfig): LayoutConfig {
  return config.layoutConfig ?? {
    headerStyle: 'minimal',
    colorMode: 'light',
    headingFont: 'sans',
  };
}

// ---------------------------------------------------------------------------
// Section Wrapper
// ---------------------------------------------------------------------------
function SectionWrapper({
  children,
  className,
  fullBleed = false,
  id,
  layout,
  variant = 'primary',
  sectionIdx = 0,
}: {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
  id?: string;
  layout: LayoutConfig;
  variant?: 'primary' | 'secondary';
  sectionIdx?: number;
}) {
  const colorMode = layout.colorMode ?? 'light';
  const isMixed = colorMode === 'mixed';
  const isDark = colorMode === 'dark' || (isMixed && sectionIdx % 2 === 0);

  let bgClass: string;
  if (isMixed) {
    bgClass = sectionIdx % 2 === 0 ? 'bg-gray-950 text-white' : 'bg-white text-gray-900';
  } else if (isDark) {
    bgClass = variant === 'primary' ? 'bg-gray-950 text-white' : 'bg-gray-900 text-white';
  } else {
    bgClass = variant === 'primary' ? 'bg-white' : 'bg-gray-50';
  }

  const spacing = SPACING_MAP[layout.sectionSpacing ?? 'normal'];
  const maxWidth = MAX_WIDTH_MAP[layout.contentWidth ?? 'standard'];

  if (fullBleed) {
    return (
      <section id={id} className={cn('py-16 md:py-24', bgClass, className)}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} className={cn(spacing, bgClass, className)}>
      <div className={cn('mx-auto', maxWidth)}>{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section Title
// ---------------------------------------------------------------------------
function SectionTitle({
  children,
  layout,
  sectionIdx = 0,
}: {
  children: ReactNode;
  layout: LayoutConfig;
  sectionIdx?: number;
}) {
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);
  const headingFont = HEADING_FONT_MAP[layout.headingFont] ?? HEADING_FONT_MAP.sans;
  const headingSize = HEADING_SIZE_MAP[layout.headingSize ?? 'normal'];
  const headingWeight = layout.headingWeight ?? 'bold';

  const weightClass =
    headingWeight === 'light' ? 'font-light' :
    headingWeight === 'normal' ? 'font-normal' :
    headingWeight === 'black' ? 'font-black' :
    'font-bold';

  return (
    <h2
      className={cn(
        'mb-8 text-center',
        headingSize,
        weightClass,
        isDark ? 'text-white' : 'text-gray-900',
      )}
      style={{ fontFamily: headingFont }}
    >
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// Section Renderers
// ---------------------------------------------------------------------------

function renderHero(config: SiteConfig) {
  const layout = getLayout(config);
  const variant = layout.heroVariant ?? 'fade-slider';
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

function renderAbout(config: SiteConfig, sectionIdx: number) {
  if (!config.about) return null;
  const layout = getLayout(config);
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);
  const headingFont = HEADING_FONT_MAP[layout.headingFont] ?? HEADING_FONT_MAP.sans;

  return (
    <SectionWrapper key="about" id="about" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle layout={layout} sectionIdx={sectionIdx}>
            {config.about.title}
          </SectionTitle>
          <p className={cn(
            'mt-6 text-lg leading-relaxed whitespace-pre-line',
            isDark ? 'text-gray-300' : 'text-gray-600',
          )}>
            {config.about.description}
          </p>
        </div>
      </ScrollReveal>
      {config.about.highlights && config.about.highlights.length > 0 && (
        <StaggerContainer className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.about.highlights.map((h, i) => (
            <div
              key={i}
              className={cn(
                'border p-6 text-center shadow-sm',
                layout.borderRadius === 'none' ? 'rounded-none' :
                layout.borderRadius === 'full' ? 'rounded-2xl' :
                layout.borderRadius === 'large' ? 'rounded-2xl' :
                layout.borderRadius === 'small' ? 'rounded' : 'rounded-xl',
                isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white',
              )}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary,#3b82f6)]/10 text-[var(--color-primary,#3b82f6)]">
                <span className="text-lg font-bold">{h.icon.charAt(0)}</span>
              </div>
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-gray-900')} style={{ fontFamily: headingFont }}>
                {h.title}
              </h3>
              <p className={cn('mt-2 text-xs leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>
                {h.description}
              </p>
            </div>
          ))}
        </StaggerContainer>
      )}
    </SectionWrapper>
  );
}

function renderServices(config: SiteConfig, sectionIdx: number) {
  if (!config.services?.items?.length) return null;
  const layout = getLayout(config);

  return (
    <SectionWrapper key="services" id="services" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>{config.services.title}</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-up">
        <ServiceCards
          items={config.services.items.map((item) => ({
            title: item.name,
            description: item.description,
            price: item.price,
          }))}
          columns={config.services.items.length === 4 ? 4 : 3}
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderTeam(config: SiteConfig, sectionIdx: number) {
  if (!config.team?.members?.length) return null;
  const layout = getLayout(config);

  return (
    <SectionWrapper key="team" id="team" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>{config.team.title}</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-up">
        <TeamSection
          members={config.team.members.map((m) => ({
            name: m.name,
            role: m.role,
            avatar: m.image,
            description: m.description,
          }))}
          columns={config.team.members.length <= 3 ? 3 : 4}
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderGallery(config: SiteConfig, sectionIdx: number) {
  if (!config.gallery?.images?.length) return null;
  const layout = getLayout(config);

  const categories = Array.from(
    new Set(config.gallery.images.map((img) => img.category).filter(Boolean) as string[]),
  );

  return (
    <SectionWrapper key="gallery" id="gallery" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>{config.gallery.title}</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="scale-in">
        <GalleryGrid
          images={config.gallery.images.map((img) => ({
            src: img.src,
            alt: img.alt,
            category: img.category,
          }))}
          categories={categories}
          variant="grid"
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderTestimonials(config: SiteConfig, sectionIdx: number) {
  if (!config.testimonials?.items?.length) return null;
  const layout = getLayout(config);

  return (
    <SectionWrapper key="testimonials" id="testimonials" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>{config.testimonials.title}</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-left">
        <TestimonialSlider
          testimonials={config.testimonials.items.map((t) => ({
            name: t.name,
            content: t.content,
            rating: t.rating,
            role: t.service,
          }))}
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderFAQ(config: SiteConfig, sectionIdx: number) {
  if (!config.faq?.items?.length) return null;
  const layout = getLayout(config);

  return (
    <SectionWrapper key="faq" id="faq" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>{config.faq.title}</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-up">
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={config.faq.items.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderContact(config: SiteConfig, sectionIdx: number) {
  if (!config.contact) return null;
  const layout = getLayout(config);

  return (
    <SectionWrapper key="contact" id="contact" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>오시는 길</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-up">
        <ContactSection
          contactInfo={{
            phone: config.contact.phone,
            address: config.contact.address,
            hours: config.contact.hours,
            email: config.contact.email,
          }}
        />
      </ScrollReveal>
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// Industry-specific section renderers
// ---------------------------------------------------------------------------

function renderReservation(config: SiteConfig, sectionIdx: number) {
  if (!config.features?.reservation?.enabled) return null;
  const layout = getLayout(config);
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);

  return (
    <SectionWrapper key="reservation" id="reservation" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>예약 안내</SectionTitle>
        <div className="mx-auto max-w-2xl text-center">
          <p className={cn('text-lg', isDark ? 'text-gray-300' : 'text-gray-600')}>
            온라인으로 간편하게 예약하세요
          </p>
          <button className="mt-6 rounded-lg bg-[var(--color-primary,#3b82f6)] px-8 py-3 font-semibold text-white transition-shadow hover:shadow-lg">
            예약하기
          </button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderMenuBoard(config: SiteConfig, sectionIdx: number) {
  if (!config.features?.menuBoard?.enabled) return null;
  if (!config.services?.items?.length) return null;
  const layout = getLayout(config);
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);

  return (
    <SectionWrapper key="menuBoard" id="menu-board" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>메뉴</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="fade-up">
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
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderPropertySearch(config: SiteConfig, sectionIdx: number) {
  if (!config.features?.propertySearch?.enabled) return null;
  const layout = getLayout(config);
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);

  return (
    <SectionWrapper key="propertySearch" id="property-search" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>매물 검색</SectionTitle>
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
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderSeatStatus(config: SiteConfig, sectionIdx: number) {
  if (!config.features?.seatStatus?.enabled) return null;
  const layout = getLayout(config);
  const colorMode = layout.colorMode ?? 'light';
  const isDark = colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);
  const totalSeats = config.features.seatStatus.totalSeats ?? 100;

  return (
    <SectionWrapper key="seatStatus" id="seat-status" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>좌석 현황</SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="scale-in">
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
      </ScrollReveal>
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// DemoSiteRenderer
// ---------------------------------------------------------------------------

interface DemoSiteRendererProps {
  config: SiteConfig;
}

const DEFAULT_SECTION_ORDER = [
  'hero', 'about', 'services', 'team', 'gallery', 'testimonials', 'faq', 'contact',
] as const;

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
  const sectionOrder = config.sectionOrder ?? [...DEFAULT_SECTION_ORDER];
  const activeSections = sectionOrder.filter((s) => isSectionAvailable(s, config));

  // Track position index for alternating mixed color mode
  let pos = 0;

  return (
    <>
      {activeSections.map((section) => {
        if (section === 'hero') return renderHero(config);
        const currentPos = pos++;
        switch (section) {
          case 'about':          return renderAbout(config, currentPos);
          case 'services':       return renderServices(config, currentPos);
          case 'team':           return renderTeam(config, currentPos);
          case 'gallery':        return renderGallery(config, currentPos);
          case 'testimonials':   return renderTestimonials(config, currentPos);
          case 'faq':            return renderFAQ(config, currentPos);
          case 'contact':        return renderContact(config, currentPos);
          case 'reservation':    return renderReservation(config, currentPos);
          case 'menuBoard':      return renderMenuBoard(config, currentPos);
          case 'propertySearch': return renderPropertySearch(config, currentPos);
          case 'seatStatus':     return renderSeatStatus(config, currentPos);
          default:               return null;
        }
      })}
    </>
  );
}
