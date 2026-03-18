'use client';

import * as React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export interface FloatingCTAButton {
  type: 'phone' | 'kakao' | 'custom';
  href: string;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface FloatingCTAProps {
  buttons?: FloatingCTAButton[];
  showOnScrollY?: number;
  className?: string;
}

const defaultButtons: FloatingCTAButton[] = [
  { type: 'kakao', href: '#', label: '카카오톡 문의' },
  { type: 'phone', href: 'tel:010-0000-0000', label: '전화 문의' },
];

const buttonColors: Record<string, string> = {
  kakao: 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900',
  phone: 'bg-blue-600 hover:bg-blue-700 text-white',
  custom: 'bg-gray-800 hover:bg-gray-900 text-white',
};

export function FloatingCTA({
  buttons = defaultButtons,
  showOnScrollY = 300,
  className,
}: FloatingCTAProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > showOnScrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScrollY]);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none',
        className,
      )}
    >
      {buttons.map((btn, i) => {
        const colorClass = btn.color ?? buttonColors[btn.type] ?? buttonColors.custom;
        const icon =
          btn.icon ??
          (btn.type === 'phone' ? (
            <Phone className="h-5 w-5" />
          ) : btn.type === 'kakao' ? (
            <MessageCircle className="h-5 w-5" />
          ) : null);

        return (
          <a
            key={i}
            href={btn.href}
            aria-label={btn.label}
            title={btn.label}
            className={cn(
              'group flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110',
              colorClass,
            )}
          >
            {icon}
            {btn.label && (
              <span className="absolute right-16 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {btn.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
