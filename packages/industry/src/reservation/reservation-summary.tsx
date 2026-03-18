'use client';

import React from 'react';
import type { ReservationConfig, ReservationFormData } from './types';

interface ReservationSummaryProps {
  config: ReservationConfig;
  formData: ReservationFormData;
  onEditStep: (stepIndex: number) => void;
}

function SummaryRow({
  label,
  value,
  stepIndex,
  onEdit,
}: {
  label: string;
  value: string;
  stepIndex: number;
  onEdit: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <span className="text-sm text-gray-500">{label}</span>
        <p className="font-medium">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => onEdit(stepIndex)}
        className="text-sm text-blue-600 hover:text-blue-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        수정
      </button>
    </div>
  );
}

export function ReservationSummary({
  config,
  formData,
  onEditStep,
}: ReservationSummaryProps) {
  const rows: { label: string; value: string; step: number }[] = [];

  const { type } = config;

  if (type === 'datetime') {
    rows.push({ label: '날짜', value: formData.date, step: 0 });
    rows.push({ label: '시간', value: formData.time, step: 1 });
    rows.push({ label: '인원', value: `${formData.partySize || 1}명`, step: 2 });
    rows.push({
      label: '예약자 정보',
      value: `${formData.customerName} / ${formData.customerPhone}`,
      step: 3,
    });
  } else if (type === 'datetime-room') {
    rows.push({ label: '체크인', value: formData.date, step: 0 });
    rows.push({ label: '체크아웃', value: formData.checkoutDate || '', step: 1 });
    const room = config.rooms?.find((r) => r.id === formData.roomId);
    rows.push({
      label: '객실',
      value: room ? `${room.name} (${room.price.toLocaleString()}원/박)` : '-',
      step: 2,
    });
    rows.push({
      label: '예약자 정보',
      value: `${formData.customerName} / ${formData.customerPhone}`,
      step: 3,
    });
  } else if (type === 'datetime-staff') {
    rows.push({ label: '진료과목', value: formData.department || '-', step: 0 });
    const staff = config.staff?.find((s) => s.id === formData.staffId);
    rows.push({
      label: '담당 의료진',
      value: staff ? `${staff.name} (${staff.specialty || staff.role})` : '-',
      step: 1,
    });
    rows.push({ label: '날짜', value: formData.date, step: 2 });
    rows.push({ label: '시간', value: formData.time, step: 3 });
    rows.push({
      label: '예약자 정보',
      value: `${formData.customerName} / ${formData.customerPhone}`,
      step: 4,
    });
  } else if (type === 'datetime-service') {
    const selectedServices = config.services?.filter((s) =>
      formData.serviceIds?.includes(s.id),
    );
    const serviceNames = selectedServices?.map((s) => s.name).join(', ') || '-';
    const totalPrice = selectedServices?.reduce((sum, s) => sum + s.price, 0) || 0;
    rows.push({
      label: '서비스',
      value: `${serviceNames} (${totalPrice.toLocaleString()}원)`,
      step: 0,
    });
    if (formData.staffId) {
      const staff = config.staff?.find((s) => s.id === formData.staffId);
      rows.push({
        label: '담당자',
        value: staff ? staff.name : '자동 배정',
        step: 1,
      });
    } else {
      rows.push({ label: '담당자', value: '자동 배정', step: 1 });
    }
    rows.push({ label: '날짜', value: formData.date, step: 2 });
    rows.push({ label: '시간', value: formData.time, step: 3 });
    rows.push({
      label: '예약자 정보',
      value: `${formData.customerName} / ${formData.customerPhone}`,
      step: 4,
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-lg mb-2">예약 정보 확인</h3>
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <SummaryRow
            key={row.label}
            label={row.label}
            value={row.value}
            stepIndex={row.step}
            onEdit={onEditStep}
          />
        ))}
      </div>
    </div>
  );
}
