'use client';

import * as React from 'react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryLightboxProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function GalleryLightbox({ images, columns = 3 }: GalleryLightboxProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const touchStartX = React.useRef<number | null>(null);

  const colClass: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  const close = React.useCallback(() => setOpenIndex(null), []);

  const prev = React.useCallback(() => {
    setOpenIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = React.useCallback(() => {
    setOpenIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  React.useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openIndex, close, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <div className={`grid ${colClass[columns]} gap-2 sm:gap-3`}>
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setOpenIndex(i)}
            className="overflow-hidden rounded-lg aspect-square focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={close}
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="이전"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[85vh] mx-12 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            {images[openIndex].caption && (
              <p className="text-white/80 text-sm text-center">{images[openIndex].caption}</p>
            )}
            <p className="text-white/50 text-xs">{openIndex + 1} / {images.length}</p>
          </div>

          {/* Next */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="다음"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
