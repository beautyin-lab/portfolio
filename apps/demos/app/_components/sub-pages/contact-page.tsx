'use client';

import * as React from 'react';
import type { SiteConfig } from '@portfolio/data';

interface ContactPageContentProps {
  config: SiteConfig;
}

export function ContactPageContent({ config }: ContactPageContentProps) {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-green-200 bg-green-50 p-8">
          <h2 className="text-xl font-bold text-gray-900">문의가 접수되었습니다</h2>
          <p className="mt-2 text-sm text-gray-600">빠른 시일 내에 답변드리겠습니다.</p>
          <p className="mt-1 text-xs text-gray-400">(데모 사이트 - 실제 문의가 아닙니다)</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            다시 문의하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">문의하기</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">주소</h3>
              <p className="mt-2 text-gray-900">{config.contact.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">전화번호</h3>
              <a href={`tel:${config.contact.phone}`} className="mt-2 block text-gray-900 hover:text-blue-600">
                {config.contact.phone}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">운영 시간</h3>
              <p className="mt-2 text-gray-900">{config.contact.hours}</p>
            </div>
            {config.contact.kakao && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">카카오톡</h3>
                <p className="mt-2 text-gray-900">{config.contact.kakao}</p>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                placeholder="홍길동"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
              <textarea
                rows={5}
                placeholder="문의하실 내용을 입력해 주세요."
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              문의 보내기
            </button>
            <p className="text-center text-xs text-gray-400">
              데모 사이트입니다. 실제 문의가 접수되지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
