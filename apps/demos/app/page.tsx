'use client';

import Link from 'next/link';
import { getAllSites, getAllCategories } from '@portfolio/data';
import { useState } from 'react';

const CATEGORY_LABELS: Record<string, string> = {
  medical: '의료',
  legal: '법률',
  pension: '펜션/숙박',
  wellness: '웰니스',
  fitness: '헬스장/피트니스',
  'pet-kids': '펫/키즈',
  beauty: '뷰티',
  cafe: '카페/베이커리',
  realty: '부동산',
  wedding: '웨딩',
  'study-cafe': '스터디카페',
  interior: '인테리어',
  flower: '꽃집/플라워',
  education: '학원/교육',
  restaurant: '식당/맛집',
};

const ARCHETYPE_LABELS: Record<string, string> = {
  'AT-01': 'Editorial Magazine',
  'AT-02': 'Immersive Showcase',
  'AT-03': 'Professional Trust',
  'AT-04': 'Dynamic Energy',
  'AT-05': 'Soft & Organic',
  'AT-06': 'Playful Interactive',
  'AT-07': 'Minimal Gallery',
  'AT-08': 'Warm Storytelling',
  'AT-09': 'Data-Driven Dashboard',
  'AT-10': 'Bold Contrast',
};

export default function DemosIndexPage() {
  const sites = getAllSites();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? sites
    : sites.filter((s: any) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">데모 사이트 목록</h1>
          <p className="mt-2 text-gray-600">15개 카테고리 × 2개 = 30개 데모 사이트</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({sites.length})
            </button>
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Site Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site: any) => (
            <Link
              key={site.slug}
              href={`/${site.category}/${site.slug}`}
              className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-gray-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {site.hero?.images?.[0] ? (
                  <img
                    src={site.hero.images[0]}
                    alt={site.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {/* Category Badge */}
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                  {CATEGORY_LABELS[site.category] || site.category}
                </span>
                {/* Archetype Badge */}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
                  {site.archetype}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {site.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {ARCHETYPE_LABELS[site.archetype] || site.archetype}
                </p>
                {site.hero?.subtitle && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {site.hero.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        <p>이 페이지의 모든 사이트는 포트폴리오 데모입니다.</p>
      </footer>
    </div>
  );
}
