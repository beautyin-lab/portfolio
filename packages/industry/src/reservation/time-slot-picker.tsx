'use client';

import React, { useMemo } from 'react';

interface TimeSlotPickerProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  availableHours?: { start: string; end: string };
  unavailableSlots?: string[];
}

function generateSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  for (let m = startMinutes; m < endMinutes; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
  }
  return slots;
}

export function TimeSlotPicker({
  selectedTime,
  onSelectTime,
  availableHours = { start: '09:00', end: '18:00' },
  unavailableSlots = [],
}: TimeSlotPickerProps) {
  const slots = useMemo(
    () => generateSlots(availableHours.start, availableHours.end),
    [availableHours.start, availableHours.end],
  );

  const unavailableSet = useMemo(() => new Set(unavailableSlots), [unavailableSlots]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => {
          const disabled = unavailableSet.has(slot);
          const isSelected = slot === selectedTime;

          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => onSelectTime(slot)}
              className={`
                py-3 px-2 rounded-lg text-sm font-medium transition-colors
                min-h-[44px]
                ${disabled ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through' : 'hover:bg-blue-50 border border-gray-200 cursor-pointer'}
                ${isSelected ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}
              `}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {slots.length === 0 && (
        <p className="text-center text-gray-500 py-8">선택 가능한 시간이 없습니다.</p>
      )}
    </div>
  );
}
