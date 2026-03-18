'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Button } from '../primitives/button';

export interface CTABannerProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: 'light' | 'dark';
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  ctaLabel = '지금 시작하기',
  ctaHref = '#',
  onCtaClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  backgroundImage,
  backgroundColor,
  textColor = 'light',
  className,
}: CTABannerProps) {
  const isLight = textColor === 'light';

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        !backgroundColor && !backgroundImage && 'bg-blue-600',
        className,
      )}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2
          className={cn(
            'text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl',
            isLight ? 'text-white' : 'text-gray-900',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-lg',
              isLight ? 'text-white/80' : 'text-gray-600',
            )}
          >
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant={isLight ? 'secondary' : 'primary'}
            className={cn(isLight && 'bg-white text-blue-600 hover:bg-gray-50')}
            onClick={onCtaClick}
            asChild={!onCtaClick}
          >
            {onCtaClick ? ctaLabel : <a href={ctaHref}>{ctaLabel}</a>}
          </Button>
          {secondaryCtaLabel && (
            <Button
              size="lg"
              variant="outline"
              className={cn(
                isLight && 'border-white/50 text-white hover:bg-white/10',
              )}
              asChild
            >
              <a href={secondaryCtaHref ?? '#'}>{secondaryCtaLabel}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
