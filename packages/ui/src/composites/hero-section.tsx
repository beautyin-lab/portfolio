'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Button } from '../primitives/button';

export interface HeroSlide {
  image?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface HeroSectionProps {
  variant?: 'fade-slider' | 'video-bg' | 'parallax' | 'split' | 'fullscreen' | 'minimal';
  slides?: HeroSlide[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlayOpacity?: number;
  minHeight?: string;
  className?: string;
}

export function HeroSection({
  variant = 'minimal',
  slides = [],
  title = '헤드라인을 입력하세요',
  subtitle,
  ctaLabel = '자세히 보기',
  ctaHref = '#',
  onCtaClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 0.5,
  minHeight = '100vh',
  className,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-slide for fade-slider
  React.useEffect(() => {
    if (variant !== 'fade-slider' || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [variant, slides.length]);

  const activeSlide = slides[currentSlide];
  const displayTitle = activeSlide?.title ?? title;
  const displaySubtitle = activeSlide?.subtitle ?? subtitle;
  const displayCtaLabel = activeSlide?.ctaLabel ?? ctaLabel;
  const displayCtaHref = activeSlide?.ctaHref ?? ctaHref;
  const displayBg = activeSlide?.image ?? backgroundImage;

  if (variant === 'split') {
    return (
      <section
        className={cn(
          'relative flex min-h-[80vh] w-full items-center overflow-hidden bg-white',
          className,
        )}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div
            className={cn(
              'flex flex-col gap-6 transition-all duration-700',
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
            )}
          >
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {displayTitle}
            </h1>
            {displaySubtitle && (
              <p className="text-lg text-gray-600">{displaySubtitle}</p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={onCtaClick} asChild={!onCtaClick}>
                {onCtaClick ? displayCtaLabel : <a href={displayCtaHref}>{displayCtaLabel}</a>}
              </Button>
              {secondaryCtaLabel && (
                <Button variant="outline" size="lg" asChild>
                  <a href={secondaryCtaHref ?? '#'}>{secondaryCtaLabel}</a>
                </Button>
              )}
            </div>
          </div>
          <div
            className={cn(
              'relative h-80 overflow-hidden rounded-2xl bg-gray-100 lg:h-[500px] transition-all duration-700 delay-200',
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0',
            )}
          >
            {displayBg && (
              <img
                src={displayBg}
                alt={displayTitle}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'minimal') {
    return (
      <section
        className={cn(
          'flex w-full items-center justify-center bg-gray-50 py-24 sm:py-32',
          className,
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-4xl px-4 text-center transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          )}
        >
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">{displaySubtitle}</p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" onClick={onCtaClick} asChild={!onCtaClick}>
              {onCtaClick ? displayCtaLabel : <a href={displayCtaHref}>{displayCtaLabel}</a>}
            </Button>
            {secondaryCtaLabel && (
              <Button variant="outline" size="lg" asChild>
                <a href={secondaryCtaHref ?? '#'}>{secondaryCtaLabel}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Full-screen variants: fade-slider, video-bg, parallax, fullscreen
  return (
    <section
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden',
        className,
      )}
      style={{ minHeight }}
    >
      {/* Background */}
      {backgroundVideo && variant === 'video-bg' ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundVideo} />
        </video>
      ) : displayBg ? (
        <img
          src={displayBg}
          alt=""
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
            variant === 'parallax' && 'scale-110',
          )}
          style={variant === 'parallax' ? { willChange: 'transform' } : undefined}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 mx-auto max-w-4xl px-4 text-center text-white transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        )}
      >
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          {displayTitle}
        </h1>
        {displaySubtitle && (
          <p className="mt-6 text-lg text-white/80 sm:text-xl lg:text-2xl">
            {displaySubtitle}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={onCtaClick} asChild={!onCtaClick}>
            {onCtaClick ? displayCtaLabel : <a href={displayCtaHref}>{displayCtaLabel}</a>}
          </Button>
          {secondaryCtaLabel && (
            <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10" asChild>
              <a href={secondaryCtaHref ?? '#'}>{secondaryCtaLabel}</a>
            </Button>
          )}
        </div>
      </div>

      {/* Slide Dots (fade-slider only) */}
      {variant === 'fade-slider' && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50',
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
