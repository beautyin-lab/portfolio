'use client';

import * as React from 'react';

export type PropertyType = '아파트' | '오피스텔' | '원룸' | '투룸' | '빌라' | '상가' | '사무실';
export type DealType = '매매' | '전세' | '월세';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  dealType: DealType;
  price: number;
  deposit?: number; // 월세일 때 보증금
  area: number; // m²
  floor?: string;
  location: string;
  imageUrl?: string;
  tags?: string[];
  registeredAt: string;
}

export interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
  onClick?: (property: Property) => void;
}

function formatPrice(price: number): string {
  if (price >= 10000) {
    const eok = Math.floor(price / 10000);
    const man = price % 10000;
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만` : `${eok}억`;
  }
  return `${price.toLocaleString()}만`;
}

export function PropertyCard({ property, viewMode = 'grid', onClick }: PropertyCardProps) {
  const priceDisplay =
    property.dealType === '월세'
      ? `${formatPrice(property.deposit ?? 0)} / ${property.price.toLocaleString()}만`
      : formatPrice(property.price);

  if (viewMode === 'list') {
    return (
      <div
        className={`flex gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${onClick ? 'cursor-pointer hover:shadow-md' : ''} transition-shadow duration-200`}
        onClick={() => onClick?.(property)}
      >
        {property.imageUrl && (
          <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
            <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded mr-1">
                {property.dealType}
              </span>
              <span className="text-xs text-gray-500">{property.type}</span>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{property.registeredAt}</span>
          </div>
          <p className="mt-1 font-bold text-gray-900 text-sm truncate">{property.title}</p>
          <p className="text-base font-extrabold text-blue-600 mt-0.5">{priceDisplay}</p>
          <div className="mt-1 flex gap-3 text-xs text-gray-500">
            <span>{property.area}m²</span>
            {property.floor && <span>{property.floor}</span>}
            <span>{property.location}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} transition-shadow duration-200`}
      onClick={() => onClick?.(property)}
    >
      <div className="relative w-full h-44 bg-gray-100">
        {property.imageUrl ? (
          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
        <span className="absolute top-2 left-2 text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
          {property.dealType}
        </span>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
          <span>{property.type}</span>
          <span>{property.registeredAt}</span>
        </div>
        <p className="font-semibold text-gray-900 text-sm truncate">{property.title}</p>
        <p className="text-lg font-extrabold text-blue-600 mt-1">{priceDisplay}</p>
        <div className="mt-1.5 flex gap-2 text-xs text-gray-500">
          <span>{property.area}m²</span>
          {property.floor && <span>·</span>}
          {property.floor && <span>{property.floor}</span>}
          <span>·</span>
          <span className="truncate">{property.location}</span>
        </div>
        {property.tags && property.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {property.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
