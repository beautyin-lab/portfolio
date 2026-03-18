'use client';

import React, { useMemo } from 'react';
import type { Service } from './types';

interface ServiceSelectorProps {
  services: Service[];
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  multiSelect?: boolean;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}분`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
}

export function ServiceSelector({
  services,
  selectedServiceIds,
  onToggleService,
  multiSelect = false,
}: ServiceSelectorProps) {
  const categories = useMemo(() => {
    const map = new Map<string, Service[]>();
    for (const svc of services) {
      const cat = svc.category || '전체';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(svc);
    }
    return map;
  }, [services]);

  const selectedSet = useMemo(() => new Set(selectedServiceIds), [selectedServiceIds]);

  const totalPrice = useMemo(
    () =>
      services
        .filter((s) => selectedSet.has(s.id))
        .reduce((sum, s) => sum + s.price, 0),
    [services, selectedSet],
  );

  const totalDuration = useMemo(
    () =>
      services
        .filter((s) => selectedSet.has(s.id))
        .reduce((sum, s) => sum + s.duration, 0),
    [services, selectedSet],
  );

  return (
    <div className="space-y-4">
      {Array.from(categories.entries()).map(([category, items]) => (
        <div key={category}>
          {categories.size > 1 && (
            <h3 className="text-sm font-semibold text-gray-700 mb-2 px-1">{category}</h3>
          )}
          <div className="space-y-2">
            {items.map((service) => {
              const isSelected = selectedSet.has(service.id);

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onToggleService(service.id)}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all
                    min-h-[44px] cursor-pointer
                    ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}
                          `}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{service.name}</span>
                      </div>
                      {service.description && (
                        <p className="text-sm text-gray-500 mt-1 ml-7">{service.description}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-blue-600">
                        {service.price.toLocaleString()}원
                      </div>
                      <div className="text-xs text-gray-400">{formatDuration(service.duration)}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedServiceIds.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              선택된 서비스 {selectedServiceIds.length}개 / 총 {formatDuration(totalDuration)}
            </span>
            <span className="font-bold text-blue-600">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      )}
    </div>
  );
}
