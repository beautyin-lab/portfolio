'use client';

import * as React from 'react';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-04 Dynamic Energy
 * - Bold black header bar, orange accents, shrinks on scroll
 * - Diagonal section dividers via clip-path
 * - Extra bold uppercase sans-serif typography
 * - Dark + orange + white color scheme
 * - Diagonal-edged dark footer, 2-column
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

export function AT04Layout({
  siteName,
  navItems = [],
  ctaLabel = '시작하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-white text-gray-900', className)}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className="relative z-[60] bg-orange-500 px-4 py-1.5 text-center text-xs font-bold text-white">
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header -- Bold black bar, shrinks on scroll */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-gray-900 transition-all duration-300',
          scrolled ? 'shadow-xl' : '',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300',
            scrolled ? 'h-14' : 'h-20',
          )}
        >
          {/* Logo -- Bold + orange accent */}
          <a href="#" className="flex items-center gap-1.5">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="text-xl font-black uppercase tracking-tight text-white">
              {siteName}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors hover:text-orange-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA -- Always orange, always visible */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-orange-500 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-orange-400 hover:gap-3"
            >
              {ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile menu -- slides down */}
        {mobileOpen && (
          <div className="border-t border-gray-800 bg-gray-900 px-6 py-6 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-orange-400"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content -- overflow-hidden for diagonal clipping */}
      <main className="overflow-hidden">
        {/* Diagonal intro accent bar */}
        <div
          className="h-2 bg-orange-500"
          style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)' }}
        />

        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>

      {/* Footer -- Dark with diagonal top edge */}
      <footer className="relative bg-gray-900 text-white">
        {/* Diagonal top edge */}
        <div
          className="absolute -top-20 left-0 h-20 w-full bg-gray-900"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />

        <div className="mx-auto max-w-7xl px-6 pb-12 pt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left column */}
            <div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-5 w-5 text-orange-500" />
                <span className="text-xl font-black uppercase tracking-tight">
                  {siteName}
                </span>
              </div>
              {contact?.address && (
                <p className="mt-4 text-sm text-gray-500">{contact.address}</p>
              )}
              {contact?.hours && (
                <p className="mt-2 text-sm text-gray-500">{contact.hours}</p>
              )}
            </div>

            {/* Right column */}
            <div>
              <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-orange-400">
                문의
              </h4>
              {(phone || contact?.phone) && (
                <a
                  href={`tel:${phone || contact?.phone}`}
                  className="text-lg font-bold text-white transition-colors hover:text-orange-400"
                >
                  {phone || contact?.phone}
                </a>
              )}
              {contact?.kakao && (
                <p className="mt-2 text-sm text-gray-500">
                  카카오톡: {contact.kakao}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors hover:text-orange-400"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA -- Orange */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-14 w-14 items-center justify-center bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-110"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
