'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../primitives/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '../primitives/sheet';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  variant?: 'fixed' | 'transparent' | 'sidebar' | 'overlay';
  className?: string;
}

export function Header({
  logo,
  navItems = [],
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  onCtaClick,
  variant = 'fixed',
  className,
}: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFixed = variant === 'fixed' || variant === 'overlay';

  return (
    <header
      className={cn(
        'z-50 w-full transition-all duration-300',
        isFixed && 'fixed top-0 left-0',
        variant === 'transparent' && 'relative',
        variant === 'sidebar' && 'relative',
        scrolled || variant === 'fixed'
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : variant === 'overlay'
            ? 'bg-transparent'
            : 'bg-white',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logo ?? (
            <a href="/" className="text-xl font-bold text-gray-900">
              Logo
            </a>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            size="md"
            onClick={onCtaClick}
            asChild={!onCtaClick}
          >
            {onCtaClick ? ctaLabel : <a href={ctaHref}>{ctaLabel}</a>}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="메뉴 열기"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" showClose>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex-shrink-0">
                {logo ?? (
                  <span className="text-xl font-bold text-gray-900">Logo</span>
                )}
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  onCtaClick?.();
                }}
                asChild={!onCtaClick}
              >
                {onCtaClick ? ctaLabel : <a href={ctaHref}>{ctaLabel}</a>}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
