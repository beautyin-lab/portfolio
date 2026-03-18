'use client';

import * as React from 'react';
import { z } from 'zod';
import { useMockInquiry } from '@portfolio/mock-backend';

const schema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9-]{9,13}$/, '전화번호를 확인해주세요'),
  message: z.string().min(5, '메시지를 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

export interface QuickInquiryProps {
  title?: string;
  placeholder?: string;
  className?: string;
  onSuccess?: () => void;
}

export function QuickInquiry({
  title = '간편 문의',
  placeholder = '문의 내용을 간단히 입력해주세요',
  className = '',
  onSuccess,
}: QuickInquiryProps) {
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
      customerEmail: '',
      subject: '간편 문의',
      message: d.message,
      type: 'general',
    });
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center ${className}`}>
        <p className="text-sm font-semibold text-green-600">문의가 접수되었습니다!</p>
        <p className="text-xs text-gray-400 mt-1">빠른 시일 내 연락드리겠습니다.</p>
      </div>
    );
  }

  const inputClass = (key: keyof FormData) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3 ${className}`}>
      {title && <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input value={data.name ?? ''} onChange={(e) => update('name', e.target.value)} placeholder="이름" className={inputClass('name')} />
          {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <input value={data.phone ?? ''} onChange={(e) => update('phone', e.target.value)} placeholder="전화번호" type="tel" className={inputClass('phone')} />
          {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <textarea
          value={data.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          rows={3}
          placeholder={placeholder}
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-0.5 text-xs text-red-500">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {isLoading ? '전송 중...' : '문의하기'}
      </button>
    </form>
  );
}
