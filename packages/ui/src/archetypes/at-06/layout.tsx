'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-06 Playful Interactive
 * - Colorful gradient header, pastel section backgrounds
 * - Bottom tab bar navigation on mobile
 * - Large rounded corners, bold playful typography
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

const pastelBgs = [
  'bg-purple-50',
  'bg-pink-50',
  'bg-yellow-50',
  'bg-emerald-50',
  'bg-sky-50',
  'bg-orange-50',
  'bg-rose-50',
  'bg-teal-50',
];

const tabIcons: Record<number, string> = {
  0: '\u2302', // house
  1: '\u2606', // star
  2: '\u2665', // heart
  3: '\u260E', // phone
};

export function AT06Layout({
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
    <div className={cn('min-h-screen bg-purple-50/30 pb-16 md:pb-0', className)}>
      {/* Mock Data Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Colorful Gradient Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
              {siteName.charAt(0)}
            </span>
            {siteName}
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-bold text-white/90 transition-all hover:bg-white/20 hover:text-white hover:scale-105"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="ml-2 rounded-2xl bg-white px-5 py-2 text-sm font-bold text-purple-600 shadow-md transition-transform hover:scale-105"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-white hover:bg-white/20"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-2xl bg-white py-3 text-center text-sm font-bold text-purple-600"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content -- Each direct child gets a different pastel background */}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {React.Children.map(children, (child, index) => (
          <div
            className={cn(
              'rounded-2xl p-6 md:p-8 mb-6',
              pastelBgs[index % pastelBgs.length],
            )}
          >
            {child}
          </div>
        ))}
      </main>

      {/* Footer -- Bright & decorated */}
      <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <span className="text-lg font-extrabold text-purple-600">
                {siteName}
              </span>
              {contact?.address && (
                <p className="mt-3 text-sm text-purple-500/70">{contact.address}</p>
              )}
            </div>
            <div>
              {contact?.hours && (
                <>
                  <h4 className="mb-2 text-sm font-bold text-pink-500">운영 시간</h4>
                  <p className="text-sm text-gray-600">{contact.hours}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-orange-500">연락처</h4>
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="text-sm text-gray-600 hover:text-purple-600"
                >
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && (
                <p className="mt-1 text-sm text-gray-600">카카오톡: {contact.kakao}</p>
              )}
            </div>
          </div>
          <div className="mt-8 border-t border-purple-200/50 pt-6 text-center text-xs text-purple-400">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full border-t border-purple-200 bg-white/95 backdrop-blur-sm py-1.5 md:hidden z-50">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-gray-500 hover:text-purple-600"
            >
              <span className="text-lg leading-none">{tabIcons[i] || '\u25CF'}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg transition-transform hover:scale-110 hover:rotate-3"
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
