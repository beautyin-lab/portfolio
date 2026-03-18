'use client';

import * as React from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface OrderCartProps {
  items: CartItem[];
  currencySymbol?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClearAll?: () => void;
}

export function OrderCart({
  items,
  currencySymbol = '₩',
  onUpdateQuantity,
  onRemove,
  onClearAll,
}: OrderCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <svg className="w-12 h-12 mx-auto text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-sm text-gray-400">장바구니가 비어있습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">장바구니 ({items.length})</h3>
        {onClearAll && (
          <button onClick={onClearAll} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
            전체 삭제
          </button>
        )}
      </div>

      <ul className="divide-y divide-gray-50">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 p-4">
            {item.imageUrl && (
              <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
              <p className="text-sm text-blue-600 font-bold mt-0.5">
                {currencySymbol}{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
                aria-label="삭제"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-600 font-medium">합계</span>
        <span className="text-lg font-extrabold text-gray-900">
          {currencySymbol}{total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
