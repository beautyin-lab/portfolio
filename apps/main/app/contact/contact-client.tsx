'use client';

import * as React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@portfolio/ui/primitives/button';
import { Input } from '@portfolio/ui/primitives/input';
import { Textarea } from '@portfolio/ui/primitives/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@portfolio/ui/primitives/select';
import { MapEmbed } from '@portfolio/ui/composites/map-embed';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';
import { toast } from '@portfolio/ui/primitives/toast';
import { submitInquiry } from './actions';

const industries = [
  '의료/병원',
  '법률',
  '펜션/숙박',
  '웰니스/스파',
  '헬스/피트니스',
  '펫/키즈',
  '뷰티/미용',
  '카페/음료',
  '부동산',
  '웨딩',
  '인테리어',
  '꽃집',
  '학원/교육',
  '식당/레스토랑',
  '쇼핑몰',
  '기타',
];

const budgets = [
  '300만원 이하',
  '300만원 ~ 500만원',
  '500만원 ~ 800만원',
  '800만원 이상',
  '미정 (상담 희망)',
];

const contactInfoItems = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: '전화',
    value: '1588-0000',
    href: 'tel:1588-0000',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: '이메일',
    value: 'contact@webstudio.kr',
    href: 'mailto:contact@webstudio.kr',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: '주소',
    value: '서울특별시 강남구 테헤란로 123, 4층',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: '영업시간',
    value: '평일 09:00 - 18:00',
  },
];

export function ContactPageClient() {
  const [pending, setPending] = React.useState(false);
  const [industry, setIndustry] = React.useState('');
  const [budget, setBudget] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    formData.set('industry', industry);
    formData.set('budget', budget);

    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        toast({
          title: '문의가 접수되었습니다',
          description: '빠른 시일 내에 답변 드리겠습니다.',
          variant: 'success',
        });
        formRef.current?.reset();
        setIndustry('');
        setBudget('');
      }
    } catch {
      toast({
        title: '전송에 실패했습니다',
        description: '잠시 후 다시 시도해 주세요.',
        variant: 'error',
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal preset="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">문의하기</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              프로젝트에 대해 알려주세요. 맞춤 견적과 제작 방향을 안내해 드리겠습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact Info + Map */}
            <div className="flex flex-col gap-8">
              <ScrollReveal preset="fade-up">
                <h2 className="text-2xl font-bold text-gray-900">연락처 정보</h2>
                <div className="mt-6 flex flex-col gap-5">
                  {contactInfoItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal preset="fade-up">
                <MapEmbed
                  address="서울특별시 강남구 테헤란로 123, 4층"
                  height={300}
                  mapsUrl="https://map.naver.com/"
                />
              </ScrollReveal>
            </div>

            {/* Right: Contact Form */}
            <ScrollReveal preset="fade-up">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">문의 폼</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="name"
                      label="이름"
                      placeholder="홍길동"
                      required
                    />
                    <Input
                      name="company"
                      label="회사명 / 상호명"
                      placeholder="웹스튜디오"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="phone"
                      label="전화번호"
                      type="tel"
                      placeholder="010-0000-0000"
                      required
                    />
                    <Input
                      name="email"
                      label="이메일"
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">업종</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="업종을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">예산</label>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger>
                          <SelectValue placeholder="예산을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Textarea
                    name="message"
                    label="문의 내용"
                    placeholder="프로젝트에 대해 자유롭게 작성해 주세요. (원하는 기능, 참고 사이트, 일정 등)"
                    rows={5}
                    required
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={pending}>
                    {pending ? '전송 중...' : '문의하기'}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
