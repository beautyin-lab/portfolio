'use client';

import { PricingTable } from '@portfolio/ui/composites/pricing-table';
import { CTABanner } from '@portfolio/ui/composites/cta-banner';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';

const plans = [
  {
    name: '베이직',
    price: '300만원',
    period: '2~3주',
    description: '심플하고 효과적인 랜딩페이지가 필요한 분께 추천합니다.',
    features: [
      { text: '원페이지 랜딩페이지', included: true },
      { text: '반응형 디자인 (모바일/태블릿/PC)', included: true },
      { text: '기본 SEO 최적화', included: true },
      { text: '문의 폼 연동', included: true },
      { text: '디자인 시안 1종', included: true },
      { text: '수정 2회 포함', included: true },
      { text: '멀티페이지 구성', included: false },
      { text: '관리자 대시보드', included: false },
      { text: '예약/결제 기능', included: false },
    ],
    ctaLabel: '견적 문의하기',
    ctaHref: '/contact',
  },
  {
    name: '스탠다드',
    price: '500만원',
    period: '4~6주',
    description: '비즈니스 성장을 위한 멀티페이지 사이트를 원하시는 분께 추천합니다.',
    highlighted: true,
    badge: '인기',
    features: [
      { text: '멀티페이지 (최대 10페이지)', included: true },
      { text: '반응형 디자인 (모바일/태블릿/PC)', included: true },
      { text: '고급 SEO 최적화', included: true },
      { text: '예약/문의 기능', included: true },
      { text: '관리자 대시보드', included: true },
      { text: '디자인 시안 2종', included: true },
      { text: '수정 5회 포함', included: true },
      { text: '1개월 무료 유지보수', included: true },
      { text: '쇼핑몰/결제 연동', included: false },
    ],
    ctaLabel: '견적 문의하기',
    ctaHref: '/contact',
  },
  {
    name: '프리미엄',
    price: '800만원~',
    period: '6~10주',
    description: '맞춤 기능 개발이 필요한 비즈니스를 위한 풀 패키지입니다.',
    features: [
      { text: '무제한 페이지', included: true },
      { text: '반응형 디자인 (모바일/태블릿/PC)', included: true },
      { text: '맞춤 기능 개발', included: true },
      { text: '쇼핑몰/결제 시스템', included: true },
      { text: 'API 연동 (외부 서비스)', included: true },
      { text: '관리자 대시보드 (맞춤형)', included: true },
      { text: '디자인 시안 3종', included: true },
      { text: '수정 무제한', included: true },
      { text: '3개월 무료 유지보수', included: true },
    ],
    ctaLabel: '맞춤 견적 문의',
    ctaHref: '/contact',
  },
];

export function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal preset="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">가격 안내</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              합리적인 가격으로 프리미엄 퀄리티의 웹사이트를 제작합니다.
              <br />
              모든 패키지에 반응형 디자인이 포함되어 있습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingTable plans={plans} />

          <ScrollReveal preset="fade-up">
            <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
              <h3 className="text-lg font-bold text-gray-900">
                어떤 패키지가 적합한지 모르시겠나요?
              </h3>
              <p className="mt-2 text-gray-600">
                무료 상담을 통해 업종과 필요 기능에 맞는 최적의 패키지를 추천해 드립니다.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  부가세 별도
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  계약금 50% / 잔금 50%
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  세금계산서 발행 가능
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="맞춤 견적을 받아보세요"
        subtitle="업종과 필요 기능에 따라 정확한 견적을 안내해 드립니다."
        ctaLabel="견적 문의하기"
        ctaHref="/contact"
      />
    </>
  );
}
