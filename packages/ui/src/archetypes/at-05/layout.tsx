'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-05 Soft & Organic
 * - 둥근 모서리, 유기적 형태, 파스텔 톤
 * - 센터 로고 + 양쪽 분할 메뉴
 */

interface AT05LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT05Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT05LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const leftNav = navItems.slice(0, Math.ceil(navItems.length / 2));
  const rightNav = navItems.slice(Math.ceil(navItems.length / 2));

  return (
    <div className={cn('min-h-screen bg-[#faf8f5]', className)}>
      {/* Mock Data Banner */}
      <div className="bg-[#e8d5c4] text-[#5a4a3a] text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header — 센터 로고 + 양쪽 분할 메뉴 */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e8ddd0]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          {/* Left Nav */}
          <nav className="hidden items-center gap-6 lg:flex flex-1">
            {leftNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#7a6b5a] transition-colors hover:text-[#4a3d30]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Center Logo */}
          <a href="#" className="text-xl font-medium text-[#4a3d30] tracking-wide text-center flex-shrink-0 px-4">
            {siteName}
          </a>

          {/* Right Nav */}
          <nav className="hidden items-center justify-end gap-6 lg:flex flex-1">
            {rightNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#7a6b5a] transition-colors hover:text-[#4a3d30]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-full bg-[#c4a882] px-5 py-2 text-sm text-white transition-colors hover:bg-[#b09570]"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#e8ddd0] lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#4a3d30]" /> : <Menu className="h-5 w-5 text-[#4a3d30]" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#e8ddd0] bg-[#faf8f5] px-6 py-4 lg:hidden">
            <nav className="flex flex-col items-center gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-[#7a6b5a] hover:text-[#4a3d30]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-[#c4a882] px-6 py-2.5 text-sm text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6">{children}</main>

      {/* Footer — Soft organic */}
      <footer className="mt-20 bg-[#f0e8dd]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-medium text-[#4a3d30]">{siteName}</span>
            {contact?.address && <p className="mt-3 text-sm text-[#8a7b6a]">{contact.address}</p>}
            {contact?.hours && <p className="mt-1 text-sm text-[#8a7b6a]">{contact.hours}</p>}
            {(phone || contact?.phone) && (
              <a href={`tel:${phone || contact?.phone}`} className="mt-1 text-sm text-[#8a7b6a] hover:text-[#4a3d30]">
                {phone || contact?.phone}
              </a>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-[#8a7b6a] hover:text-[#4a3d30]">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-[#d9ccbb] pt-6 text-center text-xs text-[#a89b8a]">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c4a882] text-white shadow-lg transition-transform hover:scale-110"
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
