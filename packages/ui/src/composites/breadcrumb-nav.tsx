'use client';

import * as React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  separator?: React.ReactNode;
  className?: string;
}

export function BreadcrumbNav({
  items,
  showHome = true,
  homeHref = '/',
  separator,
  className,
}: BreadcrumbNavProps) {
  const sep = separator ?? <ChevronRight className="h-3.5 w-3.5 text-gray-400" />;

  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: '홈', href: homeHref }, ...items]
    : items;

  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">{sep}</span>}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    isLast
                      ? 'font-medium text-gray-900'
                      : 'text-gray-500',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {i === 0 && showHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  {i === 0 && showHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
