'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-01 Editorial Magazine
 * - 비대칭 그리드, 풀스크린 오버레이 메뉴
 * - 세리프 헤딩, 대형 여백
 */

interface AT01LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT01Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT01LayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-gray-900 text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header — 비대칭 심플 */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <a href="#" className="font-serif text-2xl font-bold tracking-tight text-gray-900">
            {siteName}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wide text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="border-b border-gray-900 pb-0.5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-500 hover:text-gray-600"
            >
              {ctaLabel}
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-white flex flex-col">
          <div className="flex h-20 items-center justify-between px-6">
            <span className="font-serif text-2xl font-bold text-gray-900">{siteName}</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="메뉴 닫기"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl font-light text-gray-900 transition-colors hover:text-gray-500"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="mt-4 border border-gray-900 px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      )}

      {/* Main Content — Editorial Asymmetric Spacing */}
      <main className="mx-auto max-w-7xl px-6 lg:px-12">{children}</main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[2fr_1fr_1fr] lg:px-12">
          <div>
            <span className="font-serif text-xl font-bold text-gray-900">{siteName}</span>
            {contact?.address && (
              <p className="mt-4 text-sm leading-relaxed text-gray-500">{contact.address}</p>
            )}
            {contact?.hours && (
              <p className="mt-1 text-sm text-gray-500">{contact.hours}</p>
            )}
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">메뉴</h4>
            <ul className="flex flex-col gap-2">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-gray-500 hover:text-gray-900">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">연락처</h4>
            {(phone || contact?.phone) && (
              <a href={`tel:${phone || contact?.phone}`} className="text-sm text-gray-500 hover:text-gray-900">
                {phone || contact?.phone}
              </a>
            )}
            {contact?.kakao && (
              <p className="mt-2 text-sm text-gray-500">카카오톡: {contact.kakao}</p>
            )}
          </div>
        </div>
        <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-transform hover:scale-110"
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
