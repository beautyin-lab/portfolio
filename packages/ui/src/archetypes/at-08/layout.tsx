'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-08 Warm Storytelling
 * - Cafe/restaurant warm narrative site
 * - Scroll progress bar, narrow single column
 * - Serif body text, earth tones
 */

interface ArchetypeLayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT08Layout({
  siteName,
  navItems = [],
  ctaLabel = '\uBB38\uC758\uD558\uAE30',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((window.scrollY / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-[hsl(var(--color-background))] font-serif', className)}>
      {/* Mock Data Banner */}
      <div className="bg-[hsl(var(--color-text))/.8] text-[hsl(var(--color-background))] text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header -- warm fixed bar */}
      <header className="sticky top-0 z-50 bg-[hsl(var(--color-surface))]/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          <a href="#" className="text-lg font-medium text-[hsl(var(--color-text))] tracking-wide">
            {siteName}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[hsl(var(--color-muted))] transition-colors hover:text-[hsl(var(--color-text))]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-lg bg-[hsl(var(--color-primary))] px-4 py-2 text-sm text-[hsl(var(--color-background))] transition-colors hover:opacity-90"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[hsl(var(--color-muted))/.2] md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[hsl(var(--color-text))]" /> : <Menu className="h-5 w-5 text-[hsl(var(--color-text))]" />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-0.5 w-full bg-[hsl(var(--color-surface))]">
          <div
            className="h-full bg-[hsl(var(--color-primary))] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[hsl(var(--color-muted))/.3] bg-[hsl(var(--color-surface))] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 text-sm text-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-text))]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[hsl(var(--color-primary))] py-2.5 text-center text-sm text-[hsl(var(--color-background))]"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content -- Narrow single-column narrative */}
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <div className="text-[hsl(var(--color-text))] leading-relaxed">
          {children}
        </div>
      </main>

      {/* Footer -- warm, centered */}
      <footer className="bg-[hsl(var(--color-text))] text-[hsl(var(--color-muted))]">
        <div className="mx-auto max-w-2xl px-6 py-12 text-center">
          <span className="text-lg font-medium text-[hsl(var(--color-background))]">{siteName}</span>
          {contact?.address && (
            <p className="mt-4 text-sm">{contact.address}</p>
          )}
          {contact?.hours && (
            <p className="mt-1 text-sm">{contact.hours}</p>
          )}
          {(phone || contact?.phone) && (
            <a
              href={`tel:${phone || contact?.phone}`}
              className="mt-1 inline-block text-sm hover:text-[hsl(var(--color-background))]"
            >
              {phone || contact?.phone}
            </a>
          )}
          {contact?.kakao && (
            <p className="mt-1 text-sm">카카오톡: {contact.kakao}</p>
          )}
          <div className="mt-8 border-t border-[hsl(var(--color-muted))/.4] pt-6 text-xs text-[hsl(var(--color-muted))]">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-[hsl(var(--color-primary))] text-[hsl(var(--color-background))] shadow-lg transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
