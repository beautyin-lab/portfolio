'use client';

import * as React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export interface MapEmbedProps {
  src?: string;
  address?: string;
  height?: number | string;
  mapsUrl?: string;
  title?: string;
  className?: string;
}

export function MapEmbed({
  src,
  address,
  height = 400,
  mapsUrl,
  title = '위치 지도',
  className,
}: MapEmbedProps) {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        className="relative w-full overflow-hidden rounded-xl bg-gray-100"
        style={{ height: heightStyle }}
      >
        {src ? (
          <iframe
            src={src}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-gray-400">
            <MapPin className="h-12 w-12" />
            <p className="text-sm">{address ?? '지도가 여기에 표시됩니다'}</p>
          </div>
        )}
      </div>

      {(address || mapsUrl) && (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
          {address && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
              <span>{address}</span>
            </div>
          )}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              지도 보기
            </a>
          )}
        </div>
      )}
    </div>
  );
}
