'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../primitives/card';
import { Button } from '../primitives/button';

export interface ServiceItem {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  price?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export interface ServiceCardsProps {
  items: ServiceItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const colClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function ServiceCards({ items, columns = 3, className }: ServiceCardsProps) {
  const [visibleItems, setVisibleItems] = React.useState<Set<number>>(new Set());
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]));
            }, i * 100);
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items.length]);

  return (
    <div className={cn('grid gap-6', colClass[columns] ?? colClass[3], className)}>
      {items.map((item, i) => (
        <div
          key={item.id ?? i}
          ref={(el) => { refs.current[i] = el; }}
          className={cn(
            'transition-all duration-500',
            visibleItems.has(i)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0',
          )}
        >
          <Card hoverable className="flex h-full flex-col">
            <CardHeader>
              {item.icon && (
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {item.icon}
                </div>
              )}
              <CardTitle>{item.title}</CardTitle>
              {item.price && (
                <p className="text-lg font-semibold text-blue-600">{item.price}</p>
              )}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <CardDescription className="text-sm leading-relaxed text-gray-600">
                {item.description}
              </CardDescription>
              {item.ctaLabel && (
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={item.onCtaClick}
                    asChild={!item.onCtaClick}
                    className="w-full"
                  >
                    {item.onCtaClick
                      ? item.ctaLabel
                      : <a href={item.ctaHref ?? '#'}>{item.ctaLabel}</a>}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
