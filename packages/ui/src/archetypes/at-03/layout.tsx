'use client';

import * as React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-03 Professional Trust
 * - 12컬럼 정돈된 그리드, 드롭다운 메뉴 + 브레드크럼
 * - 텍스트 중심, 구조화된 정보 계층
 */

interface AT03LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT03Layout({
  siteName,
  navItems = [],
  ctaLabel = '상담 예약',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT03LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Mock Data Banner */}
      <div className="bg-blue-900 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Top Bar */}
      <div className="hidden border-b border-gray-200 bg-white md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-end gap-6 px-6 text-xs text-gray-500">
          {(phone || contact?.phone) && (
            <a href={`tel:${phone || contact?.phone}`} className="hover:text-gray-800">
              {phone || contact?.phone}
            </a>
          )}
          {contact?.hours && <span>{contact.hours}</span>}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-xl font-bold text-gray-900">{siteName}</a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={ctaHref}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {ctaLabel}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content — 12-column grid */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="text-lg font-bold text-white">{siteName}</span>
              {contact?.address && (
                <p className="mt-3 text-sm text-gray-400">{contact.address}</p>
              )}
              {(phone || contact?.phone) && (
                <p className="mt-1 text-sm">
                  <a href={`tel:${phone || contact?.phone}`} className="text-gray-400 hover:text-white">
                    {phone || contact?.phone}
                  </a>
                </p>
              )}
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">바로가기</h4>
              <ul className="flex flex-col gap-2">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-gray-400 hover:text-white">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">이용 안내</h4>
              {contact?.hours && <p className="text-sm text-gray-400">{contact.hours}</p>}
              {contact?.kakao && (
                <p className="mt-2 text-sm text-gray-400">카카오톡: {contact.kakao}</p>
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
