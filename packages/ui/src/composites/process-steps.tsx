'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface ProcessStep {
  id?: string;
  step?: number;
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ProcessSteps({
  steps,
  orientation = 'horizontal',
  className,
}: ProcessStepsProps) {
  const [visibleSteps, setVisibleSteps] = React.useState<Set<number>>(new Set());
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps((prev) => new Set([...prev, i])), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  if (orientation === 'vertical') {
    return (
      <div className={cn('flex flex-col gap-0', className)}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div
              key={step.id ?? i}
              ref={(el) => { refs.current[i] = el; }}
              className={cn(
                'flex gap-4 transition-all duration-500',
                visibleSteps.has(i) ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
              )}
            >
              {/* Step indicator + connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-50 text-blue-600 font-bold text-sm">
                  {step.icon ?? (step.step ?? i + 1)}
                </div>
                {!isLast && <div className="mt-1 flex-1 w-0.5 bg-blue-100 min-h-[2rem]" />}
              </div>

              {/* Content */}
              <div className={cn('pb-8', isLast && 'pb-0')}>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                {step.description && (
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div
      className={cn(
        'flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-0',
        className,
      )}
    >
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div
            key={step.id ?? i}
            ref={(el) => { refs.current[i] = el; }}
            className={cn(
              'relative flex flex-1 flex-col items-center text-center transition-all duration-500',
              visibleSteps.has(i) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
          >
            {/* Connector line */}
            {!isLast && (
              <div className="absolute left-1/2 top-5 hidden h-0.5 w-full bg-blue-100 sm:block" />
            )}

            {/* Step circle */}
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-blue-600 font-bold text-sm">
              {step.icon ?? (step.step ?? i + 1)}
            </div>

            {/* Content */}
            <div className="mt-3 px-2">
              <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
              {step.description && (
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
