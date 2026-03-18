'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMockReservation } from '@portfolio/mock-backend';
import type { ReservationConfig, ReservationFormData, StepDefinition } from './types';
import { CalendarView } from './calendar-view';
import { TimeSlotPicker } from './time-slot-picker';
import { RoomSelector } from './room-selector';
import { StaffSelector } from './staff-selector';
import { ServiceSelector } from './service-selector';
import { ReservationSummary } from './reservation-summary';
import { ReservationConfirm } from './reservation-confirm';

interface ReservationWidgetProps {
  config: ReservationConfig;
  onComplete?: () => void;
}

const DEPARTMENTS = ['내과', '외과', '정형외과', '피부과', '치과', '안과', '이비인후과'];

function getSteps(type: ReservationConfig['type']): StepDefinition[] {
  switch (type) {
    case 'datetime':
      return [
        { id: 'date', label: '날짜 선택' },
        { id: 'time', label: '시간 선택' },
        { id: 'party', label: '인원 선택' },
        { id: 'info', label: '예약자 정보' },
        { id: 'summary', label: '확인' },
      ];
    case 'datetime-room':
      return [
        { id: 'checkin', label: '체크인 날짜' },
        { id: 'checkout', label: '체크아웃 날짜' },
        { id: 'room', label: '객실 선택' },
        { id: 'info', label: '예약자 정보' },
        { id: 'summary', label: '확인' },
      ];
    case 'datetime-staff':
      return [
        { id: 'department', label: '진료과목' },
        { id: 'staff', label: '의료진 선택' },
        { id: 'date', label: '날짜 선택' },
        { id: 'time', label: '시간 선택' },
        { id: 'info', label: '예약자 정보' },
        { id: 'summary', label: '확인' },
      ];
    case 'datetime-service':
      return [
        { id: 'service', label: '서비스 선택' },
        { id: 'staff', label: '담당자 선택' },
        { id: 'date', label: '날짜 선택' },
        { id: 'time', label: '시간 선택' },
        { id: 'info', label: '예약자 정보' },
        { id: 'summary', label: '확인' },
      ];
  }
}

const initialFormData: ReservationFormData = {
  date: '',
  time: '',
  checkoutDate: '',
  partySize: 2,
  roomId: '',
  staffId: '',
  serviceIds: [],
  department: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  notes: '',
};

export function ReservationWidget({ config, onComplete }: ReservationWidgetProps) {
  const { createReservation, isLoading } = useMockReservation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ReservationFormData>(initialFormData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState(1);

  const steps = useMemo(() => getSteps(config.type), [config.type]);
  const totalSteps = steps.length;

  const updateForm = useCallback(
    <K extends keyof ReservationFormData>(key: K, value: ReservationFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const canProceed = useMemo(() => {
    const step = steps[currentStep];
    if (!step) return false;

    switch (step.id) {
      case 'date':
      case 'checkin':
        return !!formData.date;
      case 'checkout':
        return !!formData.checkoutDate;
      case 'time':
        return !!formData.time;
      case 'party':
        return (formData.partySize ?? 0) > 0;
      case 'room':
        return !!formData.roomId;
      case 'staff':
        return config.type === 'datetime-service' ? true : !!formData.staffId;
      case 'service':
        return (formData.serviceIds?.length ?? 0) > 0;
      case 'department':
        return !!formData.department;
      case 'info':
        return !!formData.customerName.trim() && !!formData.customerPhone.trim();
      case 'summary':
        return true;
      default:
        return false;
    }
  }, [currentStep, steps, formData, config.type]);

  function goNext() {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }

  function goToStep(step: number) {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }

  async function handleSubmit() {
    const serviceType = config.type === 'datetime-service'
      ? config.services
          ?.filter((s) => formData.serviceIds?.includes(s.id))
          .map((s) => s.name)
          .join(', ') || config.type
      : config.type;

    await createReservation({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      reservationDate: formData.date,
      reservationTime: formData.time,
      serviceType,
      staffId: formData.staffId || undefined,
      roomId: formData.roomId || undefined,
      partySize: formData.partySize,
      notes: formData.notes || undefined,
    });

    setIsCompleted(true);
  }

  function handleGoHome() {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsCompleted(false);
    onComplete?.();
  }

  function handleToggleService(serviceId: string) {
    setFormData((prev) => {
      const ids = prev.serviceIds || [];
      const next = ids.includes(serviceId)
        ? ids.filter((id) => id !== serviceId)
        : [...ids, serviceId];
      return { ...prev, serviceIds: next };
    });
  }

  if (isCompleted) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <ReservationConfirm formData={formData} onGoHome={handleGoHome} />
      </div>
    );
  }

  const stepId = steps[currentStep]?.id;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${i < currentStep ? 'bg-blue-600 text-white' : ''}
                  ${i === currentStep ? 'bg-blue-600 text-white ring-4 ring-blue-200' : ''}
                  ${i > currentStep ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {i < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 mx-1 ${
                    i < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">{steps[currentStep]?.label}</p>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={stepId}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {stepId === 'date' || stepId === 'checkin' ? (
            <CalendarView
              selectedDate={formData.date}
              onSelectDate={(d) => updateForm('date', d)}
              unavailableDates={config.unavailableDates}
            />
          ) : stepId === 'checkout' ? (
            <CalendarView
              selectedDate={formData.checkoutDate || ''}
              onSelectDate={(d) => updateForm('checkoutDate', d)}
              unavailableDates={config.unavailableDates}
              rangeStart={formData.date}
            />
          ) : stepId === 'time' ? (
            <TimeSlotPicker
              selectedTime={formData.time}
              onSelectTime={(t) => updateForm('time', t)}
              availableHours={config.availableHours}
            />
          ) : stepId === 'party' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">인원 수</label>
              <div className="flex items-center gap-4 justify-center">
                <button
                  type="button"
                  onClick={() =>
                    updateForm('partySize', Math.max(1, (formData.partySize ?? 2) - 1))
                  }
                  className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:border-blue-400 transition-colors"
                >
                  -
                </button>
                <span className="text-3xl font-bold w-16 text-center">
                  {formData.partySize ?? 2}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateForm('partySize', Math.min(20, (formData.partySize ?? 2) + 1))
                  }
                  className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:border-blue-400 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">최대 20명</p>
            </div>
          ) : stepId === 'room' ? (
            <RoomSelector
              rooms={config.rooms || []}
              selectedRoomId={formData.roomId}
              onSelectRoom={(id) => updateForm('roomId', id)}
            />
          ) : stepId === 'department' ? (
            <div className="grid grid-cols-2 gap-3">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => updateForm('department', dept)}
                  className={`
                    py-4 px-3 rounded-xl border-2 text-sm font-medium transition-all
                    min-h-[44px] cursor-pointer
                    ${formData.department === dept ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  {dept}
                </button>
              ))}
            </div>
          ) : stepId === 'staff' ? (
            <StaffSelector
              staff={config.staff || []}
              selectedStaffId={formData.staffId}
              onSelectStaff={(id) => updateForm('staffId', id)}
              optional={config.type === 'datetime-service'}
            />
          ) : stepId === 'service' ? (
            <ServiceSelector
              services={config.services || []}
              selectedServiceIds={formData.serviceIds || []}
              onToggleService={handleToggleService}
              multiSelect
            />
          ) : stepId === 'info' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => updateForm('customerName', e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => updateForm('customerPhone', e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => updateForm('customerEmail', e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateForm('notes', e.target.value)}
                  placeholder="요청사항을 입력하세요"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
                />
              </div>
            </div>
          ) : stepId === 'summary' ? (
            <ReservationSummary
              config={config}
              formData={formData}
              onEditStep={goToStep}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentStep === 0}
          className={`
            px-5 py-3 rounded-xl font-medium transition-colors min-h-[44px]
            ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}
          `}
        >
          이전
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed}
            className={`
              px-6 py-3 rounded-xl font-medium transition-colors min-h-[44px]
              ${canProceed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors min-h-[44px] disabled:opacity-50"
          >
            {isLoading ? '처리 중...' : '예약하기'}
          </button>
        )}
      </div>
    </div>
  );
}
