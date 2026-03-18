'use client';

import React from 'react';
import type { ReservationFormData } from './types';

interface ReservationConfirmProps {
  formData: ReservationFormData;
  onGoHome: () => void;
}

export function ReservationConfirm({ formData, onGoHome }: ReservationConfirmProps) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-2">예약이 완료되었습니다</h2>
      <p className="text-gray-500 mb-6">
        예약 확인 정보가 아래에 표시됩니다.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 text-left max-w-sm mx-auto mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">예약자</span>
          <span className="font-medium">{formData.customerName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">연락처</span>
          <span className="font-medium">{formData.customerPhone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">날짜</span>
          <span className="font-medium">{formData.date}</span>
        </div>
        {formData.time && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">시간</span>
            <span className="font-medium">{formData.time}</span>
          </div>
        )}
        {formData.checkoutDate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">체크아웃</span>
            <span className="font-medium">{formData.checkoutDate}</span>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 max-w-sm mx-auto mb-6">
        이 데모에서 예약 데이터는 브라우저에만 저장됩니다.
      </div>

      <button
        type="button"
        onClick={onGoHome}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors min-h-[44px]"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
