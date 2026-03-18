'use client';

import * as React from 'react';
import { ReactLenis } from 'lenis/react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  root?: boolean;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
  };
}

function SmoothScrollProvider({
  children,
  root = true,
  options,
}: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root={root}
      options={{
        lerp: 0.1,
        smoothWheel: true,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export { SmoothScrollProvider, type SmoothScrollProviderProps };
