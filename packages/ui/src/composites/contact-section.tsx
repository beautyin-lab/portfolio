'use client';

import * as React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';
import { Textarea } from '../primitives/textarea';

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export interface ContactSectionProps {
  contactInfo?: ContactInfo;
  showForm?: boolean;
  showMap?: boolean;
  mapSrc?: string;
  onSubmit?: (data: { name: string; phone: string; message: string }) => void;
  className?: string;
}

export function ContactSection({
  contactInfo,
  showForm = true,
  showMap = true,
  mapSrc,
  onSubmit,
  className,
}: ContactSectionProps) {
  const [formData, setFormData] = React.useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className={cn('grid gap-8 lg:grid-cols-2', className)}>
      {/* Contact Info + Map */}
      <div className="flex flex-col gap-6">
        {contactInfo && (
          <div className="flex flex-col gap-4">
            {contactInfo.phone && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">전화</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">이메일</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            )}
            {contactInfo.address && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">주소</p>
                  <p className="text-sm font-semibold text-gray-900">{contactInfo.address}</p>
                </div>
              </div>
            )}
            {contactInfo.hours && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">영업시간</p>
                  <p className="text-sm font-semibold text-gray-900">{contactInfo.hours}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {showMap && (
          <div className="h-64 overflow-hidden rounded-xl bg-gray-100 lg:flex-1">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="지도"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="mx-auto h-10 w-10 mb-2" />
                  <p className="text-sm">지도가 여기에 표시됩니다</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">간편 문의</h3>
          {submitted ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">문의가 접수되었습니다!</p>
              <p className="text-sm text-gray-500">빠른 시일 내에 답변 드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="이름"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <Input
                label="연락처"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                required
              />
              <Textarea
                label="문의 내용"
                placeholder="문의하실 내용을 입력해 주세요."
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                rows={4}
                required
              />
              <Button type="submit" size="lg" className="w-full">
                문의하기
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
