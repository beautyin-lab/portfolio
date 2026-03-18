'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-10 Bold Contrast
 * - Transparent -> dark header on scroll
 * - Hamburger-only menu (even on desktop), fullscreen numbered menu
 * - Dark/light alternating sections, massive typography
 * - Pure black + white, red accent
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

export function AT10Layout({
  siteName,
  navItems = [],
  ctaLabel = '\uBB38\uC758\uD558\uAE30',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-black', className)}>
      {/* Mock Data Banner */}
      <div className="bg-red-600 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header -- transparent to dark on scroll, hamburger only */}
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500',
          scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent',
        )}
        style={{ top: '26px' }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#" className="text-2xl font-black uppercase tracking-tighter text-white md:text-3xl">
            {siteName}
          </a>

          {/* Hamburger button -- shown on ALL screen sizes */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-end gap-1.5 p-2"
            aria-label="메뉴 열기"
          >
            <span className="block h-0.5 w-8 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay -- numbered items */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-black flex flex-col">
          <div className="flex h-20 items-center justify-between px-6 md:px-12">
            <span className="text-2xl font-black uppercase tracking-tighter text-white md:text-3xl">
              {siteName}
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-12 w-12 items-center justify-center"
              aria-label="메뉴 닫기"
            >
              <X className="h-8 w-8 text-white" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-4 px-8 md:gap-6 md:px-16 lg:px-24">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 md:gap-6"
              >
                <span className="text-sm font-light text-red-500 tabular-nums md:text-base">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className="text-4xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-red-500 md:text-6xl lg:text-7xl">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between px-8 pb-10 md:px-16 lg:px-24">
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="border-2 border-white px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              {ctaLabel}
            </a>
            {(phone || contact?.phone) && (
              <a
                href={`tel:${phone || contact?.phone}`}
                className="hidden md:block text-sm text-white/40 hover:text-white"
              >
                {phone || contact?.phone}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Content -- Direct children get alternating black/white sections */}
      <main className="pt-20">
        {React.Children.map(children, (child, index) => (
          <div
            className={cn(
              'py-24 md:py-40 px-6 md:px-12',
              index % 2 === 0
                ? 'bg-black text-white'
                : 'bg-white text-black',
            )}
          >
            <div className="mx-auto max-w-7xl">
              {child}
            </div>
          </div>
        ))}
      </main>

      {/* Footer -- black, large logo, minimal */}
      <footer className="bg-black text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-28">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="block text-4xl font-black uppercase tracking-tighter md:text-6xl">
                {siteName}
              </span>
              {contact?.address && (
                <p className="mt-6 text-sm text-white/30">{contact.address}</p>
              )}
              {contact?.hours && (
                <p className="mt-1 text-sm text-white/30">{contact.hours}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="text-xl font-bold text-white/60 hover:text-white md:text-2xl"
                >
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && (
                <p className="text-sm text-white/30">카카오톡: {contact.kakao}</p>
              )}
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-6 text-xs text-white/20">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA -- white square on black */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center bg-white text-black shadow-lg transition-transform hover:scale-110"
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
