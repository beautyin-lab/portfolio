import type { Metadata } from 'next';
import { FAQPageClient } from './faq-client';

export const metadata: Metadata = {
  title: 'FAQ - 자주 묻는 질문',
  description:
    '웹사이트 제작 관련 자주 묻는 질문과 답변. 제작 기간, 비용, 수정 횟수, 유지보수 등 궁금한 점을 확인하세요.',
};

export default function FAQPage() {
  return <FAQPageClient />;
}
