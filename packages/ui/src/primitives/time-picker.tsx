'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface TimePickerProps {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  interval?: number;
  minTime?: string;
  maxTime?: string;
  disabledTimes?: string[];
  className?: string;
  disabled?: boolean;
  id?: string;
}

function generateTimeSlots(
  interval: number,
  minTime?: string,
  maxTime?: string,
): string[] {
  const slots: string[] = [];
  const min = minTime ? parseTime(minTime) : 0;
  const max = maxTime ? parseTime(maxTime) : 24 * 60 - interval;

  for (let minutes = min; minutes <= max; minutes += interval) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
  return slots;
}

function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function formatTimeLabel(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${displayH}:${String(m).padStart(2, '0')}`;
}

const TimePicker = React.forwardRef<HTMLSelectElement, TimePickerProps>(
  (
    {
      label,
      error,
      value,
      onChange,
      interval = 30,
      minTime,
      maxTime,
      disabledTimes = [],
      className,
      disabled,
      id,
    },
    ref,
  ) => {
    const selectId = id || React.useId();
    const slots = React.useMemo(
      () => generateTimeSlots(interval, minTime, maxTime),
      [interval, minTime, maxTime],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
      },
      [onChange],
    );

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            'flex h-10 w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E")]',
            'bg-[length:1rem] bg-[position:right_0.5rem_center] bg-no-repeat pr-8',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
            className,
          )}
        >
          <option value="" disabled>
            시간 선택
          </option>
          {slots.map((slot) => (
            <option
              key={slot}
              value={slot}
              disabled={disabledTimes.includes(slot)}
            >
              {formatTimeLabel(slot)}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
TimePicker.displayName = 'TimePicker';

export { TimePicker, type TimePickerProps };
