'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-02 Immersive Showcase
 * - Transparent overlay header (center logo, split nav), scrolls to bg-black/80 backdrop-blur
 * - Full-bleed dark sections, min-h-screen, no spacing between sections
 * - Dot navigation on the right side
 * - Very large thin headings, wide letter-spacing
 * - Black/dark background, white text, gold/rose-gold accents
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

export function AT02Layout({
  siteName,
  navItems = [],
  ctaLabel = '예약하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);
  const [activeDot, setActiveDot] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // Simple dot navigation: determine which "screen" we're on
      const screenIdx = Math.round(window.scrollY / window.innerHeight);
      setActiveDot(Math.min(screenIdx, (navItems.length || 5) - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems.length]);

  const leftNav = navItems.slice(0, Math.floor(navItems.length / 2));
  const rightNav = navItems.slice(Math.floor(navItems.length / 2));

  return (
    <div className={cn('min-h-screen bg-gray-950 text-white', className)}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className="relative z-[60] bg-amber-500/90 px-4 py-1.5 text-center text-xs font-medium text-black">
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header -- Transparent overlay, center logo, split nav */}
      <header
        className={cn(
          'fixed left-0 top-0 z-50 w-full transition-all duration-700',
          bannerVisible ? 'mt-[30px]' : 'mt-0',
          scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Left nav items */}
          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {leftNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-light uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Center logo */}
          <a
            href="#"
            className="flex-shrink-0 text-center text-xl font-light uppercase tracking-[0.3em] text-white"
          >
            {siteName}
          </a>

          {/* Right nav items */}
          <nav className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            {rightNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-light uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-light uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-amber-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="mt-6 border border-amber-400/40 px-8 py-3 text-xs font-light uppercase tracking-[0.2em] text-amber-300 transition-all hover:bg-amber-400 hover:text-black"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      )}

      {/* Dot Navigation -- Fixed right side */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {navItems.slice(0, 5).map((item, idx) => (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-5 whitespace-nowrap rounded bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                activeDot === idx
                  ? 'h-3 w-3 bg-amber-400'
                  : 'h-2 w-2 bg-white/30 group-hover:bg-white/60',
              )}
            />
          </a>
        ))}
      </div>

      {/* Main Content -- Full bleed, no spacing between sections */}
      <main className="space-y-0">{children}</main>

      {/* Footer -- Dark minimal, social only feel */}
      <footer className="border-t border-white/5 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between">
          <span className="text-xs font-light uppercase tracking-[0.3em] text-white/40">
            {siteName}
          </span>

          {/* Social-style icons placeholder */}
          <div className="flex items-center gap-6">
            {(phone || contact?.phone) && (
              <a
                href={`tel:${phone || contact?.phone}`}
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                {phone || contact?.phone}
              </a>
            )}
            {contact?.kakao && (
              <span className="text-xs text-white/30">{contact.kakao}</span>
            )}
          </div>

          <span className="text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} {siteName}
          </span>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 lg:bottom-6 lg:right-16">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-gray-950 shadow-lg shadow-amber-400/20 transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
