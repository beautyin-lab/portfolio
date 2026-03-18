'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../primitives/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../primitives/card';
import { Badge } from '../primitives/badge';

export interface PricingFeature {
  text: string;
  included?: boolean;
}

export interface PricingPlan {
  id?: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
}

export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        plans.length === 2 && 'grid-cols-1 sm:grid-cols-2',
        plans.length === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        plans.length === 4 && 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
        className,
      )}
    >
      {plans.map((plan, i) => (
        <Card
          key={plan.id ?? i}
          className={cn(
            'relative flex flex-col',
            plan.highlighted && 'border-blue-500 ring-2 ring-blue-500 shadow-lg',
          )}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="info" size="sm">
                {plan.badge}
              </Badge>
            </div>
          )}
          <CardHeader className={cn(plan.highlighted && 'bg-blue-50 rounded-t-xl')}>
            <CardTitle className={cn(plan.highlighted && 'text-blue-700')}>
              {plan.name}
            </CardTitle>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-gray-500">/ {plan.period}</span>
              )}
            </div>
            {plan.description && (
              <CardDescription>{plan.description}</CardDescription>
            )}
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-6">
            <ul className="flex flex-col gap-3">
              {plan.features.map((feature, j) => (
                <li
                  key={j}
                  className={cn(
                    'flex items-center gap-2 text-sm',
                    feature.included === false ? 'text-gray-400 line-through' : 'text-gray-700',
                  )}
                >
                  <Check
                    className={cn(
                      'h-4 w-4 shrink-0',
                      feature.included === false ? 'text-gray-300' : 'text-green-500',
                    )}
                  />
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
                onClick={plan.onCtaClick}
                asChild={!plan.onCtaClick}
              >
                {plan.onCtaClick
                  ? (plan.ctaLabel ?? '시작하기')
                  : <a href={plan.ctaHref ?? '#'}>{plan.ctaLabel ?? '시작하기'}</a>}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
