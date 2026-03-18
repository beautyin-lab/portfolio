'use client';

import * as React from 'react';

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  isRecommended?: boolean;
}

export interface MembershipPlansProps {
  plans: MembershipPlan[];
  currencySymbol?: string;
  onSelect?: (plan: MembershipPlan) => void;
}

export function MembershipPlans({
  plans,
  currencySymbol = '₩',
  onSelect,
}: MembershipPlansProps) {
  return (
    <div className={`grid gap-4 ${plans.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : plans.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={[
            'relative flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-all duration-200',
            plan.isRecommended
              ? 'border-blue-500 bg-blue-50 shadow-blue-100 shadow-lg'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md',
          ].join(' ')}
        >
          {plan.isRecommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                추천
              </span>
            </div>
          )}

          <div className="mb-4">
            <h3 className={`font-bold text-lg ${plan.isRecommended ? 'text-blue-700' : 'text-gray-900'}`}>
              {plan.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className={`text-3xl font-extrabold ${plan.isRecommended ? 'text-blue-600' : 'text-gray-900'}`}>
                {currencySymbol}{plan.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">/{plan.period}</span>
            </div>
          </div>

          <ul className="flex-1 space-y-2 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.isRecommended ? 'text-blue-500' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => onSelect?.(plan)}
            className={[
              'w-full py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200',
              plan.isRecommended
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
            ].join(' ')}
          >
            선택하기
          </button>
        </div>
      ))}
    </div>
  );
}
