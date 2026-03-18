'use client';

import * as React from 'react';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-09 Data-Driven Dashboard
 * - Search bar in header, category tabs
 * - 2-column: filter sidebar + main content
 * - System UI font, dense information layout
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

export function AT09Layout({
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
  const [activeTab, setActiveTab] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className={cn('min-h-screen bg-gray-100 font-sans', className)}>
      {/* Mock Data Banner */}
      <div className="bg-indigo-700 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header with search bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <a href="#" className="text-base font-bold text-gray-900 flex-shrink-0">
            {siteName}
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden flex-1 max-w-lg md:flex mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                readOnly
              />
            </div>
          </div>

          {/* Desktop Category Tabs */}
          <nav className="hidden items-center gap-1 lg:flex flex-shrink-0">
            {navItems.slice(0, 4).map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  i === 0
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={ctaHref}
            className="hidden lg:inline-flex rounded-md bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 flex-shrink-0"
          >
            {ctaLabel}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 lg:hidden ml-auto"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-3 lg:hidden">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm"
                readOnly
              />
            </div>
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-md bg-indigo-600 py-2 text-center text-sm font-medium text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* 2-Column Layout: Filter Sidebar + Main */}
      <div className="mx-auto flex max-w-7xl">
        {/* Filter Sidebar -- desktop only */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-gray-200 bg-gray-50 p-4 min-h-[calc(100vh-3.5rem)]">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            필터
          </h3>
          <div className="space-y-4">
            {navItems.map((item, i) => (
              <label key={item.href} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={i === 0}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  readOnly
                />
                {item.label}
              </label>
            ))}
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              정렬
            </h3>
            <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
              <option>최신순</option>
              <option>인기순</option>
              <option>가격순</option>
            </select>
          </div>
          {contact?.hours && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                이용 시간
              </h3>
              <p className="text-xs text-gray-500">{contact.hours}</p>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 p-4 lg:p-6">
          {/* Tab nav + View toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1 overflow-x-auto">
              {navItems.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    'whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                    activeTab === i
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1 ml-4">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded p-1.5 transition-colors',
                  viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400 hover:text-gray-600',
                )}
                aria-label="그리드 보기"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <rect x="1" y="1" width="6" height="6" rx="1" />
                  <rect x="9" y="1" width="6" height="6" rx="1" />
                  <rect x="1" y="9" width="6" height="6" rx="1" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded p-1.5 transition-colors',
                  viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400 hover:text-gray-600',
                )}
                aria-label="리스트 보기"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <rect x="1" y="1" width="14" height="3" rx="1" />
                  <rect x="1" y="6" width="14" height="3" rx="1" />
                  <rect x="1" y="11" width="14" height="3" rx="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Children content */}
          <div className="rounded-lg bg-white border border-gray-200 p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Footer -- compact 1-line */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} {siteName}</span>
          <div className="flex items-center gap-4">
            {(phone || contact?.phone) && (
              <a href={`tel:${phone || contact?.phone}`} className="hover:text-indigo-600">
                {phone || contact?.phone}
              </a>
            )}
            <span>포트폴리오 데모 사이트</span>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110"
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
