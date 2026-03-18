'use client';

import * as React from 'react';
import { Badge } from '@portfolio/ui/primitives/badge';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';
import { categories, portfolioItems } from '../data/portfolio-data';

export default function PortfolioPage() {
  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? portfolioItems.filter((item) => item.category === active)
    : portfolioItems;

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal preset="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">포트폴리오</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              다양한 업종의 클라이언트와 함께한 프로젝트를 확인하세요.
              각 사이트를 클릭하면 데모를 확인할 수 있습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !active
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <a
                key={item.id}
                href={item.demoUrl}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm">
                      데모 보기
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="info" size="sm">
                      {item.category}
                    </Badge>
                    <Badge variant="default" size="sm">
                      {item.archetype}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">해당 카테고리의 포트폴리오가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
