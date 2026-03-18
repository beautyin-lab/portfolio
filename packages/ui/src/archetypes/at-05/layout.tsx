'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-05 Soft & Organic
 * - 센터 로고 + 양쪽 분할 메뉴 (로고 왼쪽 2개, 오른쪽 2개)
 * - 모든 요소 큰 둥근 모서리, 카드형 떠있는 섹션
 * - 가벼운 산세리프 (font-light), 파스텔/뉴트럴 톤
 * - 따뜻한 크림 배경, 민트/라벤더/피치 액센트
 * - 둥근 카드 형태 푸터, 중앙 정렬, 미니멀
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
  const [bannerVisible, setBannerVisible] = React.useState(true);

  const leftNav = navItems.slice(0, Math.ceil(navItems.length / 2));
  const rightNav = navItems.slice(Math.ceil(navItems.length / 2));

  return (
    <div className={cn('min-h-screen bg-[#f7f4f0] text-gray-700', className)}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className="relative z-[60] bg-[#d4c5b3] px-4 py-1.5 text-center text-xs text-[#5a4a3a]">
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a4a3a]/60 hover:text-[#5a4a3a]"
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header -- 센터 로고, 분할 네비, 부드러운 둥근 모서리 */}
      <header className="sticky top-0 z-50 bg-[#f7f4f0]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left Nav */}
            <nav className="hidden flex-1 items-center gap-8 lg:flex">
              {leftNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-light text-gray-500 transition-colors hover:text-[#8b7355]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Center Logo -- 유기적 스타일 */}
            <a
              href="#"
              className="flex flex-shrink-0 flex-col items-center px-6"
            >
              <span className="text-xl font-light tracking-wide text-[#6b5a45]">
                {siteName}
              </span>
              <span className="mt-0.5 h-px w-8 bg-[#c4a882]" />
            </a>

            {/* Right Nav */}
            <nav className="hidden flex-1 items-center justify-end gap-8 lg:flex">
              {rightNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-light text-gray-500 transition-colors hover:text-[#8b7355]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                className="rounded-full bg-[#c4a882] px-5 py-2 text-sm font-normal text-white shadow-sm transition-all hover:bg-[#b09570] hover:shadow-md"
              >
                {ctaLabel}
              </a>
            </nav>

            {/* Mobile 햄버거 */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#ebe5dc] lg:hidden"
              aria-label="메뉴"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-[#6b5a45]" />
              ) : (
                <Menu className="h-5 w-5 text-[#6b5a45]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile 메뉴 -- 둥근 카드 드롭다운 */}
        {mobileOpen && (
          <div className="mx-4 mb-4 rounded-2xl bg-white px-6 py-6 shadow-lg lg:hidden">
            <nav className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 text-sm font-light text-gray-600 transition-colors hover:text-[#8b7355]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-[#c4a882] px-6 py-2.5 text-sm text-white shadow-sm"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content -- children을 둥근 흰색 카드 컨테이너로 래핑 */}
      <main className="mx-4 py-6 md:mx-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {children}
          </div>
        </div>
      </main>

      {/* Footer -- 둥근 카드 형태, 중앙 정렬, 미니멀 */}
      <footer className="mx-4 mb-6 mt-6 md:mx-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-center text-center">
            {/* 로고 */}
            <span className="text-lg font-light tracking-wide text-[#6b5a45]">
              {siteName}
            </span>
            <span className="mt-1 h-px w-8 bg-[#c4a882]" />

            {/* 연락처 */}
            <div className="mt-6 flex flex-col items-center gap-1.5">
              {contact?.address && (
                <p className="text-sm font-light text-gray-400">
                  {contact.address}
                </p>
              )}
              {contact?.hours && (
                <p className="text-sm font-light text-gray-400">
                  {contact.hours}
                </p>
              )}
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="text-sm font-light text-gray-400 transition-colors hover:text-[#8b7355]"
                >
                  {phone || contact?.phone}
                </a>
              )}
            </div>

            {/* Nav 링크 */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-light text-gray-400 transition-colors hover:text-[#8b7355]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* 저작권 */}
            <p className="mt-8 text-xs text-gray-300">
              &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모
              사이트.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA -- 부드러운 둥근 */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c4a882] text-white shadow-lg shadow-[#c4a882]/20 transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
