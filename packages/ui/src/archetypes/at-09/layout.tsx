'use client';

import * as React from 'react';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-09 Data-Driven Dashboard
 * - 카드 대시보드, 필터/정렬 UI
 * - 검색 바 + 카테고리 탭 + 사이드 필터
 */

interface AT09LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT09Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT09LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={cn('min-h-screen bg-gray-100', className)}>
      {/* Mock Data Banner */}
      <div className="bg-indigo-600 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header with search bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
          <a href="#" className="text-lg font-bold text-gray-900 flex-shrink-0">{siteName}</a>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-md md:flex mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                readOnly
              />
            </div>
          </div>

          <nav className="hidden items-center gap-4 lg:flex flex-shrink-0">
            {navItems.slice(0, 4).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="hidden border-t border-gray-100 md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 py-1">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  i === 0
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white px-6 py-4 lg:hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm"
                readOnly
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-medium text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <span className="text-lg font-bold text-white">{siteName}</span>
              {contact?.address && <p className="mt-3 text-sm">{contact.address}</p>}
            </div>
            <div>
              {contact?.hours && (
                <>
                  <h4 className="mb-2 text-sm font-semibold text-indigo-400">이용 시간</h4>
                  <p className="text-sm">{contact.hours}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-indigo-400">연락처</h4>
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-sm hover:text-white">
                  {phone || contact?.phone}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110"
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
