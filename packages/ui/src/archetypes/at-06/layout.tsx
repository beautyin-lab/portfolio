'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-06 Playful Interactive
 * - 자유 카드 배치, 밝은 액센트
 * - 상단 컬러 바 + 모바일 하단 탭
 */

interface AT06LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT06Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT06LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-purple-600 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Color bar accent */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-xl font-bold text-gray-900">
            <span className="text-purple-500">*</span> {siteName}
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-all hover:text-purple-500 hover:-translate-y-0.5"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-purple-50 md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-center text-sm font-medium text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6">{children}</main>

      {/* Footer */}
      <footer className="mt-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <span className="text-lg font-bold text-gray-900">
                <span className="text-purple-500">*</span> {siteName}
              </span>
              {contact?.address && <p className="mt-3 text-sm text-gray-500">{contact.address}</p>}
            </div>
            <div>
              {contact?.hours && (
                <>
                  <h4 className="mb-2 text-sm font-semibold text-purple-500">운영 시간</h4>
                  <p className="text-sm text-gray-500">{contact.hours}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-purple-500">연락처</h4>
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-sm text-gray-500 hover:text-purple-500">
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && <p className="mt-1 text-sm text-gray-500">카카오톡: {contact.kakao}</p>}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tab */}
      <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white py-2 md:hidden z-50">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 text-[10px] text-gray-500 hover:text-purple-500"
            >
              <span className="text-lg">&#9679;</span>
              {item.label}
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
