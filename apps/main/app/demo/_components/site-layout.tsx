'use client';

import * as React from 'react';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@portfolio/ui/lib/utils';
import type { LayoutConfig } from '@portfolio/data';

// ---------------------------------------------------------------------------
// Font family mapping
// ---------------------------------------------------------------------------
const HEADING_FONT_MAP: Record<string, string> = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
  serif: "'Noto Serif KR', serif",
  mono: "'Space Grotesk', monospace",
  display: "'Playfair Display', serif",
};

const BODY_FONT_MAP: Record<string, string> = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
  serif: "'Noto Serif KR', serif",
};

// ---------------------------------------------------------------------------
// Heading weight mapping
// ---------------------------------------------------------------------------
const HEADING_WEIGHT_MAP: Record<string, string> = {
  light: '300',
  normal: '400',
  bold: '700',
  black: '900',
};

// ---------------------------------------------------------------------------
// Content width mapping
// ---------------------------------------------------------------------------
const CONTENT_WIDTH_MAP: Record<string, string> = {
  narrow: 'max-w-3xl',
  standard: 'max-w-7xl',
  wide: 'max-w-[1600px]',
  full: 'max-w-none',
};

// ---------------------------------------------------------------------------
// Section spacing mapping
// ---------------------------------------------------------------------------
const SECTION_SPACING_MAP: Record<string, string> = {
  tight: 'py-12',
  normal: 'py-20',
  dramatic: 'py-32',
};

// ---------------------------------------------------------------------------
// Border radius mapping
// ---------------------------------------------------------------------------
const BORDER_RADIUS_MAP: Record<string, string> = {
  none: 'rounded-none',
  small: 'rounded',
  medium: 'rounded-lg',
  large: 'rounded-2xl',
  full: 'rounded-full',
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface SiteLayoutProps {
  siteName: string;
  layoutConfig: LayoutConfig;
  navItems: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  contact?: { phone?: string; address?: string; hours?: string; kakao?: string; email?: string };
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// SiteLayout — Dynamic layout driven by LayoutConfig
// ---------------------------------------------------------------------------
export function SiteLayout({
  siteName,
  layoutConfig,
  navItems,
  ctaLabel = '문의하기',
  ctaHref = '#contact',
  phone,
  contact,
  children,
}: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const config = layoutConfig;
  const isDark = config.colorMode === 'dark';
  const headerStyle = config.headerStyle;
  const footerStyle = config.footerStyle ?? 'minimal';
  const contentWidth = CONTENT_WIDTH_MAP[config.contentWidth ?? 'standard'];
  const headingFontFamily = HEADING_FONT_MAP[config.headingFont] ?? HEADING_FONT_MAP.sans;
  const bodyFontFamily = BODY_FONT_MAP[config.bodyFont ?? 'sans'] ?? BODY_FONT_MAP.sans;
  const headingWeight = HEADING_WEIGHT_MAP[config.headingWeight ?? 'bold'];
  const borderRadiusClass = BORDER_RADIUS_MAP[config.borderRadius ?? 'medium'];
  const effects = config.effects ?? [];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // CSS custom properties for layout
  const layoutStyle: React.CSSProperties = {
    '--layout-heading-font': headingFontFamily,
    '--layout-body-font': bodyFontFamily,
    '--layout-heading-weight': headingWeight,
    '--layout-border-radius': borderRadiusClass,
  } as React.CSSProperties;

  const bgClass = isDark ? 'bg-gray-950 text-white' : 'bg-[hsl(var(--color-background))] text-[hsl(var(--color-text))]';

  // Sidebar layout uses flex
  const isSidebar = headerStyle === 'sidebar';

  return (
    <div className={cn('min-h-screen', bgClass)} style={layoutStyle}>
      {/* Mock Data Banner */}
      {bannerVisible && (
        <div className={cn(
          'relative z-[60] px-4 py-1.5 text-center text-xs',
          isDark ? 'bg-[hsl(var(--color-primary))]/90 text-black font-medium' : 'bg-gray-900 text-white',
        )}>
          이 사이트는 포트폴리오 데모입니다. 실제 업체와 관련이 없습니다.
          <button
            onClick={() => setBannerVisible(false)}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              isDark ? 'text-black/50 hover:text-black' : 'text-white/60 hover:text-white',
            )}
            aria-label="배너 닫기"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Scroll Progress Bar */}
      {effects.includes('scroll-progress') && <ScrollProgressBar />}

      <div className={cn(isSidebar ? 'flex' : '')}>
        {/* ---------- HEADER RENDERING ---------- */}
        {headerStyle === 'minimal' && (
          <MinimalHeader
            siteName={siteName}
            navItems={navItems}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'split-center' && (
          <SplitCenterHeader
            siteName={siteName}
            navItems={navItems}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'transparent-overlay' && (
          <TransparentOverlayHeader
            siteName={siteName}
            navItems={navItems}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            scrolled={scrolled}
            bannerVisible={bannerVisible}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'two-tier' && (
          <TwoTierHeader
            siteName={siteName}
            navItems={navItems}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            phone={phone ?? contact?.phone}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'sticky-shrink' && (
          <StickyShrinkHeader
            siteName={siteName}
            navItems={navItems}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            scrolled={scrolled}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'sidebar' && (
          <SidebarNav
            siteName={siteName}
            navItems={navItems}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            menuOpen={menuOpen}
            onMenuOpen={() => setMenuOpen(true)}
            onMenuClose={() => setMenuOpen(false)}
          />
        )}

        {headerStyle === 'bottom-tabs' && (
          <BottomTabsHeader
            siteName={siteName}
            navItems={navItems}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
          />
        )}

        {headerStyle === 'search-bar' && (
          <SearchBarHeader
            siteName={siteName}
            navItems={navItems}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            searchOpen={searchOpen}
            onSearchToggle={() => setSearchOpen(!searchOpen)}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {headerStyle === 'hamburger-only' && (
          <HamburgerOnlyHeader
            siteName={siteName}
            isDark={isDark}
            headingFontFamily={headingFontFamily}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}

        {/* hidden: no header rendered */}

        {/* ---------- MAIN CONTENT ---------- */}
        <main className={cn(
          'mx-auto w-full',
          contentWidth,
          isSidebar ? 'flex-1' : '',
          headerStyle === 'transparent-overlay' ? '' : '',
          headerStyle === 'sticky-shrink' ? 'pt-16' : '',
        )}>
          {children}
        </main>
      </div>

      {/* ---------- FULLSCREEN MOBILE MENU ---------- */}
      {menuOpen && headerStyle !== 'sidebar' && (
        <FullscreenMenu
          siteName={siteName}
          navItems={navItems}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          isDark={isDark}
          headingFontFamily={headingFontFamily}
          phone={phone ?? contact?.phone}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {/* ---------- FOOTER ---------- */}
      {footerStyle !== 'hidden' && (
        <Footer
          siteName={siteName}
          contact={contact}
          phone={phone}
          footerStyle={footerStyle}
          isDark={isDark}
          isSidebar={isSidebar}
        />
      )}

      {/* ---------- FLOATING CTA ---------- */}
      {headerStyle !== 'bottom-tabs' && (
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href={ctaHref}
            className={cn(
              'flex h-12 w-12 items-center justify-center shadow-lg transition-transform hover:scale-110',
              borderRadiusClass === 'rounded-full' ? 'rounded-full' : 'rounded-xl',
              isDark
                ? 'bg-[hsl(var(--color-primary))] text-gray-950'
                : 'bg-[hsl(var(--color-primary))] text-white',
            )}
            aria-label={ctaLabel}
            title={ctaLabel}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </a>
        </div>
      )}

      {/* ---------- DOT NAV (effect) ---------- */}
      {effects.includes('dot-nav') && (
        <DotNav navItems={navItems} />
      )}
    </div>
  );
}

// ===========================================================================
// HEADER VARIANTS
// ===========================================================================

// 1. Minimal: logo left + nav right, thin bar
function MinimalHeader({
  siteName, navItems, ctaLabel, ctaHref, isDark, headingFontFamily, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; isDark: boolean;
  headingFontFamily: string; onMenuOpen: () => void;
}) {
  return (
    <header className={cn(
      'border-b',
      isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white',
    )}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-semibold" style={{ fontFamily: headingFontFamily }}>
          {siteName}
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors',
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900',
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="rounded-lg bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </a>
        </nav>
        <button onClick={onMenuOpen} className="flex h-9 w-9 items-center justify-center md:hidden" aria-label="메뉴 열기">
          <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
      </div>
    </header>
  );
}

// 2. Split-center: logo center, nav split left/right
function SplitCenterHeader({
  siteName, navItems, isDark, headingFontFamily, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  isDark: boolean; headingFontFamily: string; onMenuOpen: () => void;
}) {
  const left = navItems.slice(0, Math.floor(navItems.length / 2));
  const right = navItems.slice(Math.floor(navItems.length / 2));

  return (
    <header className={cn(
      'border-b',
      isDark ? 'border-white/10 bg-gray-950' : 'border-gray-100 bg-white',
    )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <nav className="hidden flex-1 items-center gap-6 lg:flex">
          {left.map((item) => (
            <a key={item.href} href={item.href} className={cn('text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#" className="shrink-0 text-xl font-semibold tracking-tight" style={{ fontFamily: headingFontFamily }}>
          {siteName}
        </a>
        <nav className="hidden flex-1 items-center justify-end gap-6 lg:flex">
          {right.map((item) => (
            <a key={item.href} href={item.href} className={cn('text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
        </nav>
        <button onClick={onMenuOpen} className="flex h-9 w-9 items-center justify-center lg:hidden" aria-label="메뉴 열기">
          <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
      </div>
    </header>
  );
}

// 3. Transparent overlay: transparent bg, turns opaque on scroll
function TransparentOverlayHeader({
  siteName, navItems, ctaLabel, ctaHref, scrolled, bannerVisible, headingFontFamily, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; scrolled: boolean; bannerVisible: boolean;
  headingFontFamily: string; onMenuOpen: () => void;
}) {
  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-500',
        bannerVisible ? 'mt-[30px]' : 'mt-0',
        scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-xl font-light uppercase tracking-[0.2em] text-white" style={{ fontFamily: headingFontFamily }}>
          {siteName}
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.slice(0, 5).map((item) => (
            <a key={item.href} href={item.href} className="text-[11px] font-light uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <a href={ctaHref} className="border border-white/30 px-5 py-2 text-xs uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black">
            {ctaLabel}
          </a>
        </nav>
        <button onClick={onMenuOpen} className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label="메뉴 열기">
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
}

// 4. Two-tier: top info bar + main nav bar
function TwoTierHeader({
  siteName, navItems, ctaLabel, ctaHref, phone, isDark, headingFontFamily, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; phone?: string; isDark: boolean;
  headingFontFamily: string; onMenuOpen: () => void;
}) {
  return (
    <header>
      {/* Top info bar */}
      <div className={cn(
        'text-xs',
        isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500',
      )}>
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6">
          {phone && <a href={`tel:${phone}`} className="hover:underline">{phone}</a>}
          <span className="hidden sm:inline">평일 09:00 - 18:00</span>
        </div>
      </div>
      {/* Main nav bar */}
      <div className={cn(
        'border-b',
        isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white',
      )}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="text-lg font-bold" style={{ fontFamily: headingFontFamily }}>
            {siteName}
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.slice(0, 6).map((item) => (
              <a key={item.href} href={item.href} className={cn('text-sm font-medium transition-colors', isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900')}>
                {item.label}
              </a>
            ))}
            <a href={ctaHref} className="rounded-lg bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-white">
              {ctaLabel}
            </a>
          </nav>
          <button onClick={onMenuOpen} className="flex h-9 w-9 items-center justify-center md:hidden" aria-label="메뉴 열기">
            <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
          </button>
        </div>
      </div>
    </header>
  );
}

// 5. Sticky-shrink: shrinks height on scroll
function StickyShrinkHeader({
  siteName, navItems, ctaLabel, ctaHref, scrolled, isDark, headingFontFamily, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; scrolled: boolean; isDark: boolean;
  headingFontFamily: string; onMenuOpen: () => void;
}) {
  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full border-b transition-all duration-300',
        isDark ? 'border-white/10 bg-gray-950/95 backdrop-blur-sm' : 'border-gray-200 bg-white/95 backdrop-blur-sm',
        scrolled ? 'h-12' : 'h-16',
      )}
    >
      <div className={cn(
        'mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-300',
        scrolled ? 'h-12' : 'h-16',
      )}>
        <a
          href="#"
          className={cn('font-bold transition-all duration-300', scrolled ? 'text-base' : 'text-lg')}
          style={{ fontFamily: headingFontFamily }}
        >
          {siteName}
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.slice(0, 5).map((item) => (
            <a key={item.href} href={item.href} className={cn('text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
          <a href={ctaHref} className={cn('rounded-lg bg-[hsl(var(--color-primary))] font-medium text-white transition-all', scrolled ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm')}>
            {ctaLabel}
          </a>
        </nav>
        <button onClick={onMenuOpen} className="flex h-9 w-9 items-center justify-center md:hidden" aria-label="메뉴 열기">
          <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
      </div>
    </header>
  );
}

// 6. Sidebar: fixed left sidebar (desktop), hamburger (mobile)
function SidebarNav({
  siteName, navItems, ctaLabel, ctaHref, isDark, headingFontFamily, menuOpen, onMenuOpen, onMenuClose,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; isDark: boolean;
  headingFontFamily: string; menuOpen: boolean; onMenuOpen: () => void; onMenuClose: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden w-60 shrink-0 border-r lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40',
        isDark ? 'border-white/10 bg-gray-900' : 'border-gray-200 bg-gray-50',
      )}>
        <div className="flex h-16 items-center px-6">
          <a href="#" className="text-lg font-bold" style={{ fontFamily: headingFontFamily }}>
            {siteName}
          </a>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4">
          <a href={ctaHref} className="flex items-center justify-center rounded-lg bg-[hsl(var(--color-primary))] px-4 py-2.5 text-sm font-semibold text-white">
            {ctaLabel}
          </a>
        </div>
      </aside>
      {/* Spacer for sidebar width on desktop */}
      <div className="hidden w-60 shrink-0 lg:block" />
      {/* Mobile header */}
      <div className={cn('fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between border-b px-4 lg:hidden',
        isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white',
      )}>
        <a href="#" className="font-bold" style={{ fontFamily: headingFontFamily }}>{siteName}</a>
        <button onClick={onMenuOpen} aria-label="메뉴 열기">
          <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMenuClose} />
          <aside className={cn(
            'absolute left-0 top-0 h-full w-72 border-r',
            isDark ? 'border-white/10 bg-gray-900' : 'border-gray-200 bg-white',
          )}>
            <div className="flex h-14 items-center justify-between px-4">
              <span className="font-bold" style={{ fontFamily: headingFontFamily }}>{siteName}</span>
              <button onClick={onMenuClose} aria-label="메뉴 닫기">
                <X className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-3 py-4">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={onMenuClose} className={cn('rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900')}>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

// 7. Bottom tabs: simple top header + bottom tab bar (mobile)
function BottomTabsHeader({
  siteName, navItems, isDark, headingFontFamily,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  isDark: boolean; headingFontFamily: string;
}) {
  return (
    <>
      {/* Simple top bar */}
      <header className={cn('border-b', isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white')}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4">
          <a href="#" className="text-lg font-bold" style={{ fontFamily: headingFontFamily }}>
            {siteName}
          </a>
        </div>
      </header>
      {/* Desktop nav */}
      <nav className={cn('hidden border-b md:block', isDark ? 'border-white/10 bg-gray-900' : 'border-gray-100 bg-gray-50')}>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={cn('text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      {/* Bottom tabs (mobile) */}
      <div className={cn(
        'fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t py-2 md:hidden',
        isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white',
      )}>
        {navItems.slice(0, 5).map((item, idx) => (
          <a
            key={item.href}
            href={item.href}
            className={cn('flex flex-col items-center gap-0.5 text-[10px]', isDark ? 'text-white/60' : 'text-gray-500')}
          >
            <span className="text-sm">{['🏠', '📋', '👥', '📸', '📞'][idx] ?? '📄'}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}

// 8. Search bar: header with search input
function SearchBarHeader({
  siteName, navItems, isDark, headingFontFamily, searchOpen, onSearchToggle, onMenuOpen,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  isDark: boolean; headingFontFamily: string; searchOpen: boolean;
  onSearchToggle: () => void; onMenuOpen: () => void;
}) {
  return (
    <header className={cn('border-b', isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white')}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <a href="#" className="shrink-0 text-lg font-bold" style={{ fontFamily: headingFontFamily }}>
          {siteName}
        </a>
        {/* Search input (desktop) */}
        <div className={cn(
          'hidden flex-1 md:block',
        )}>
          <div className={cn(
            'flex items-center gap-2 rounded-lg border px-3 py-2',
            isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50',
          )}>
            <Search className={cn('h-4 w-4', isDark ? 'text-white/40' : 'text-gray-400')} />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              className={cn('w-full bg-transparent text-sm outline-none placeholder:text-gray-400', isDark ? 'text-white' : 'text-gray-900')}
              readOnly
            />
          </div>
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.slice(0, 4).map((item) => (
            <a key={item.href} href={item.href} className={cn('text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
        </nav>
        <button onClick={onSearchToggle} className="flex h-9 w-9 items-center justify-center md:hidden" aria-label="검색">
          <Search className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
        <button onClick={onMenuOpen} className="flex h-9 w-9 items-center justify-center lg:hidden" aria-label="메뉴 열기">
          <Menu className={cn('h-5 w-5', isDark ? 'text-white' : 'text-gray-900')} />
        </button>
      </div>
      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className={cn('border-t px-4 py-3 md:hidden', isDark ? 'border-white/10 bg-gray-900' : 'border-gray-100 bg-gray-50')}>
          <div className={cn('flex items-center gap-2 rounded-lg border px-3 py-2', isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white')}>
            <Search className="h-4 w-4 text-gray-400" />
            <input type="text" placeholder="검색어를 입력하세요..." className={cn('w-full bg-transparent text-sm outline-none', isDark ? 'text-white' : 'text-gray-900')} readOnly />
          </div>
        </div>
      )}
    </header>
  );
}

// 9. Hamburger only: just a hamburger button, fullscreen overlay menu
function HamburgerOnlyHeader({
  siteName, isDark, headingFontFamily, onMenuOpen,
}: {
  siteName: string; isDark: boolean; headingFontFamily: string; onMenuOpen: () => void;
}) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')} style={{ fontFamily: headingFontFamily }}>
          {siteName}
        </a>
        <button
          onClick={onMenuOpen}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            isDark ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100',
          )}
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

// ===========================================================================
// FULLSCREEN MENU OVERLAY
// ===========================================================================

function FullscreenMenu({
  siteName, navItems, ctaLabel, ctaHref, isDark, headingFontFamily, phone, onClose,
}: {
  siteName: string; navItems: Array<{ label: string; href: string }>;
  ctaLabel: string; ctaHref: string; isDark: boolean;
  headingFontFamily: string; phone?: string; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[55] flex flex-col bg-gray-950">
      <div className="flex h-16 items-center justify-between px-6">
        <span className="text-lg font-bold text-white" style={{ fontFamily: headingFontFamily }}>{siteName}</span>
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center" aria-label="메뉴 닫기">
          <X className="h-5 w-5 text-white" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-start justify-center gap-5 px-8 md:px-16">
        {navItems.map((item, idx) => (
          <a key={item.href} href={item.href} onClick={onClose} className="group flex items-baseline gap-4">
            <span className="text-sm tabular-nums text-white/30">{String(idx + 1).padStart(2, '0')}</span>
            <span className="text-3xl font-light text-white transition-colors group-hover:text-[hsl(var(--color-primary))] md:text-4xl" style={{ fontFamily: headingFontFamily }}>
              {item.label}
            </span>
          </a>
        ))}
        <div className="mt-8 border-t border-white/10 pt-8">
          <a href={ctaHref} onClick={onClose} className="text-sm font-medium uppercase tracking-[0.15em] text-[hsl(var(--color-primary))] transition-colors hover:opacity-80">
            {ctaLabel}
          </a>
        </div>
      </nav>
      {phone && (
        <div className="px-8 pb-10">
          <a href={`tel:${phone}`} className="text-sm text-white/40 hover:text-white/70">{phone}</a>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// FOOTER VARIANTS
// ===========================================================================

function Footer({
  siteName, contact, phone, footerStyle, isDark, isSidebar,
}: {
  siteName: string; contact?: { phone?: string; address?: string; hours?: string; kakao?: string; email?: string };
  phone?: string; footerStyle: string; isDark: boolean; isSidebar: boolean;
}) {
  const resolvedPhone = phone ?? contact?.phone;

  if (footerStyle === 'minimal') {
    return (
      <footer className={cn('border-t', isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white', isSidebar ? 'lg:ml-60' : '')}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <span className={cn('text-sm', isDark ? 'text-white/40' : 'text-gray-400')}>{siteName}</span>
          <span className={cn('text-xs', isDark ? 'text-white/20' : 'text-gray-400')}>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    );
  }

  if (footerStyle === 'dark') {
    return (
      <footer className={cn('border-t border-white/5 bg-black', isSidebar ? 'lg:ml-60' : '')}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 md:flex-row md:justify-between">
          <span className="text-xs font-light uppercase tracking-[0.3em] text-white/40">{siteName}</span>
          <div className="flex items-center gap-6">
            {resolvedPhone && <a href={`tel:${resolvedPhone}`} className="text-xs text-white/30 hover:text-white/60">{resolvedPhone}</a>}
            {contact?.email && <span className="text-xs text-white/30">{contact.email}</span>}
          </div>
          <span className="text-[10px] text-white/20">&copy; {new Date().getFullYear()} {siteName}</span>
        </div>
      </footer>
    );
  }

  if (footerStyle === 'multi-column') {
    return (
      <footer className={cn('border-t', isDark ? 'border-white/10 bg-gray-900' : 'border-gray-200 bg-gray-50', isSidebar ? 'lg:ml-60' : '')}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-gray-900')}>{siteName}</h4>
            {contact?.address && <p className={cn('mt-2 text-sm', isDark ? 'text-white/50' : 'text-gray-500')}>{contact.address}</p>}
          </div>
          <div>
            <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-gray-900')}>연락처</h4>
            {resolvedPhone && <p className={cn('mt-2 text-sm', isDark ? 'text-white/50' : 'text-gray-500')}>{resolvedPhone}</p>}
            {contact?.email && <p className={cn('mt-1 text-sm', isDark ? 'text-white/50' : 'text-gray-500')}>{contact.email}</p>}
          </div>
          <div>
            <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-gray-900')}>영업시간</h4>
            {contact?.hours && <p className={cn('mt-2 text-sm', isDark ? 'text-white/50' : 'text-gray-500')}>{contact.hours}</p>}
          </div>
        </div>
        <div className={cn('border-t px-6 py-4 text-center text-xs', isDark ? 'border-white/10 text-white/30' : 'border-gray-200 text-gray-400')}>
          &copy; {new Date().getFullYear()} {siteName}
        </div>
      </footer>
    );
  }

  // centered
  return (
    <footer className={cn('border-t', isDark ? 'border-white/10 bg-gray-950' : 'border-gray-200 bg-white', isSidebar ? 'lg:ml-60' : '')}>
      <div className="mx-auto max-w-7xl px-6 py-10 text-center">
        <p className={cn('text-base font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{siteName}</p>
        {resolvedPhone && <p className={cn('mt-2 text-sm', isDark ? 'text-white/40' : 'text-gray-500')}>{resolvedPhone}</p>}
        <p className={cn('mt-4 text-xs', isDark ? 'text-white/20' : 'text-gray-400')}>&copy; {new Date().getFullYear()} {siteName}</p>
      </div>
    </footer>
  );
}

// ===========================================================================
// EFFECTS
// ===========================================================================

function ScrollProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[70] h-0.5 w-full">
      <div
        className="h-full bg-[hsl(var(--color-primary))] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function DotNav({ navItems }: { navItems: Array<{ label: string; href: string }> }) {
  const [activeDot, setActiveDot] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const idx = Math.round(window.scrollY / window.innerHeight);
      setActiveDot(Math.min(idx, (navItems.length || 5) - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems.length]);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      {navItems.slice(0, 6).map((item, idx) => (
        <a key={item.href} href={item.href} aria-label={item.label} title={item.label} className="group relative flex items-center justify-end">
          <span className="absolute right-5 whitespace-nowrap rounded bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
          <span className={cn('block rounded-full transition-all duration-300', activeDot === idx ? 'h-3 w-3 bg-[hsl(var(--color-primary))]' : 'h-2 w-2 bg-white/30 group-hover:bg-white/60')} />
        </a>
      ))}
    </div>
  );
}
