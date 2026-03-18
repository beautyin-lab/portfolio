'use client';

import React, { useMemo, useState } from 'react';

interface CalendarViewProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  unavailableDates?: string[];
  minDate?: string;
  /** For range selection (checkout) */
  rangeStart?: string;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function CalendarView({
  selectedDate,
  onSelectDate,
  unavailableDates = [],
  minDate,
  rangeStart,
}: CalendarViewProps) {
  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const initialYear = selectedDate
    ? parseDate(selectedDate).getFullYear()
    : today.getFullYear();
  const initialMonth = selectedDate
    ? parseDate(selectedDate).getMonth()
    : today.getMonth();

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);

  const unavailableSet = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  function handlePrev() {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function handleNext() {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDisabled(day: number): boolean {
    const dateStr = formatDate(viewYear, viewMonth, day);
    if (unavailableSet.has(dateStr)) return true;

    const effectiveMin = rangeStart || minDate || todayStr;
    if (dateStr < effectiveMin) return true;

    return false;
  }

  function isInRange(day: number): boolean {
    if (!rangeStart || !selectedDate) return false;
    const dateStr = formatDate(viewYear, viewMonth, day);
    return dateStr > rangeStart && dateStr < selectedDate;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="이전 달"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lg font-semibold">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="다음 달"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-1 ${
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = formatDate(viewYear, viewMonth, day);
          const disabled = isDisabled(day);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const isRangeStart = dateStr === rangeStart;
          const inRange = isInRange(day);

          return (
            <button
              key={dateStr}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm
                min-w-[44px] min-h-[44px] transition-colors
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'}
                ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                ${isRangeStart ? 'bg-blue-400 text-white' : ''}
                ${inRange ? 'bg-blue-100' : ''}
                ${isToday && !isSelected && !isRangeStart ? 'ring-2 ring-blue-400 font-bold' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
