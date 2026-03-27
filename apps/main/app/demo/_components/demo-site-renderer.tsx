'use client';

import type { ReactNode } from 'react';
import type { SiteConfig, LayoutConfig } from '@portfolio/data';
import { cn } from '@portfolio/ui/lib/utils';
import { HeroSection } from '@portfolio/ui/composites/hero-section';
import { GalleryGrid } from '@portfolio/ui/composites/gallery-grid';
import { TestimonialSlider } from '@portfolio/ui/composites/testimonial-slider';
import { FAQSection } from '@portfolio/ui/composites/faq-section';
import { ContactSection } from '@portfolio/ui/composites/contact-section';
// ScrollReveal/StaggerContainer cause webpack module resolution errors in dev
// Using simple div wrappers until resolved
function ScrollReveal({ children, preset, className, ...props }: { children: ReactNode; preset?: string; className?: string; [key: string]: unknown }) {
  return <div className={className}>{children}</div>;
}
function StaggerContainer({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: unknown }) {
  return <div className={className}>{children}</div>;
}

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
  tight: 'px-4 py-10 sm:px-6',
  normal: 'px-4 py-12 sm:px-6 md:py-20 lg:px-8',
  dramatic: 'px-4 py-20 sm:px-6 md:py-28 lg:px-8',
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
// Helper: resolve border radius class
// ---------------------------------------------------------------------------
function getBorderRadiusClass(layout: LayoutConfig): string {
  switch (layout.borderRadius) {
    case 'none': return 'rounded-none';
    case 'small': return 'rounded';
    case 'full': return 'rounded-2xl';
    case 'large': return 'rounded-2xl';
    default: return 'rounded-xl';
  }
}

// ---------------------------------------------------------------------------
// Helper: check dark mode for a section
// ---------------------------------------------------------------------------
function isSectionDark(layout: LayoutConfig, sectionIdx: number): boolean {
  const colorMode = layout.colorMode ?? 'light';
  return colorMode === 'dark' || (colorMode === 'mixed' && sectionIdx % 2 === 0);
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
  const isDark = isSectionDark(layout, sectionIdx);

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
      <section id={id} className={cn('py-12 md:py-20', bgClass, className)}>
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
  subtitle,
  layout,
  sectionIdx = 0,
}: {
  children: ReactNode;
  subtitle?: string;
  layout: LayoutConfig;
  sectionIdx?: number;
}) {
  const isDark = isSectionDark(layout, sectionIdx);
  const headingFont = HEADING_FONT_MAP[layout.headingFont] ?? HEADING_FONT_MAP.sans;
  const headingSize = HEADING_SIZE_MAP[layout.headingSize ?? 'normal'];
  const headingWeight = layout.headingWeight ?? 'bold';

  const weightClass =
    headingWeight === 'light' ? 'font-light' :
    headingWeight === 'normal' ? 'font-normal' :
    headingWeight === 'black' ? 'font-black' :
    'font-bold';

  return (
    <div className="mb-10 text-center">
      <h2
        className={cn(
          headingSize,
          weightClass,
          isDark ? 'text-white' : 'text-gray-900',
        )}
        style={{ fontFamily: headingFont }}
      >
        {children}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-3 text-base sm:text-lg',
          isDark ? 'text-gray-400' : 'text-gray-500',
        )}>
          {subtitle}
        </p>
      )}
    </div>
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
  const isDark = isSectionDark(layout, sectionIdx);
  const headingFont = HEADING_FONT_MAP[layout.headingFont] ?? HEADING_FONT_MAP.sans;
  const radiusClass = getBorderRadiusClass(layout);
  const hasHighlights = config.about.highlights && config.about.highlights.length > 0;

  return (
    <SectionWrapper key="about" id="about" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        {hasHighlights ? (
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left: title + description */}
            <div>
              <h2
                className={cn(
                  'text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight',
                  isDark ? 'text-white' : 'text-gray-900',
                )}
                style={{ fontFamily: headingFont }}
              >
                {config.about.title}
              </h2>
              <p className={cn(
                'mt-6 text-base leading-relaxed whitespace-pre-line sm:text-lg',
                isDark ? 'text-gray-300' : 'text-gray-600',
              )}>
                {config.about.description}
              </p>
            </div>

            {/* Right: highlight cards as number + label */}
            <div className="grid grid-cols-2 gap-4">
              {config.about.highlights!.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    'border p-6',
                    radiusClass,
                    isDark
                      ? 'border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]'
                      : 'border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-sm',
                  )}
                >
                  <div className="text-2xl font-black text-[var(--color-primary,#3b82f6)] sm:text-3xl">
                    {h.icon}
                  </div>
                  <h3
                    className={cn('mt-2 text-sm font-bold sm:text-base', isDark ? 'text-white' : 'text-gray-900')}
                    style={{ fontFamily: headingFont }}
                  >
                    {h.title}
                  </h3>
                  <p className={cn('mt-1 text-xs leading-relaxed sm:text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl text-center">
            <SectionTitle layout={layout} sectionIdx={sectionIdx}>
              {config.about.title}
            </SectionTitle>
            <p className={cn(
              'mt-6 text-base leading-relaxed whitespace-pre-line sm:text-lg',
              isDark ? 'text-gray-300' : 'text-gray-600',
            )}>
              {config.about.description}
            </p>
          </div>
        )}
      </ScrollReveal>
    </SectionWrapper>
  );
}

function renderServices(config: SiteConfig, sectionIdx: number) {
  if (!config.services?.items?.length) return null;
  const layout = getLayout(config);
  const isDark = isSectionDark(layout, sectionIdx);
  const radiusClass = getBorderRadiusClass(layout);

  return (
    <SectionWrapper key="services" id="services" layout={layout} variant="secondary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx} subtitle="제공하는 서비스를 확인하세요">
          {config.services.title}
        </SectionTitle>
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {config.services.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'group overflow-hidden border transition-shadow duration-300 hover:shadow-xl',
              radiusClass,
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white',
            )}
          >
            {/* Image area */}
            {item.image ? (
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-[var(--color-primary,#3b82f6)]/10 to-[var(--color-primary,#3b82f6)]/5">
                <div className="text-5xl font-black text-[var(--color-primary,#3b82f6)]/30">
                  {item.name.charAt(0)}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              <h3 className={cn(
                'text-lg font-bold',
                isDark ? 'text-white' : 'text-gray-900',
              )}>
                {item.name}
              </h3>
              <p className={cn(
                'mt-2 text-sm leading-relaxed line-clamp-2',
                isDark ? 'text-gray-400' : 'text-gray-500',
              )}>
                {item.description}
              </p>
              {item.price && (
                <span className="mt-3 inline-block rounded-full bg-[var(--color-primary,#3b82f6)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-primary,#3b82f6)]">
                  {item.price}
                </span>
              )}
            </div>
          </div>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}

function renderTeam(config: SiteConfig, sectionIdx: number) {
  if (!config.team?.members?.length) return null;
  const layout = getLayout(config);
  const isDark = isSectionDark(layout, sectionIdx);
  const radiusClass = getBorderRadiusClass(layout);

  return (
    <SectionWrapper key="team" id="team" layout={layout} variant="primary" sectionIdx={sectionIdx}>
      <ScrollReveal preset="fade-up">
        <SectionTitle layout={layout} sectionIdx={sectionIdx} subtitle="함께하는 전문가를 소개합니다">
          {config.team.title}
        </SectionTitle>
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {config.team.members.map((m, i) => (
          <div
            key={i}
            className={cn(
              'group overflow-hidden border transition-shadow duration-300 hover:shadow-xl',
              radiusClass,
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white',
            )}
          >
            {/* Avatar image - large square */}
            <div className="aspect-square overflow-hidden">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className={cn(
                  'flex h-full w-full items-center justify-center text-5xl font-bold',
                  isDark ? 'bg-white/10 text-white/40' : 'bg-gray-100 text-gray-300',
                )}>
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 text-center">
              <h3 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
                {m.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[var(--color-primary,#3b82f6)]">
                {m.role}
              </p>
              {m.description && (
                <p className={cn(
                  'mt-2 text-sm leading-relaxed line-clamp-2',
                  isDark ? 'text-gray-400' : 'text-gray-500',
                )}>
                  {m.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </StaggerContainer>
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
        <SectionTitle layout={layout} sectionIdx={sectionIdx}>
          {config.gallery.title}
        </SectionTitle>
      </ScrollReveal>
      <ScrollReveal preset="scale-in">
        <GalleryGrid
          images={config.gallery.images.map((img) => ({
            src: img.src,
            alt: img.alt,
            category: img.category,
          }))}
          categories={categories}
          variant="masonry"
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
        <SectionTitle layout={layout} sectionIdx={sectionIdx} subtitle="고객님들의 소중한 후기">
          {config.testimonials.title}
        </SectionTitle>
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
        <SectionTitle layout={layout} sectionIdx={sectionIdx} subtitle="자주 묻는 질문을 확인하세요">
          {config.faq.title}
        </SectionTitle>
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
        <SectionTitle layout={layout} sectionIdx={sectionIdx} subtitle="편하게 연락주세요">
          오시는 길
        </SectionTitle>
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
  const isDark = isSectionDark(layout, sectionIdx);

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
  const isDark = isSectionDark(layout, sectionIdx);

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
  const isDark = isSectionDark(layout, sectionIdx);

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
  const isDark = isSectionDark(layout, sectionIdx);
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
