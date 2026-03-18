'use client';

import * as React from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-04 Dynamic Energy
 * - 대각선 섹션 구분, 굵은 산세리프
 * - 스크롤 시 축소 헤더, CTA 항상 노출
 */

interface AT04LayoutProps {
  siteName: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string };
  children: React.ReactNode;
  className?: string;
}

export function AT04Layout({
  siteName,
  navItems = [],
  ctaLabel = '시작하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: AT04LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Mock Data Banner */}
      <div className="bg-orange-500 text-white text-center text-xs py-1.5 px-4 font-bold relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header — 축소 효과 */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white transition-all duration-300',
          scrolled ? 'shadow-md' : 'shadow-none',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300',
            scrolled ? 'h-14' : 'h-20',
          )}
        >
          <a href="#" className="text-2xl font-black uppercase tracking-tight text-gray-900">
            {siteName}
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase tracking-wider text-gray-600 transition-colors hover:text-orange-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Always-visible CTA */}
          <div className="hidden lg:block">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:gap-3"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-orange-500"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Diagonal section footer */}
      <footer className="relative bg-gray-900 text-white">
        <div className="absolute -top-16 left-0 w-full h-16 bg-gray-900" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <span className="text-xl font-black uppercase tracking-tight">{siteName}</span>
              {contact?.address && <p className="mt-3 text-sm text-gray-400">{contact.address}</p>}
            </div>
            <div>
              {contact?.hours && (
                <>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-orange-400">운영 시간</h4>
                  <p className="text-sm text-gray-400">{contact.hours}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-orange-400">문의</h4>
              {(phone || contact?.phone) && (
                <a href={`tel:${phone || contact?.phone}`} className="text-sm text-gray-400 hover:text-white">
                  {phone || contact?.phone}
                </a>
              )}
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform hover:scale-110"
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
