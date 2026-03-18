'use client';

import * as React from 'react';

export interface PriceItem {
  name: string;
  price: number;
  note?: string;
}

export interface PriceCategory {
  name: string;
  items: PriceItem[];
}

export interface PriceListProps {
  categories: PriceCategory[];
  currencySymbol?: string;
}

export function PriceList({ categories, currencySymbol = '₩' }: PriceListProps) {
  return (
    <div className="w-full space-y-8">
      {categories.map((cat) => (
        <div key={cat.name}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
            {cat.name}
          </h3>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <tbody>
                {cat.items.map((item, i) => (
                  <tr
                    key={item.name}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      {item.note && (
                        <span className="ml-2 text-xs text-gray-400">{item.note}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-blue-600">
                        {currencySymbol}{item.price.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
