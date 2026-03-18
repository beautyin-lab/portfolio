'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-02 Immersive Showcase
 * - 풀블리드 100vh 섹션, 도트 네비게이션
 * - 투명 오버레이 헤더
 */

interface AT02LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT02Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT02LayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-black text-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-yellow-500 text-black text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header — 투명 오버레이 */}
      <header
        className={cn(
          'fixed top-[30px] left-0 w-full z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-xl font-bold tracking-widest text-white uppercase">
            {siteName}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wider text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-full border border-white/40 px-6 py-2 text-sm text-white transition-all hover:bg-white hover:text-black"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-black/95 flex flex-col items-center justify-center">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-6 h-10 w-10 flex items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-light tracking-wider text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full border border-white/40 px-8 py-3 text-white transition-all hover:bg-white hover:text-black"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      )}

      {/* Main Content — Full bleed */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <span className="text-lg font-bold tracking-widest uppercase">{siteName}</span>
              {contact?.address && (
                <p className="mt-4 text-sm text-white/50">{contact.address}</p>
              )}
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">이용 시간</h4>
              {contact?.hours && <p className="text-sm text-white/60">{contact.hours}</p>}
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">연락처</h4>
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-sm text-white/60 hover:text-white">
                  {phone || contact?.phone}
                </a>
              )}
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
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
