'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      label,
      error,
      value,
      onChange,
      minDate,
      maxDate,
      disabledDates = [],
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (disabledDates.includes(newValue)) return;
        onChange?.(newValue);
      },
      [onChange, disabledDates],
    );

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="date"
            value={value}
            onChange={handleChange}
            min={minDate}
            max={maxDate}
            lang="ko"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
              '[&::-webkit-calendar-picker-indicator]:opacity-60',
              '[&::-webkit-calendar-picker-indicator]:hover:opacity-100',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500',
              className,
            )}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
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
DatePicker.displayName = 'DatePicker';

export { DatePicker, type DatePickerProps };
