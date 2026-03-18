'use client';

import * as React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../lib/utils';

export interface StatItem {
  id?: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  icon?: React.ReactNode;
}

export interface StatsCounterProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClass: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

function CountUpNumber({
  value,
  decimals = 0,
  duration = 2,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = React.useState('0');

  React.useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(
          decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
        );
      },
    });
    return () => controls.stop();
  }, [isInView, value, duration, decimals, motionValue]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export function StatsCounter({ stats, columns = 4, className }: StatsCounterProps) {
  return (
    <div className={cn('grid gap-8', colClass[columns] ?? colClass[4], className)}>
      {stats.map((stat, i) => (
        <div
          key={stat.id ?? i}
          className="flex flex-col items-center gap-2 text-center"
        >
          {stat.icon && (
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {stat.icon}
            </div>
          )}
          <div className="text-4xl font-bold text-gray-900 sm:text-5xl">
            <CountUpNumber
              value={stat.value}
              decimals={stat.decimals}
              duration={stat.duration}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </div>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
