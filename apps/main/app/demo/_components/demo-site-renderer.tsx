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
// DemoSiteRenderer
// ---------------------------------------------------------------------------

interface DemoSiteRendererProps {
  config: SiteConfig;
}

export function DemoSiteRenderer({ config }: DemoSiteRendererProps) {
  const dark = DARK_ARCHETYPES.has(config.archetype);
  const isAT10 = config.archetype === AT10_ARCHETYPE;

  // For AT-10: compute section positions for alternating dark/light.
  // Hero = position 0 (dark). Each rendered section gets next position.
  let pos = 1;
  const at10 = (n: number) => (isAT10 ? n : undefined);

  const hasAbout        = !!config.about;
  const hasServices     = !!(config.services?.items?.length);
  const hasTeam         = !!(config.team?.members?.length);
  const hasGallery      = !!(config.gallery?.images?.length);
  const hasTestimonials = !!(config.testimonials?.items?.length);
  const hasFAQ          = !!(config.faq?.items?.length);
  const hasContact      = !!config.contact;

  const aboutPos        = hasAbout        ? pos++ : -1;
  const servicesPos     = hasServices     ? pos++ : -1;
  const teamPos         = hasTeam         ? pos++ : -1;
  const galleryPos      = hasGallery      ? pos++ : -1;
  const testimonialsPos = hasTestimonials ? pos++ : -1;
  const faqPos          = hasFAQ          ? pos++ : -1;
  const contactPos      = hasContact      ? pos++ : -1;

  return (
    <>
      {renderHero(config)}
      {hasAbout        && renderAbout(config, dark, at10(aboutPos))}
      {hasServices     && renderServices(config, dark, at10(servicesPos))}
      {hasTeam         && renderTeam(config, dark, at10(teamPos))}
      {hasGallery      && renderGallery(config, dark, at10(galleryPos))}
      {hasTestimonials && renderTestimonials(config, dark, at10(testimonialsPos))}
      {hasFAQ          && renderFAQ(config, dark, at10(faqPos))}
      {hasContact      && renderContact(config, dark, at10(contactPos))}
    </>
  );
}
