'use client';

import * as React from 'react';
import { Menu, X, Phone, Clock, Mail, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-03 Professional Trust
 * - Two-tier header: info bar (dark blue) + main nav bar (white, shadow)
 * - Breadcrumb, dropdown-style nav, structured 12-col grid
 * - Clean sans-serif, bold headings, clear hierarchy
 * - White + light gray alternating sections + navy blue accents
 * - 4-column footer
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

export function AT03Layout({
  siteName,
  navItems = [],
  ctaLabel = '상담 예약',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);

  return (
    <div className={cn('min-h-screen bg-gray-50 text-gray-900', className)}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className="relative z-[60] bg-blue-950 px-4 py-1.5 text-center text-xs text-blue-200">
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-white"
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Top Info Bar -- Dark navy, contact info */}
      <div className="hidden bg-blue-900 text-white md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6 text-xs text-blue-200">
            {(phone || contact?.phone) && (
              <a
                href={`tel:${phone || contact?.phone}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3 w-3" />
                {phone || contact?.phone}
              </a>
            )}
            {contact?.hours && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {contact.hours}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-blue-200">
            {contact?.kakao && (
              <span>카카오톡: {contact.kakao}</span>
            )}
            {contact?.address && (
              <span className="hidden lg:inline">{contact.address}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar -- White, shadow, professional */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-800 text-xs font-bold text-white">
              {siteName.charAt(0)}
            </div>
            <span className="text-lg font-bold text-gray-900">{siteName}</span>
          </a>

          {/* Desktop Nav -- Center, dropdown style with underline indicator */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-800 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-blue-800 after:transition-all hover:after:w-3/4"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={ctaHref}
              className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 shadow-lg lg:hidden">
            {/* Mobile contact info */}
            <div className="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4 text-xs text-gray-500">
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="flex items-center gap-1.5"
                >
                  <Phone className="h-3 w-3" />
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.hours && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {contact.hours}
                </span>
              )}
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-lg bg-blue-800 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs text-gray-400">
          <a href="#" className="transition-colors hover:text-blue-800">
            홈
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-600">현재 페이지</span>
        </div>
      </div>

      {/* Main Content -- Structured grid, alternating bg sections */}
      <main>
        <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
      </main>

      {/* Footer -- 4 column, dark professional */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: About */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-700 text-xs font-bold text-white">
                  {siteName.charAt(0)}
                </div>
                <span className="text-base font-bold text-white">{siteName}</span>
              </div>
              {contact?.address && (
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {contact.address}
                </p>
              )}
            </div>

            {/* Column 2: Services / nav links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">서비스</h4>
              <ul className="flex flex-col gap-2.5">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Info */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">이용 안내</h4>
              {contact?.hours && (
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  {contact.hours}
                </div>
              )}
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
                <span>개인정보처리방침</span>
                <span>이용약관</span>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">연락처</h4>
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && (
                <p className="mt-3 text-sm text-gray-400">
                  카카오톡: {contact.kakao}
                </p>
              )}
              <a
                href={ctaHref}
                className="mt-4 inline-block rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
              >
                {ctaLabel}
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA -- Phone icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={phone || contact?.phone ? `tel:${phone || contact?.phone}` : ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="전화 문의"
          title="전화 문의"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
