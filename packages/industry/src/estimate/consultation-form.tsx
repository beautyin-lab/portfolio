'use client';

import * as React from 'react';
import { z } from 'zod';
import { useMockInquiry } from '@portfolio/mock-backend';

const schema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9-]{9,13}$/, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  field: z.string().min(1, '상담 분야를 선택해주세요'),
  message: z.string().min(10, '상담 내용을 10자 이상 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

export interface ConsultationFormProps {
  consultationFields?: string[];
  onSuccess?: () => void;
}

export function ConsultationForm({
  consultationFields = ['일반 상담', '서비스 문의', '가격 문의', '제휴 문의', '기타'],
  onSuccess,
}: ConsultationFormProps) {
  const [data, setData] = React.useState<Partial<FormData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const { submitInquiry, isLoading } = useMockInquiry();

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) errs[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(errs);
      return;
    }
    const d = result.data;
    await submitInquiry({
      customerName: d.name,
      customerPhone: d.phone,
      customerEmail: d.email,
      subject: d.field,
      message: d.message,
      type: 'consultation',
    });
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 mb-1">상담 예약이 완료되었습니다</h3>
        <p className="text-sm text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
      </div>
    );
  }

  const inputClass = (key: keyof FormData) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg mx-auto space-y-4">
      <h3 className="font-bold text-gray-900 text-lg mb-2">상담 예약</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input value={data.name ?? ''} onChange={(e) => update('name', e.target.value)} placeholder="홍길동" className={inputClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input value={data.phone ?? ''} onChange={(e) => update('phone', e.target.value)} placeholder="010-0000-0000" type="tel" className={inputClass('phone')} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
        <input value={data.email ?? ''} onChange={(e) => update('email', e.target.value)} placeholder="example@email.com" type="email" className={inputClass('email')} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">상담 분야</label>
        <select value={data.field ?? ''} onChange={(e) => update('field', e.target.value)} className={inputClass('field')}>
          <option value="">선택해주세요</option>
          {consultationFields.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        {errors.field && <p className="mt-1 text-xs text-red-500">{errors.field}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">상담 내용</label>
        <textarea
          value={data.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          rows={4}
          placeholder="궁금하신 내용을 적어주세요"
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {isLoading ? '제출 중...' : '상담 예약하기'}
      </button>
    </form>
  );
}
