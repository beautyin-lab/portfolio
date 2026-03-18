'use client';

import * as React from 'react';
import { Badge } from '@portfolio/ui/primitives/badge';
import { categories, portfolioItems } from '../data/portfolio-data';

const previewCategories = categories.slice(0, 6);

export function PortfolioPreview() {
  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? portfolioItems.filter((item) => item.category === active)
    : portfolioItems.filter((item) =>
        previewCategories.includes(item.category as typeof previewCategories[number]),
      );

  const displayed = filtered.slice(0, 6);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
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
        {previewCategories.map((cat) => (
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

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((item) => (
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
    </div>
  );
}
