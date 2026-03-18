'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoResize?: boolean;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      autoResize = false,
      showCount = false,
      maxLength,
      id,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const textareaId = id || React.useId();
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [charCount, setCharCount] = React.useState(
      () => String(value ?? defaultValue ?? '').length,
    );

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref],
    );

    const adjustHeight = React.useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoResize) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        adjustHeight();
        onChange?.(e);
      },
      [onChange, adjustHeight],
    );

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            autoResize && 'resize-none overflow-hidden',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
            className,
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error && (
            <p
              id={`${textareaId}-error`}
              className="text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
          {showCount && maxLength && (
            <p className="ml-auto text-xs text-gray-400">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };
