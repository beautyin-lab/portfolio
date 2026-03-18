'use client';

import * as React from 'react';

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = '전후 비교',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const updatePosition = React.useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = React.useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* After (full) */}
      <img src={afterSrc} alt={`${alt} after`} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img src={beforeSrc} alt={`${alt} before`} className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / position}%`, maxWidth: 'none' }} />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
        {afterLabel}
      </span>
    </div>
  );
}
