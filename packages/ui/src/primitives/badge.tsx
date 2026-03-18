'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

const badgeVariants = {
  variant: {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  },
} as const;

type BadgeVariant = keyof typeof badgeVariants.variant;
type BadgeSize = keyof typeof badgeVariants.size;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize };
