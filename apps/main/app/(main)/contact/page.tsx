import type { Metadata } from 'next';
import { ContactPageClient } from './contact-client';

export const metadata: Metadata = {
  title: '문의하기',
  description:
    '웹사이트 제작 문의, 견적 상담을 원하시면 문의 폼을 작성해 주세요. 빠른 시일 내에 답변 드리겠습니다.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
