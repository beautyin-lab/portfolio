'use client';

import * as React from 'react';
import type { SiteConfig } from '@portfolio/data';
import { HeroSection } from '@portfolio/ui/composites/hero-section';
import { ServiceCards } from '@portfolio/ui/composites/service-cards';
import { TeamSection } from '@portfolio/ui/composites/team-section';
import { GalleryGrid } from '@portfolio/ui/composites/gallery-grid';
import { TestimonialSlider } from '@portfolio/ui/composites/testimonial-slider';
import { FAQSection } from '@portfolio/ui/composites/faq-section';
import { ContactSection } from '@portfolio/ui/composites/contact-section';

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
// Section Title wrapper
// ---------------------------------------------------------------------------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
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

function renderAbout(config: SiteConfig) {
  if (!config.about) return null;

  return (
    <section key="about" className="py-16 sm:py-24" id="about">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl whitespace-pre-line">
          {config.about.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600 whitespace-pre-line">
          {config.about.description}
        </p>
      </div>
      {config.about.highlights && config.about.highlights.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.about.highlights.map((h, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary,#3b82f6)]/10 text-[var(--color-primary,#3b82f6)]">
                <span className="text-lg font-bold">{h.icon.charAt(0)}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900">{h.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">{h.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function renderServices(config: SiteConfig) {
  if (!config.services?.items?.length) return null;

  return (
    <section key="services" className="py-16 sm:py-24" id="services">
      <SectionTitle>{config.services.title}</SectionTitle>
      <ServiceCards
        items={config.services.items.map((item) => ({
          title: item.name,
          description: item.description,
          price: item.price,
        }))}
        columns={config.services.items.length <= 3 ? 3 : config.services.items.length <= 4 ? 4 : 3}
      />
    </section>
  );
}

function renderTeam(config: SiteConfig) {
  if (!config.team?.members?.length) return null;

  return (
    <section key="team" className="py-16 sm:py-24" id="team">
      <SectionTitle>{config.team.title}</SectionTitle>
      <TeamSection
        members={config.team.members.map((m) => ({
          name: m.name,
          role: m.role,
          avatar: m.image,
          description: m.description,
        }))}
        columns={config.team.members.length <= 3 ? 3 : 4}
      />
    </section>
  );
}

function renderGallery(config: SiteConfig) {
  if (!config.gallery?.images?.length) return null;

  const categories = Array.from(
    new Set(config.gallery.images.map((img) => img.category).filter(Boolean) as string[]),
  );

  return (
    <section key="gallery" className="py-16 sm:py-24" id="gallery">
      <SectionTitle>{config.gallery.title}</SectionTitle>
      <GalleryGrid
        images={config.gallery.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          category: img.category,
        }))}
        categories={categories}
        variant="grid"
      />
    </section>
  );
}

function renderTestimonials(config: SiteConfig) {
  if (!config.testimonials?.items?.length) return null;

  return (
    <section key="testimonials" className="py-16 sm:py-24" id="testimonials">
      <SectionTitle>{config.testimonials.title}</SectionTitle>
      <TestimonialSlider
        testimonials={config.testimonials.items.map((t) => ({
          name: t.name,
          content: t.content,
          rating: t.rating,
          role: t.service,
        }))}
      />
    </section>
  );
}

function renderFAQ(config: SiteConfig) {
  if (!config.faq?.items?.length) return null;

  return (
    <section key="faq" className="py-16 sm:py-24" id="faq">
      <SectionTitle>{config.faq.title}</SectionTitle>
      <div className="mx-auto max-w-3xl">
        <FAQSection
          items={config.faq.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      </div>
    </section>
  );
}

function renderContact(config: SiteConfig) {
  if (!config.contact) return null;

  return (
    <section key="contact" className="py-16 sm:py-24" id="contact">
      <SectionTitle>오시는 길</SectionTitle>
      <ContactSection
        contactInfo={{
          phone: config.contact.phone,
          address: config.contact.address,
          hours: config.contact.hours,
          email: config.contact.email,
        }}
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// DemoSiteRenderer
// ---------------------------------------------------------------------------

interface DemoSiteRendererProps {
  config: SiteConfig;
}

export function DemoSiteRenderer({ config }: DemoSiteRendererProps) {
  return (
    <>
      {renderHero(config)}
      {renderAbout(config)}
      {renderServices(config)}
      {renderTeam(config)}
      {renderGallery(config)}
      {renderTestimonials(config)}
      {renderFAQ(config)}
      {renderContact(config)}
    </>
  );
}
