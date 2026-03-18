'use client';

import * as React from 'react';

export interface ScheduleClass {
  id: string;
  name: string;
  instructor?: string;
  startTime: string; // 'HH:mm'
  endTime: string;   // 'HH:mm'
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sun
  color?: string;
}

export interface WeeklyScheduleProps {
  classes: ScheduleClass[];
  startHour?: number;
  endHour?: number;
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const COLOR_PRESETS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-green-100 text-green-700 border-green-200',
  'bg-purple-100 text-purple-700 border-purple-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-pink-100 text-pink-700 border-pink-200',
  'bg-teal-100 text-teal-700 border-teal-200',
];

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function WeeklySchedule({ classes, startHour = 6, endHour = 22 }: WeeklyScheduleProps) {
  const now = new Date();
  const currentDay = now.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const totalMinutes = (endHour - startHour) * 60;
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);

  const colorMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    let i = 0;
    classes.forEach((c) => {
      if (!map[c.name]) {
        map[c.name] = c.color ?? COLOR_PRESETS[i % COLOR_PRESETS.length];
        i++;
      }
    });
    return map;
  }, [classes]);

  const classesByDay = React.useMemo(() => {
    const map: Record<number, ScheduleClass[]> = {};
    classes.forEach((c) => {
      if (!map[c.day]) map[c.day] = [];
      map[c.day].push(c);
    });
    return map;
  }, [classes]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-8 border-b border-gray-200 mb-1">
          <div className="col-span-1" />
          {DAY_LABELS.map((d, i) => (
            <div
              key={d}
              className={`col-span-1 text-center py-2 text-sm font-semibold ${i === currentDay ? 'text-blue-600' : 'text-gray-600'}`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative grid grid-cols-8">
          {/* Time labels */}
          <div className="col-span-1">
            {hours.map((h) => (
              <div key={h} className="h-16 flex items-start pt-1 pr-2">
                <span className="text-xs text-gray-400 text-right w-full">{`${h}:00`}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAY_LABELS.map((_, dayIdx) => (
            <div key={dayIdx} className={`col-span-1 relative border-l border-gray-100 ${dayIdx === currentDay ? 'bg-blue-50/40' : ''}`} style={{ height: `${hours.length * 64}px` }}>
              {/* Hour lines */}
              {hours.map((_, hi) => (
                <div key={hi} className="absolute w-full border-t border-gray-100" style={{ top: `${hi * 64}px` }} />
              ))}

              {/* Current time indicator */}
              {dayIdx === currentDay && currentMinutes >= startHour * 60 && currentMinutes <= endHour * 60 && (
                <div
                  className="absolute w-full border-t-2 border-red-400 z-10"
                  style={{ top: `${((currentMinutes - startHour * 60) / totalMinutes) * hours.length * 64}px` }}
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full -mt-1 -ml-1" />
                </div>
              )}

              {/* Classes */}
              {(classesByDay[dayIdx] ?? []).map((cls) => {
                const top = ((timeToMinutes(cls.startTime) - startHour * 60) / totalMinutes) * hours.length * 64;
                const height = ((timeToMinutes(cls.endTime) - timeToMinutes(cls.startTime)) / totalMinutes) * hours.length * 64;
                return (
                  <div
                    key={cls.id}
                    className={`absolute left-0.5 right-0.5 rounded border text-xs p-1 overflow-hidden ${colorMap[cls.name] ?? COLOR_PRESETS[0]}`}
                    style={{ top: `${top}px`, height: `${Math.max(height, 20)}px` }}
                  >
                    <p className="font-semibold truncate leading-tight">{cls.name}</p>
                    {cls.instructor && <p className="truncate opacity-70">{cls.instructor}</p>}
                    <p className="opacity-60">{cls.startTime}~{cls.endTime}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
