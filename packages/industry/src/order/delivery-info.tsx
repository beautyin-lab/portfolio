'use client';

import * as React from 'react';

export type DeliveryMethod = 'delivery' | 'pickup';

export interface DeliveryInfoData {
  method: DeliveryMethod;
  address?: string;
  detailAddress?: string;
  request?: string;
}

export interface DeliveryInfoProps {
  value: DeliveryInfoData;
  onChange: (data: DeliveryInfoData) => void;
  requestPresets?: string[];
}

export function DeliveryInfo({
  value,
  onChange,
  requestPresets = ['문 앞에 놓아주세요', '경비실에 맡겨주세요', '전화 후 배달해주세요', '직접 입력'],
}: DeliveryInfoProps) {
  const [customRequest, setCustomRequest] = React.useState(false);

  const update = (patch: Partial<DeliveryInfoData>) => onChange({ ...value, ...patch });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
      <h3 className="font-bold text-gray-900 text-sm">수령 방법</h3>

      {/* Method toggle */}
      <div className="grid grid-cols-2 gap-2">
        {(['delivery', 'pickup'] as DeliveryMethod[]).map((m) => (
          <button
            key={m}
            onClick={() => update({ method: m })}
            className={[
              'py-3 rounded-xl border-2 text-sm font-semibold transition-all',
              value.method === m
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300',
            ].join(' ')}
          >
            {m === 'delivery' ? '🛵 배달' : '🏪 픽업'}
          </button>
        ))}
      </div>

      {/* Delivery address */}
      {value.method === 'delivery' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">배달 주소</label>
          <input
            value={value.address ?? ''}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="주소 검색 또는 직접 입력"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={value.detailAddress ?? ''}
            onChange={(e) => update({ detailAddress: e.target.value })}
            placeholder="상세 주소 (동, 호수 등)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Request */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">요청사항</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {requestPresets.map((p) => (
            <button
              key={p}
              onClick={() => {
                if (p === '직접 입력') {
                  setCustomRequest(true);
                  update({ request: '' });
                } else {
                  setCustomRequest(false);
                  update({ request: p });
                }
              }}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                value.request === p && !customRequest
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
        </div>
        {customRequest && (
          <textarea
            value={value.request ?? ''}
            onChange={(e) => update({ request: e.target.value })}
            rows={3}
            placeholder="요청사항을 입력해주세요"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        )}
      </div>
    </div>
  );
}
