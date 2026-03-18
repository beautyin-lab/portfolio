'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Card } from '../primitives/card';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  description?: string;
  detail?: string;
  avatar?: string;
  initials?: string;
}

export interface TeamSectionProps {
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClass: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function TeamSection({ members, columns = 3, className }: TeamSectionProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className={cn('grid gap-6', colClass[columns] ?? colClass[3], className)}>
      {members.map((member, i) => (
        <Card
          key={member.id ?? i}
          className="relative overflow-hidden transition-shadow duration-200 hover:shadow-lg"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            {/* Avatar */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-2xl font-bold text-blue-600">
                  {member.initials ?? member.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm font-medium text-blue-600">{member.role}</p>
              {member.description && (
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{member.description}</p>
              )}
            </div>
          </div>

          {/* Detail overlay on hover */}
          {member.detail && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-blue-600/95 p-6 text-center transition-all duration-300',
                hovered === i ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              <p className="text-sm leading-relaxed text-white">{member.detail}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
