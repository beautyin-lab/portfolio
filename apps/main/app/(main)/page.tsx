'use client';

import {
  Layout,
  Globe,
  ShoppingBag,
  CalendarCheck,
  DollarSign,
  Palette,
  Settings,
  Zap,
  Headphones,
  PenTool,
  Code,
  Rocket,
  FolderOpen,
  Users,
  RefreshCcw,
  Star,
} from 'lucide-react';
import { HeroSection } from '@portfolio/ui/composites/hero-section';
import { ServiceCards } from '@portfolio/ui/composites/service-cards';
import { StatsCounter } from '@portfolio/ui/composites/stats-counter';
import { TestimonialSlider } from '@portfolio/ui/composites/testimonial-slider';
import { ProcessSteps } from '@portfolio/ui/composites/process-steps';
import { CTABanner } from '@portfolio/ui/composites/cta-banner';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';
import { PortfolioPreview } from './components/portfolio-preview';

/* ─── Section 1: Hero ─── */
const heroSlides = [
  {
    title: '당신의 비즈니스를\n빛나게 할 웹사이트',
    subtitle: '전문 디자이너와 개발자가 만드는 프리미엄 웹사이트',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
  },
  {
    title: '업종에 딱 맞는\n맞춤형 디자인',
    subtitle: '15개 업종, 30개 이상의 실제 운영 사이트 제작 경험',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1920&q=80',
  },
  {
    title: '합리적인 가격,\n프리미엄 퀄리티',
    subtitle: '300만원부터 시작하는 맞춤형 웹사이트 제작',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80',
  },
];

/* ─── Section 2: Services ─── */
const services = [
  {
    icon: <Layout className="h-6 w-6" />,
    title: '랜딩페이지',
    description:
      '전환율을 극대화하는 원페이지 랜딩페이지. 광고 캠페인, 신규 서비스 런칭에 최적화된 디자인을 제공합니다.',
    price: '300만원~',
    ctaLabel: '자세히 보기',
    ctaHref: '/pricing',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '기업 홈페이지',
    description:
      '브랜드 아이덴티티를 담은 기업 공식 홈페이지. 회사 소개, 서비스 안내, 채용 정보까지 체계적으로 구성합니다.',
    price: '500만원~',
    ctaLabel: '자세히 보기',
    ctaHref: '/pricing',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: '쇼핑몰',
    description:
      '결제 시스템, 상품 관리, 주문 처리까지. 매출을 만들어내는 온라인 쇼핑몰을 구축합니다.',
    price: '800만원~',
    ctaLabel: '자세히 보기',
    ctaHref: '/pricing',
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: '예약 사이트',
    description:
      '실시간 예약, 일정 관리, 알림 기능까지. 병원, 미용실, 펜션 등 예약이 필요한 모든 업종에 맞춤 제작합니다.',
    price: '500만원~',
    ctaLabel: '자세히 보기',
    ctaHref: '/pricing',
  },
];

/* ─── Section 3: Pain Points ─── */
const painPoints = [
  {
    icon: <DollarSign className="h-7 w-7" />,
    title: '비용이 부담되시나요?',
    description: '불필요한 비용 없이 합리적인 가격으로 프리미엄 퀄리티의 웹사이트를 제작해 드립니다.',
  },
  {
    icon: <Palette className="h-7 w-7" />,
    title: '디자인이 걱정되시나요?',
    description: '업종별 전문 디자이너가 트렌디하면서도 브랜드에 맞는 디자인을 제안해 드립니다.',
  },
  {
    icon: <Settings className="h-7 w-7" />,
    title: '관리가 어려우신가요?',
    description: '누구나 쉽게 콘텐츠를 수정할 수 있는 관리자 패널을 제공하고, 유지보수도 대행합니다.',
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: '기능이 부족하신가요?',
    description: '예약, 결제, 회원관리 등 필요한 기능을 맞춤 개발하여 비즈니스 성장을 돕습니다.',
  },
];

/* ─── Section 4: Stats ─── */
const stats = [
  { value: 500, suffix: '+', label: '제작 프로젝트' },
  { value: 200, suffix: '+', label: '클라이언트' },
  { value: 95, suffix: '%', label: '재계약율' },
  { value: 4.9, decimals: 1, label: '평균 만족도' },
];

/* ─── Section 6: Testimonials ─── */
const testimonials = [
  {
    name: '김민수',
    role: '강남정형외과 원장',
    rating: 5,
    content:
      '환자분들이 홈페이지를 통해 예약하는 비율이 크게 늘었습니다. 깔끔한 디자인과 편리한 예약 시스템이 정말 마음에 듭니다.',
  },
  {
    name: '이지은',
    role: '카페 블룸 대표',
    rating: 5,
    content:
      '인스타 감성의 웹사이트 덕분에 온라인 주문이 2배 이상 늘었어요. 모바일에서도 예쁘게 나와서 손님들이 좋아합니다.',
  },
  {
    name: '박준혁',
    role: '법무법인 정의 변호사',
    rating: 5,
    content:
      '전문적이면서도 신뢰감을 주는 디자인에 매우 만족합니다. 상담 문의가 이전보다 40% 증가했습니다.',
  },
  {
    name: '최수진',
    role: '헤어살롱 수 원장',
    rating: 5,
    content:
      '예약 시스템이 정말 편리합니다. 전화 예약이 줄고 온라인 예약이 늘어 업무 효율이 크게 올랐어요.',
  },
  {
    name: '정현우',
    role: '부동산 미래공간 대표',
    rating: 4,
    content:
      '매물 관리가 간편해졌고, 고객들이 직접 매물을 검색할 수 있어 문의 전환율이 높아졌습니다.',
  },
  {
    name: '한소영',
    role: '플로리스트 소소 대표',
    rating: 5,
    content:
      '꽃집 분위기에 맞는 감성적인 웹사이트를 만들어 주셨어요. 온라인 주문 기능 덕분에 매출이 눈에 띄게 올랐습니다.',
  },
];

/* ─── Section 7: Process Steps ─── */
const processSteps = [
  {
    icon: <Headphones className="h-5 w-5" />,
    title: '상담',
    description: '업종, 원하는 기능, 예산을 상담하고 최적의 솔루션을 제안드립니다.',
  },
  {
    icon: <PenTool className="h-5 w-5" />,
    title: '기획 & 디자인',
    description: '와이어프레임과 디자인 시안을 제작하고, 피드백을 반영합니다.',
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: '개발',
    description: '최신 기술 스택으로 반응형 웹사이트를 개발합니다.',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: '오픈 & 유지보수',
    description: '테스트 완료 후 사이트를 오픈하고, 지속적으로 관리합니다.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <HeroSection
        variant="fade-slider"
        slides={heroSlides}
        ctaLabel="포트폴리오 보기"
        ctaHref="/portfolio"
        secondaryCtaLabel="무료 상담 받기"
        secondaryCtaHref="/contact"
        overlayOpacity={0.55}
        minHeight="100vh"
      />

      {/* Section 2: Services */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                서비스
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                어떤 웹사이트가 필요하세요?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                업종과 목적에 맞는 최적의 웹사이트를 제작해 드립니다
              </p>
            </div>
          </ScrollReveal>
          <ServiceCards items={services} columns={4} />
        </div>
      </section>

      {/* Section 3: Pain Points */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                웹사이트 때문에
                <br />
                <span className="text-blue-600">고민</span>이신가요?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                많은 사장님들이 같은 고민을 하고 계십니다
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point, i) => (
              <ScrollReveal key={i} preset="fade-up" transition={{ delay: i * 0.1 }}>
                <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    {point.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{point.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal preset="fade-up">
            <div className="mt-12 text-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                저희가 해결해드립니다
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Stats */}
      <section className="bg-navy-900 py-20 md:py-28" style={{ backgroundColor: '#0f172a' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                숫자로 보는 우리의 성과
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                신뢰할 수 있는 파트너가 되겠습니다
              </p>
            </div>
          </ScrollReveal>
          <StatsCounter
            stats={stats}
            columns={4}
            className="[&_*]:text-white [&_.text-gray-900]:text-white [&_.text-gray-500]:text-gray-400"
          />
        </div>
      </section>

      {/* Section 5: Portfolio Preview */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                포트폴리오
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                최근 제작 사례
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                다양한 업종의 클라이언트와 함께한 프로젝트를 확인하세요
              </p>
            </div>
          </ScrollReveal>
          <PortfolioPreview />
          <div className="mt-12 text-center">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <FolderOpen className="h-5 w-5" />
              전체 포트폴리오 보기
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                고객 후기
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                고객님들의 이야기
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                함께 성장한 클라이언트들의 생생한 후기를 확인하세요
              </p>
            </div>
          </ScrollReveal>
          <TestimonialSlider testimonials={testimonials} autoplay autoplayInterval={5000} />
        </div>
      </section>

      {/* Section 7: Process Steps */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal preset="fade-up">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                진행 과정
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                이렇게 진행됩니다
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                체계적인 프로세스로 만족스러운 결과물을 보장합니다
              </p>
            </div>
          </ScrollReveal>
          <ProcessSteps steps={processSteps} orientation="horizontal" />
        </div>
      </section>

      {/* Section 8: CTA Banner */}
      <CTABanner
        title="지금 무료 상담을 시작하세요"
        subtitle="비용 부담 없이 전문 상담을 받아보세요. 맞춤 견적과 제작 방향을 안내해 드립니다."
        ctaLabel="무료 상담 신청"
        ctaHref="/contact"
        secondaryCtaLabel="전화 상담 1588-0000"
        secondaryCtaHref="tel:1588-0000"
      />
    </>
  );
}
