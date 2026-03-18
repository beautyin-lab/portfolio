'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-07 Minimal Gallery
 * - No header. Fixed left sidebar on desktop.
 * - Extreme whitespace, thin/light typography
 * - Pure white + gray tones only, no accent colors
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

export function AT07Layout({
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

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-gray-800 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Mobile Header -- shown only on mobile */}
      <header className="flex h-14 items-center justify-between border-b border-gray-100 px-6 lg:hidden">
        <a href="#" className="text-sm font-light tracking-[0.25em] text-gray-900 uppercase">
          {siteName}
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center"
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-4 w-4 text-gray-600" /> : <Menu className="h-4 w-4 text-gray-600" />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="border-b border-gray-100 bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-xs font-light tracking-widest text-gray-400 uppercase hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-xs font-light tracking-widest text-gray-400 uppercase hover:text-gray-900"
            >
              {ctaLabel}
            </a>
          </nav>
          {(phone || contact?.phone) && (
            <p className="mt-6 text-xs text-gray-300">
              <a href={`tel:${phone || contact?.phone}`} className="hover:text-gray-500">
                {phone || contact?.phone}
              </a>
            </p>
          )}
        </div>
      )}

      <div className="flex">
        {/* Desktop Fixed Left Sidebar */}
        {/* top-[26px] accounts for the banner bar above */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-shrink-0 lg:flex-col fixed left-0 top-[26px] h-[calc(100vh-26px)] border-r border-gray-100 bg-white z-40">
          <div className="flex flex-1 flex-col justify-between p-10">
            {/* Top -- Logo */}
            <div>
              <a href="#" className="text-sm font-light tracking-[0.25em] text-gray-900 uppercase">
                {siteName}
              </a>
            </div>

            {/* Middle -- Vertical nav */}
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-light tracking-widest text-gray-300 uppercase transition-colors hover:text-gray-900"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                className="text-xs font-light tracking-widest text-gray-300 uppercase transition-colors hover:text-gray-900"
              >
                {ctaLabel}
              </a>
            </nav>

            {/* Bottom -- Contact info */}
            <div className="space-y-2">
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="block text-[11px] text-gray-300 hover:text-gray-600"
                >
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.address && (
                <p className="text-[11px] text-gray-300 leading-relaxed">{contact.address}</p>
              )}
              <p className="text-[10px] text-gray-200">
                &copy; {new Date().getFullYear()} {siteName}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area -- offset by sidebar on desktop */}
        <div className="flex-1 min-w-0 lg:ml-64">
          <main className="mx-auto max-w-5xl px-8 py-16 lg:px-12 lg:py-24">
            {children}
          </main>

          {/* Mobile-only Footer */}
          <footer className="border-t border-gray-100 px-8 py-10 lg:hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-xs font-light tracking-[0.25em] text-gray-400 uppercase">
                {siteName}
              </span>
              {contact?.address && (
                <p className="text-[11px] text-gray-300">{contact.address}</p>
              )}
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-[11px] text-gray-300 hover:text-gray-600">
                  {phone || contact?.phone}
                </a>
              )}
              <p className="mt-4 text-[10px] text-gray-200">
                &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-gray-400 hover:text-gray-700 hover:shadow-md"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
