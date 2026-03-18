'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-10 Bold Contrast
 * - 다크/라이트 섹션 교차, 대형 타이포
 * - 투명→다크 헤더 + 햄버거 메뉴
 */

interface AT10LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT10Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT10LayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-black text-white text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header — transparent → dark on scroll */}
      <header
        className={cn(
          'fixed top-[30px] left-0 w-full z-50 transition-all duration-500',
          scrolled ? 'bg-gray-950/95 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a
            href="#"
            className={cn(
              'text-2xl font-black uppercase tracking-tight transition-colors',
              scrolled ? 'text-white' : 'text-white',
            )}
          >
            {siteName}
          </a>

          {/* Desktop: hidden nav items, just hamburger style */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="border border-white/30 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-white hover:text-black"
            >
              {ctaLabel}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Fullscreen Hamburger Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-black flex flex-col">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="text-2xl font-black uppercase tracking-tight text-white">{siteName}</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="메뉴 닫기"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-start justify-center gap-6 px-12">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-4 text-white"
              >
                <span className="text-sm font-light text-white/30">0{i + 1}</span>
                <span className="text-4xl font-black uppercase tracking-tight transition-colors group-hover:text-gray-400 md:text-5xl">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="px-12 pb-12">
            <a
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="inline-block border border-white px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-black"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer — Bold Contrast */}
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <span className="text-3xl font-black uppercase tracking-tight">{siteName}</span>
              {contact?.address && <p className="mt-4 text-sm text-white/50">{contact.address}</p>}
              {contact?.hours && <p className="mt-1 text-sm text-white/50">{contact.hours}</p>}
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-2xl font-bold text-white/80 hover:text-white">
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && (
                <p className="text-sm text-white/40">카카오톡: {contact.kakao}</p>
              )}
              <div className="flex gap-4 mt-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="text-xs text-white/40 hover:text-white uppercase tracking-wider">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/20">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center bg-white text-black shadow-lg transition-transform hover:scale-110"
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
