'use client';

import * as React from 'react';
import type { CartItem } from './order-cart';
import type { DeliveryInfoData } from './delivery-info';
import { useMockOrder } from '@portfolio/mock-backend';

export interface OrderConfirmationProps {
  items: CartItem[];
  deliveryInfo: DeliveryInfoData;
  customerName: string;
  customerPhone: string;
  currencySymbol?: string;
  onBack?: () => void;
  onComplete?: () => void;
}

export function OrderConfirmation({
  items,
  deliveryInfo,
  customerName,
  customerPhone,
  currencySymbol = '₩',
  onBack,
  onComplete,
}: OrderConfirmationProps) {
  const [confirmed, setConfirmed] = React.useState(false);
  const { createOrder, isLoading } = useMockOrder();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    await createOrder({
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      customerName,
      customerPhone,
      deliveryAddress: deliveryInfo.method === 'delivery'
        ? [deliveryInfo.address, deliveryInfo.detailAddress].filter(Boolean).join(' ')
        : '픽업',
      totalAmount: total,
    });
    setConfirmed(true);
    onComplete?.();
  };

  if (confirmed) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h3>
        <p className="text-sm text-gray-500 mb-4">데모 주문입니다. 실제 결제는 이루어지지 않습니다.</p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-1">
          <p><span className="text-gray-500">주문자:</span> <span className="font-medium">{customerName}</span></p>
          <p><span className="text-gray-500">연락처:</span> <span className="font-medium">{customerPhone}</span></p>
          <p><span className="text-gray-500">수령방법:</span> <span className="font-medium">{deliveryInfo.method === 'delivery' ? '배달' : '픽업'}</span></p>
          <p><span className="text-gray-500">결제금액:</span> <span className="font-bold text-blue-600">{currencySymbol}{total.toLocaleString()}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md mx-auto">
      <h3 className="font-bold text-gray-900 text-lg mb-4">주문 확인</h3>

      {/* Demo notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
        <p className="text-xs text-amber-700 font-medium">데모 주문입니다. 실제 결제가 이루어지지 않습니다.</p>
      </div>

      {/* Order items summary */}
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{item.name} × {item.quantity}</span>
            <span className="font-medium">{currencySymbol}{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-2 flex justify-between items-center font-bold">
          <span>총 결제금액</span>
          <span className="text-blue-600 text-lg">{currencySymbol}{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Delivery info summary */}
      <div className="bg-gray-50 rounded-xl p-3 text-sm space-y-1 mb-6">
        <p><span className="text-gray-500">수령방법:</span> <span className="font-medium">{deliveryInfo.method === 'delivery' ? '배달' : '픽업'}</span></p>
        {deliveryInfo.method === 'delivery' && deliveryInfo.address && (
          <p><span className="text-gray-500">주소:</span> <span className="font-medium">{deliveryInfo.address} {deliveryInfo.detailAddress}</span></p>
        )}
        {deliveryInfo.request && (
          <p><span className="text-gray-500">요청사항:</span> <span className="font-medium">{deliveryInfo.request}</span></p>
        )}
      </div>

      <div className="flex gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
        )}
        <button
          onClick={handleOrder}
          disabled={isLoading}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {isLoading ? '처리 중...' : '주문하기'}
        </button>
      </div>
    </div>
  );
}
