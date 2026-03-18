'use client';

import * as React from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuBoardProps {
  categories: MenuCategory[];
  currencySymbol?: string;
}

export function MenuBoard({ categories, currencySymbol = '₩' }: MenuBoardProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!categories.length) return null;

  const active = categories[activeIndex];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-200">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveIndex(i)}
            className={[
              'flex-shrink-0 px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200',
              i === activeIndex
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100',
            ].join(' ')}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
        {active.items.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {item.isPopular && (
              <span className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                인기
              </span>
            )}
            {item.imageUrl && (
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
                <span className="flex-shrink-0 font-bold text-blue-600 text-sm">
                  {currencySymbol}{item.price.toLocaleString()}
                </span>
              </div>
              {item.description && (
                <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
