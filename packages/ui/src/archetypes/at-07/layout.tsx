'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-07 Minimal Gallery
 * - 화이트스페이스 극대화, Masonry 그리드
 * - 사이드바 네비게이션 (데스크톱)
 */

interface AT07LayoutProps {
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
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT07LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-gray-800 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-100 px-6 lg:hidden">
        <a href="#" className="text-lg font-light tracking-widest text-gray-900 uppercase">{siteName}</a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {mobileOpen && (
        <div className="border-b border-gray-100 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-gray-100 sticky top-0 h-screen">
          <div className="flex flex-col p-8">
            <a href="#" className="text-lg font-light tracking-widest text-gray-900 uppercase">
              {siteName}
            </a>
            <nav className="mt-12 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 transition-colors hover:text-gray-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <a
                href={ctaHref}
                className="text-sm text-gray-400 transition-colors hover:text-gray-900"
              >
                {ctaLabel}
              </a>
              {(phone || contact?.phone) && (
                <p className="mt-4 text-xs text-gray-300">
                  <a href={`tel:${phone || contact?.phone}`} className="hover:text-gray-600">
                    {phone || contact?.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <main className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-16">{children}</main>

          {/* Footer — minimal inline */}
          <footer className="border-t border-gray-100 px-6 py-12 lg:px-12">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-sm font-light tracking-widest text-gray-900 uppercase">{siteName}</span>
                  {contact?.address && <p className="mt-2 text-xs text-gray-400">{contact.address}</p>}
                </div>
                <div className="text-right">
                  {contact?.hours && <p className="text-xs text-gray-400">{contact.hours}</p>}
                  {(phone || contact?.phone) && (
                    <p className="mt-1 text-xs text-gray-400">{phone || contact?.phone}</p>
                  )}
                </div>
              </div>
              <div className="mt-8 text-center text-xs text-gray-300">
                &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-400 hover:shadow-md"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
