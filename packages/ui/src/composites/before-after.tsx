'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  alt?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  alt = '전후 비교',
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = React.useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handleMouseUp = React.useCallback(() => setIsDragging(false), []);

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    },
    [isDragging, updatePosition],
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative select-none overflow-hidden rounded-xl bg-gray-100',
        isDragging ? 'cursor-ew-resize' : 'cursor-col-resize',
        className,
      )}
      style={{ touchAction: 'none' }}
    >
      {/* After image (background) */}
      <img
        src={afterSrc}
        alt={`${alt} - ${afterLabel}`}
        className="block w-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} - ${beforeLabel}`}
          className="block h-full w-auto max-w-none object-cover"
          style={{ width: `${(100 / position) * 100}%` }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 flex items-center justify-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-0.5 bg-white shadow-md" />
        {/* Handle */}
        <div
          className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
          onMouseDown={handleMouseDown}
          onTouchStart={(e) => {
            setIsDragging(true);
            updatePosition(e.touches[0].clientX);
          }}
        >
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10">
        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
          {beforeLabel}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-10">
        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
