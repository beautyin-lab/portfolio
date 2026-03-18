'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * AT-08 Warm Storytelling
 * - Cafe/restaurant warm narrative site
 * - Scroll progress bar, narrow single column
 * - Serif body text, earth tones
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

export function AT08Layout({
  siteName,
  navItems = [],
  ctaLabel = '\uBB38\uC758\uD558\uAE30',
  ctaHref = '#contact',
  phone,
  contact,
  children,
  className,
}: ArchetypeLayoutProps) {
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
    <div className={cn('min-h-screen bg-[#fdf6ec] font-serif', className)}>
      {/* Mock Data Banner */}
      <div className="bg-[#5c4033] text-[#f5e6d3] text-center text-xs py-1.5 px-4 relative z-[60]">
        이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
      </div>

      {/* Header -- warm fixed bar */}
      <header className="sticky top-0 z-50 bg-[#f5ebe0]/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          <a href="#" className="text-lg font-medium text-[#3d2c18] tracking-wide">
            {siteName}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#8b6f47] transition-colors hover:text-[#3d2c18]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-lg bg-amber-800 px-4 py-2 text-sm text-[#fdf6ec] transition-colors hover:bg-amber-900"
            >
              {ctaLabel}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[#e8ddd0] md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#3d2c18]" /> : <Menu className="h-5 w-5 text-[#3d2c18]" />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-0.5 w-full bg-[#f5ebe0]">
          <div
            className="h-full bg-amber-700 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[#e8ddd0] bg-[#f5ebe0] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 text-sm text-[#8b6f47] hover:text-[#3d2c18]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-amber-800 py-2.5 text-center text-sm text-[#fdf6ec]"
              >
                {ctaLabel}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content -- Narrow single-column narrative */}
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <div className="text-[#3d2c18] leading-relaxed">
          {children}
        </div>
      </main>

      {/* Footer -- warm, centered */}
      <footer className="bg-[#3d2c18] text-[#c4b09a]">
        <div className="mx-auto max-w-2xl px-6 py-12 text-center">
          <span className="text-lg font-medium text-[#f5ebe0]">{siteName}</span>
          {contact?.address && (
            <p className="mt-4 text-sm">{contact.address}</p>
          )}
          {contact?.hours && (
            <p className="mt-1 text-sm">{contact.hours}</p>
          )}
          {(phone || contact?.phone) && (
            <a
              href={`tel:${phone || contact?.phone}`}
              className="mt-1 inline-block text-sm hover:text-[#f5ebe0]"
            >
              {phone || contact?.phone}
            </a>
          )}
          {contact?.kakao && (
            <p className="mt-1 text-sm">카카오톡: {contact.kakao}</p>
          )}
          <div className="mt-8 border-t border-[#5c4033] pt-6 text-xs text-[#8b6f47]">
            &copy; {new Date().getFullYear()} {siteName}. 포트폴리오 데모 사이트.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={ctaHref}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-amber-800 text-[#fdf6ec] shadow-lg transition-transform hover:scale-110"
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
