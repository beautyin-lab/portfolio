'use client';

import * as React from 'react';
import type { Property } from './property-card';
import { PropertyCard } from './property-card';
import { FilterSidebar } from './filter-sidebar';
import type { PropertyFilters } from './filter-sidebar';

export interface PropertySearchProps {
  properties: Property[];
}

type SortKey = 'latest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

const DEFAULT_FILTERS: PropertyFilters = {
  dealTypes: [],
  propertyTypes: [],
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,
};

export function PropertySearch({ properties }: PropertySearchProps) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState<PropertyFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>('latest');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    let result = properties.filter((p) => {
      if (query && !p.title.includes(query) && !p.location.includes(query)) return false;
      if (filters.dealTypes.length > 0 && !filters.dealTypes.includes(p.dealType)) return false;
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.type)) return false;
      if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && p.price > filters.maxPrice) return false;
      if (filters.minArea > 0 && p.area < filters.minArea) return false;
      if (filters.maxArea > 0 && p.area > filters.maxArea) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'area-asc') return a.area - b.area;
      if (sort === 'area-desc') return b.area - a.area;
      return b.registeredAt.localeCompare(a.registeredAt);
    });

    return result;
  }, [properties, query, filters, sort]);

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="지역, 건물명 검색"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M10 12h4" />
          </svg>
          필터
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-500">
              총 <span className="font-semibold text-gray-900">{filtered.length}</span>개
            </p>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">최신순</option>
                <option value="price-asc">가격 낮은순</option>
                <option value="price-desc">가격 높은순</option>
                <option value="area-asc">면적 작은순</option>
                <option value="area-desc">면적 큰순</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  aria-label="그리드 보기"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3zm10 0h8v8h-8zm0 10h8v8h-8zM3 13h8v8H3z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1.5 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  aria-label="리스트 보기"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">검색 결과가 없습니다.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
