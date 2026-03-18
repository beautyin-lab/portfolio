'use client';

import * as React from 'react';
import { z } from 'zod';
import { useMockInquiry } from '@portfolio/mock-backend';

const step1Schema = z.object({
  projectName: z.string().min(2, '프로젝트명을 입력해주세요'),
  projectType: z.string().min(1, '프로젝트 유형을 선택해주세요'),
  budget: z.string().min(1, '예산을 선택해주세요'),
  timeline: z.string().min(1, '일정을 선택해주세요'),
});

const step2Schema = z.object({
  description: z.string().min(20, '상세 요구사항을 20자 이상 입력해주세요'),
  features: z.string().optional(),
  references: z.string().optional(),
});

const step3Schema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9-]{9,13}$/, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

interface FormData extends Step1Data, Step2Data, Step3Data {}

export interface EstimateFormProps {
  projectTypes?: string[];
  budgetOptions?: string[];
  timelineOptions?: string[];
  onSuccess?: () => void;
}

const STEP_LABELS = ['프로젝트 정보', '상세 요구사항', '연락처'];

export function EstimateForm({
  projectTypes = ['웹사이트', '모바일 앱', '디자인', '마케팅', '기타'],
  budgetOptions = ['500만원 이하', '500~1000만원', '1000~3000만원', '3000만원 이상', '협의'],
  timelineOptions = ['1개월 이내', '1~3개월', '3~6개월', '6개월 이상', '협의'],
  onSuccess,
}: EstimateFormProps) {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Partial<FormData>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const { submitInquiry, isLoading } = useMockInquiry();

  const update = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  const validateStep = (): boolean => {
    try {
      if (step === 0) step1Schema.parse(formData);
      if (step === 1) step2Schema.parse(formData);
      if (step === 2) step3Schema.parse(formData);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errs: Record<string, string> = {};
        e.issues.forEach((err) => { if (err.path[0]) errs[String(err.path[0])] = err.message; });
        setErrors(errs);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    const d = formData as FormData;
    await submitInquiry({
      customerName: d.name,
      customerPhone: d.phone,
      customerEmail: d.email,
      subject: d.projectName,
      message: `[${d.projectType}] 예산: ${d.budget}, 일정: ${d.timeline}\n${d.description}`,
      type: 'estimate',
    });
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">견적 요청이 접수되었습니다</h3>
        <p className="text-sm text-gray-500">담당자가 1~2 영업일 내 연락드리겠습니다.</p>
      </div>
    );
  }

  const field = (label: string, key: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        value={(formData as Record<string, string>)[key] ?? ''}
        onChange={(e) => update(key, e.target.value)}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
      />
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  const select = (label: string, key: string, options: string[]) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={(formData as Record<string, string>)[key] ?? ''}
        onChange={(e) => update(key, e.target.value)}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
      >
        <option value="">선택해주세요</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i < step ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs ${i === step ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1.5 bg-gray-100 rounded-full mt-1">
          <div
            className="absolute h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="space-y-4">
        {step === 0 && (
          <>
            {field('프로젝트명', 'projectName', { placeholder: '예) 카페 홈페이지 제작' })}
            {select('프로젝트 유형', 'projectType', projectTypes)}
            {select('예산', 'budget', budgetOptions)}
            {select('희망 일정', 'timeline', timelineOptions)}
          </>
        )}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상세 요구사항</label>
              <textarea
                value={(formData.description as string) ?? ''}
                onChange={(e) => update('description', e.target.value)}
                rows={5}
                placeholder="원하시는 내용을 자세히 적어주세요"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주요 기능 목록 (선택)</label>
              <textarea
                value={(formData.features as string) ?? ''}
                onChange={(e) => update('features', e.target.value)}
                rows={3}
                placeholder="예) 회원가입, 예약, 결제 등"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">참고 사이트 (선택)</label>
              <input
                value={(formData.references as string) ?? ''}
                onChange={(e) => update('references', e.target.value)}
                placeholder="https://example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            {field('이름', 'name', { placeholder: '홍길동' })}
            {field('전화번호', 'phone', { placeholder: '010-0000-0000', type: 'tel' })}
            {field('이메일', 'email', { placeholder: 'example@email.com', type: 'email' })}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mt-8">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
        )}
        {step < STEP_LABELS.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            다음
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {isLoading ? '제출 중...' : '견적 요청하기'}
          </button>
        )}
      </div>
    </div>
  );
}
