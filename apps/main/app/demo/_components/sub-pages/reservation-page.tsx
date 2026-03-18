'use client';

import * as React from 'react';
import type { SiteConfig } from '@portfolio/data';

interface ReservationPageContentProps {
  config: SiteConfig;
}

export function ReservationPageContent({ config }: ReservationPageContentProps) {
  const [selectedStaff, setSelectedStaff] = React.useState('');
  const [selectedService, setSelectedService] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const reservation = config.reservation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-green-200 bg-green-50 p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">예약이 완료되었습니다</h2>
          <p className="mt-2 text-sm text-gray-600">
            확인 연락을 드리겠습니다. 감사합니다.
          </p>
          <p className="mt-1 text-xs text-gray-400">(데모 사이트 - 실제 예약이 아닙니다)</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            다시 예약하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">예약하기</h1>
        <p className="mt-2 text-gray-600">{config.name}에 방문 예약을 해주세요.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Staff Selection */}
          {reservation?.staff && reservation.staff.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">담당자 선택</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {reservation.staff.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStaff(s.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      selectedStaff === s.id
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="mt-0.5 text-xs text-gray-500">{s.specialty}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Service Selection */}
          {reservation?.services && reservation.services.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">서비스 선택</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {reservation.services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      selectedService === s.id
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="mt-0.5 text-xs text-gray-500">{s.duration}분 소요</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시간</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">시간을 선택하세요</option>
                {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                  '16:00', '16:30', '17:00', '17:30', '18:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            예약 신청하기
          </button>
          <p className="text-center text-xs text-gray-400">
            데모 사이트입니다. 실제 예약이 접수되지 않습니다.
          </p>
        </form>
      </div>
    </div>
  );
}
