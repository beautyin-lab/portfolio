'use client';

import { FAQSection } from '@portfolio/ui/composites/faq-section';
import { CTABanner } from '@portfolio/ui/composites/cta-banner';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';

const faqItems = [
  {
    id: 'faq-1',
    question: '제작 기간은 얼마나 걸리나요?',
    answer:
      '프로젝트 규모에 따라 다릅니다. 랜딩페이지는 약 2~3주, 기업 홈페이지는 4~6주, 맞춤 기능이 포함된 프리미엄 프로젝트는 6~10주 정도 소요됩니다. 정확한 일정은 상담 후 안내해 드립니다.',
  },
  {
    id: 'faq-2',
    question: '수정은 몇 번까지 가능한가요?',
    answer:
      '패키지에 따라 다릅니다. 베이직은 2회, 스탠다드는 5회, 프리미엄은 무제한 수정이 가능합니다. 디자인 시안 단계에서 충분한 피드백을 반영하여, 개발 단계에서의 수정을 최소화합니다.',
  },
  {
    id: 'faq-3',
    question: '호스팅/도메인은 어떻게 되나요?',
    answer:
      '호스팅과 도메인은 별도입니다. 클라우드 호스팅(월 1~3만원)과 도메인(연 1~3만원) 설정을 도와드리며, 기존에 사용하시는 호스팅이 있으면 연동도 가능합니다. 호스팅 관리 대행 서비스도 제공합니다.',
  },
  {
    id: 'faq-4',
    question: '디자인 시안은 몇 개 받을 수 있나요?',
    answer:
      '베이직 1종, 스탠다드 2종, 프리미엄 3종의 디자인 시안을 제공합니다. 시안 중 마음에 드는 방향을 선택한 후, 세부 수정을 진행합니다. 추가 시안이 필요한 경우 별도 비용이 발생할 수 있습니다.',
  },
  {
    id: 'faq-5',
    question: '모바일 반응형도 되나요?',
    answer:
      '네, 모든 패키지에 반응형 디자인이 기본 포함되어 있습니다. 모바일(375px), 태블릿(768px), 데스크톱(1440px)까지 모든 화면 크기에서 최적화된 디자인을 제공합니다.',
  },
  {
    id: 'faq-6',
    question: '유지보수 비용은 얼마인가요?',
    answer:
      '스탠다드 패키지는 1개월, 프리미엄은 3개월 무료 유지보수를 제공합니다. 이후에는 월 10~30만원의 유지보수 계약이 가능하며, 콘텐츠 수정, 보안 업데이트, 기능 추가 등을 포함합니다.',
  },
  {
    id: 'faq-7',
    question: '결제는 어떻게 하나요?',
    answer:
      '계약금 50%, 잔금 50%로 나누어 결제합니다. 계약금은 계약 시, 잔금은 사이트 오픈 전에 입금해 주시면 됩니다. 세금계산서 발행이 가능하며, 카드 결제도 지원합니다.',
  },
  {
    id: 'faq-8',
    question: '기존 사이트 리뉴얼도 가능한가요?',
    answer:
      '네, 기존 사이트 리뉴얼도 가능합니다. 현재 사이트의 분석 후, 개선 방향을 제안해 드립니다. 기존 콘텐츠와 데이터를 새 사이트로 이전하는 작업도 포함됩니다.',
  },
  {
    id: 'faq-9',
    question: 'SEO 최적화도 해주시나요?',
    answer:
      '네, 모든 패키지에 기본 SEO 최적화가 포함됩니다. 메타태그, 구조화 데이터, 사이트맵, 이미지 최적화 등을 적용하며, 스탠다드 이상 패키지에서는 검색엔진 등록과 키워드 분석도 지원합니다.',
  },
  {
    id: 'faq-10',
    question: '추가 기능 개발도 가능한가요?',
    answer:
      '네, 예약 시스템, 결제 연동, 회원관리, API 연동 등 맞춤 기능 개발이 가능합니다. 프리미엄 패키지에 포함되어 있으며, 다른 패키지에서도 추가 비용으로 개발 가능합니다. 상담 시 필요한 기능을 말씀해 주시면 견적에 반영합니다.',
  },
];

export function FAQPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal preset="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">자주 묻는 질문</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              웹사이트 제작에 대해 궁금한 점이 있으신가요? 자주 묻는 질문을 확인해 보세요.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQSection items={faqItems} showSearch defaultOpen="faq-1" />
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="더 궁금한 점이 있으신가요?"
        subtitle="찾으시는 답변이 없다면 직접 문의해 주세요. 친절하게 안내해 드리겠습니다."
        ctaLabel="문의하기"
        ctaHref="/contact"
        secondaryCtaLabel="전화 상담 1588-0000"
        secondaryCtaHref="tel:1588-0000"
      />
    </>
  );
}
