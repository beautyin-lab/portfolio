'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-08 Warm Storytelling
 * - 싱글 컬럼, 스크롤 내러티브
 * - 스크롤 프로그레스 인디케이터
 */

interface AT08LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT08Layout({
  siteName,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT08LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((window.scrollY / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-[#fdfbf7]', className)}>
      {/* Mock Data Banner */}
      <div className="bg-[#5a4a3a] text-[#f5ede3] text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 z-[61] h-0.5 bg-[#fdfbf7] w-full">
        <div
          className="h-full bg-[#8b7355] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-[#ebe3d7]">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <a href="#" className="text-lg font-medium text-[#3d3328]">{siteName}</a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#8a7b6a] transition-colors hover:text-[#3d3328]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-lg bg-[#8b7355] px-4 py-2 text-sm text-white transition-colors hover:bg-[#7a6345]"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#3d3328]" /> : <Menu className="h-5 w-5 text-[#3d3328]" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#ebe3d7] bg-[#fdfbf7] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1 text-sm text-[#8a7b6a] hover:text-[#3d3328]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[#8b7355] py-2.5 text-center text-sm text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content — Single column narrative */}
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="bg-[#3d3328] text-[#c4b8a6]">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-medium text-[#f5ede3]">{siteName}</span>
            {contact?.address && <p className="mt-3 text-sm">{contact.address}</p>}
            {contact?.hours && <p className="mt-1 text-sm">{contact.hours}</p>}
            {(phone || contact?.phone) && (
              <a href={`tel:${phone || contact?.phone}`} className="mt-1 text-sm hover:text-white">
                {phone || contact?.phone}
              </a>
            )}
          </div>
          <div className="mt-8 border-t border-[#5a4a3a] pt-6 text-center text-xs text-[#8a7b6a]">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8b7355] text-white shadow-lg transition-transform hover:scale-110"
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
