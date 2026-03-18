'use client';

import * as React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../primitives/carousel';

export interface GalleryImage {
  src: string;
  alt?: string;
  category?: string;
}

export interface GalleryGridProps {
  images: GalleryImage[];
  variant?: 'grid' | 'masonry' | 'carousel';
  categories?: string[];
  className?: string;
}

export function GalleryGrid({
  images,
  variant = 'grid',
  categories = [],
  className,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const filtered = activeCategory
    ? images.filter((img) => img.category === activeCategory)
    : images;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length,
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filtered.length,
    );

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              !activeCategory
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Carousel variant */}
      {variant === 'carousel' ? (
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {filtered.map((image, i) => (
              <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={image.src}
                    alt={image.alt ?? `Gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      ) : variant === 'masonry' ? (
        /* Masonry layout via columns */
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((image, i) => (
            <div
              key={i}
              className="mb-4 cursor-pointer overflow-hidden rounded-xl bg-gray-100 break-inside-avoid"
              onClick={() => openLightbox(i)}
            >
              <img
                src={image.src}
                alt={image.alt ?? `Gallery ${i + 1}`}
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Grid layout */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((image, i) => (
            <div
              key={i}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100"
              onClick={() => openLightbox(i)}
            >
              <img
                src={image.src}
                alt={image.alt ?? `Gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="이전"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="다음"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <img
            src={filtered[lightboxIndex].src}
            alt={filtered[lightboxIndex].alt ?? `Gallery ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
