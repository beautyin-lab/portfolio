'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-01 Editorial Magazine
 * - Thin top bar header with fullscreen overlay menu (black bg, large serif text)
 * - Asymmetric 2-column grid, very wide spacing
 * - Serif italic headings, off-white background, gold accents
 * - Minimal footer: logo + copyright only
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

export function AT01Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);

  return (
    <div className={cn('min-h-screen bg-[#faf7f2] text-gray-900', className)}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className="relative z-[60] bg-gray-900 px-4 py-1.5 text-center text-xs text-white">
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header -- Thin editorial bar */}
      <header className="border-b border-gray-900/10">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-8 md:px-16">
          <a
            href="#"
            className="font-serif text-lg italic tracking-tight text-gray-900"
          >
            {siteName}
          </a>

          {/* Desktop: only 3-4 links, minimal */}
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.slice(0, 4).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu -- Black bg, large serif white text */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col bg-gray-950">
          {/* Overlay header */}
          <div className="flex h-14 items-center justify-between px-8 md:px-16">
            <span className="font-serif text-lg italic text-white">{siteName}</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center"
              aria-label="메뉴 닫기"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Menu list */}
          <nav className="flex flex-1 flex-col items-start justify-center gap-6 px-8 md:gap-8 md:px-16 lg:px-32">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4"
              >
                <span className="text-sm tabular-nums text-white/30">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-4xl font-light italic text-white transition-colors group-hover:text-amber-400 md:text-5xl lg:text-6xl">
                  {item.label}
                </span>
              </a>
            ))}
            <div className="mt-8 border-t border-white/10 pt-8">
              <a
                href={ctaHref}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400 transition-colors hover:text-amber-300"
              >
                {ctaLabel}
              </a>
            </div>
          </nav>

          {/* Overlay footer info */}
          {(contact?.phone || phone) && (
            <div className="px-8 pb-10 md:px-16">
              <a
                href={`tel:${phone || contact?.phone}`}
                className="text-sm text-white/40 hover:text-white/70"
              >
                {phone || contact?.phone}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Main Content -- Editorial asymmetric spacing, wide margins */}
      <main className="mx-auto max-w-5xl px-8 py-32 md:px-16 md:py-48">
        {children}
      </main>

      {/* Footer -- Minimal: thin line + logo + copyright */}
      <footer className="border-t border-gray-900/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-8 md:px-16">
          <span className="font-serif text-sm italic text-gray-400">{siteName}</span>
          <span className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-900 bg-[#faf7f2] text-gray-900 shadow-md transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
