'use client';

import * as React from 'react';
import type { DealType, PropertyType } from './property-card';

export interface PropertyFilters {
  dealTypes: DealType[];
  propertyTypes: PropertyType[];
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

export interface FilterSidebarProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onReset: () => void;
}

const DEAL_TYPES: DealType[] = ['매매', '전세', '월세'];
const PROPERTY_TYPES: PropertyType[] = ['아파트', '오피스텔', '원룸', '투룸', '빌라', '상가', '사무실'];

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const toggleDealType = (dt: DealType) => {
    const next = filters.dealTypes.includes(dt)
      ? filters.dealTypes.filter((d) => d !== dt)
      : [...filters.dealTypes, dt];
    onChange({ ...filters, dealTypes: next });
  };

  const togglePropertyType = (pt: PropertyType) => {
    const next = filters.propertyTypes.includes(pt)
      ? filters.propertyTypes.filter((p) => p !== pt)
      : [...filters.propertyTypes, pt];
    onChange({ ...filters, propertyTypes: next });
  };

  return (
    <aside className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-900">필터</h3>
        <button onClick={onReset} className="text-xs text-blue-600 hover:underline">
          초기화
        </button>
      </div>

      {/* Deal Type */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">거래 유형</p>
        <div className="flex flex-wrap gap-2">
          {DEAL_TYPES.map((dt) => (
            <button
              key={dt}
              onClick={() => toggleDealType(dt)}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-150',
                filters.dealTypes.includes(dt)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400',
              ].join(' ')}
            >
              {dt}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">가격 (만원)</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
              placeholder="최소"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400 text-sm">~</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              placeholder="최대"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Area */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">면적 (m²)</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minArea}
            onChange={(e) => onChange({ ...filters, minArea: Number(e.target.value) })}
            placeholder="최소"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400 text-sm">~</span>
          <input
            type="number"
            value={filters.maxArea}
            onChange={(e) => onChange({ ...filters, maxArea: Number(e.target.value) })}
            placeholder="최대"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">매물 유형</p>
        <div className="space-y-1.5">
          {PROPERTY_TYPES.map((pt) => (
            <label key={pt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(pt)}
                onChange={() => togglePropertyType(pt)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{pt}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
