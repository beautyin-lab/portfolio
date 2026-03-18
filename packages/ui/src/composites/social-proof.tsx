'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface SocialProofItem {
  id?: string;
  name: string;
  logo?: string;
  logoAlt?: string;
}

export interface SocialProofProps {
  items: SocialProofItem[];
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  className?: string;
}

const speedMap: Record<string, string> = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export function SocialProof({
  items,
  speed = 'normal',
  label,
  className,
}: SocialProofProps) {
  const duration = speedMap[speed] ?? speedMap.normal;
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      {label && (
        <p className="mb-6 text-center text-sm font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </p>
      )}

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex shrink-0 gap-8 animate-[marquee_var(--duration)_linear_infinite]"
          style={{ '--duration': duration } as React.CSSProperties}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.id ?? i}-a`}
              className="flex h-16 w-36 shrink-0 items-center justify-center grayscale opacity-60 transition-all duration-200 hover:grayscale-0 hover:opacity-100"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.logoAlt ?? item.name}
                  className="max-h-10 max-w-full object-contain"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-500">{item.name}</span>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
