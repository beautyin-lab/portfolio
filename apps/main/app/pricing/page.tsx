import type { Metadata } from 'next';
import { PricingPageClient } from './pricing-client';

export const metadata: Metadata = {
  title: '가격 안내',
  description:
    '합리적인 가격의 맞춤형 웹사이트 제작 패키지. 베이직 300만원부터 프리미엄 맞춤 견적까지.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
