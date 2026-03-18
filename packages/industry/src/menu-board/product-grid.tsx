'use client';

import * as React from 'react';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
}

export interface ProductGridProps {
  products: Product[];
  columns?: 1 | 2 | 3 | 4;
  currencySymbol?: string;
  onSelect?: (product: Product) => void;
}

const colClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

export function ProductGrid({
  products,
  columns = 3,
  currencySymbol = '₩',
  onSelect,
}: ProductGridProps) {
  return (
    <div className={`grid ${colClass[columns]} gap-4`}>
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelect?.(product)}
          className={[
            'group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden',
            onSelect ? 'cursor-pointer' : '',
            'hover:shadow-lg transition-shadow duration-200',
          ].join(' ')}
        >
          <div className="overflow-hidden aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
            {product.description && (
              <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{product.description}</p>
            )}
            <p className="mt-1 font-bold text-blue-600 text-sm">
              {currencySymbol}{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
