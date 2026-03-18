'use client';

import * as React from 'react';
import type { SiteConfig } from '@portfolio/data';

interface GalleryPageContentProps {
  config: SiteConfig;
}

export function GalleryPageContent({ config }: GalleryPageContentProps) {
  const images = config.gallery?.images ?? [];
  const [selectedCategory, setSelectedCategory] = React.useState<string>('전체');
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const categories = React.useMemo(() => {
    const cats = new Set(images.map((img) => img.category).filter(Boolean));
    return ['전체', ...Array.from(cats)] as string[];
  }, [images]);

  const filtered = selectedCategory === '전체'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  if (!images.length) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500">갤러리 이미지가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">{config.gallery?.title || '갤러리'}</h1>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="p-4 text-sm text-white">{img.alt}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              onClick={() => setLightboxIndex(null)}
              aria-label="닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={filtered[lightboxIndex]?.src}
              alt={filtered[lightboxIndex]?.alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 text-center text-sm text-white/70">
              {filtered[lightboxIndex]?.alt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
