'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

type SkeletonShape = 'text' | 'circle' | 'rectangle';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const shapeStyles: Record<SkeletonShape, string> = {
  text: 'h-4 w-full rounded',
  circle: 'rounded-full aspect-square',
  rectangle: 'rounded-lg',
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, shape = 'rectangle', width, height, lines, style, ...props },
    ref,
  ) => {
    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(width != null ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(height != null ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    };

    if (lines && lines > 1) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'animate-pulse bg-gray-200',
                shapeStyles.text,
                i === lines - 1 && 'w-3/4',
              )}
              style={i === 0 ? inlineStyle : undefined}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-gray-200',
          shapeStyles[shape],
          className,
        )}
        style={inlineStyle}
        aria-hidden="true"
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

export { Skeleton, type SkeletonProps, type SkeletonShape };
