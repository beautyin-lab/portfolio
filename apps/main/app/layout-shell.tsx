'use client';

import { Header } from '@portfolio/ui/composites/header';
import { Footer } from '@portfolio/ui/composites/footer';
import { FloatingCTA } from '@portfolio/ui/composites/floating-cta';
import { SmoothScrollProvider } from '@portfolio/ui/animations/components/smooth-scroll-provider';
import { Toaster } from '@portfolio/ui/primitives/toast';

const navItems = [
  { label: '홈', href: '/' },
  { label: '포트폴리오', href: '/portfolio' },
  { label: '가격 안내', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

const footerSections = [
  {
    title: '서비스',
    links: [
      { label: '랜딩페이지 제작', href: '/pricing' },
      { label: '기업 홈페이지', href: '/pricing' },
      { label: '쇼핑몰 제작', href: '/pricing' },
      { label: '예약 사이트', href: '/pricing' },
    ],
  },
  {
    title: '안내',
    links: [
      { label: '포트폴리오', href: '/portfolio' },
      { label: '가격 안내', href: '/pricing' },
      { label: '자주 묻는 질문', href: '/faq' },
      { label: '문의하기', href: '/contact' },
    ],
  },
  {
    title: '고객 지원',
    links: [
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '블로그', href: '#' },
    ],
  },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Header
        logo={
          <a href="/" className="text-xl font-bold text-gray-900">
            <span className="text-blue-600">Web</span>Studio
          </a>
        }
        navItems={navItems}
        ctaLabel="문의하기"
        ctaHref="/contact"
        variant="fixed"
      />

      <main className="pt-16">{children}</main>

      <Footer
        logo={
          <span className="text-xl font-bold text-white">
            <span className="text-blue-400">Web</span>Studio
          </span>
        }
        sections={footerSections}
        contactInfo={{
          phone: '1588-0000',
          email: 'contact@webstudio.kr',
          address: '서울특별시 강남구 테헤란로 123, 4층',
          hours: '평일 09:00 - 18:00',
        }}
        copyright={`© ${new Date().getFullYear()} WebStudio. All rights reserved.`}
      />

      <FloatingCTA
        buttons={[
          {
            type: 'kakao',
            href: 'https://pf.kakao.com/',
            label: '카카오톡 문의',
          },
          {
            type: 'phone',
            href: 'tel:1588-0000',
            label: '전화 문의',
          },
        ]}
        showOnScrollY={400}
      />

      <Toaster />
    </SmoothScrollProvider>
  );
}
