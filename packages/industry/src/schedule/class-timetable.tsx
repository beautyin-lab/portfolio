'use client';

import * as React from 'react';

export interface ClassInfo {
  id: string;
  name: string;
  instructor: string;
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
  level?: '초급' | '중급' | '고급';
  capacity?: number;
  enrolled?: number;
}

export interface ClassTimetableProps {
  classes: ClassInfo[];
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const LEVEL_COLORS: Record<string, string> = {
  '초급': 'bg-green-100 text-green-700',
  '중급': 'bg-yellow-100 text-yellow-700',
  '고급': 'bg-red-100 text-red-700',
};

export function ClassTimetable({ classes }: ClassTimetableProps) {
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    const result = selectedDay !== null
      ? classes.filter((c) => c.day === selectedDay)
      : [...classes];
    return result.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [classes, selectedDay]);

  return (
    <div className="w-full">
      {/* Day filter */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedDay(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedDay === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          전체
        </button>
        {DAY_LABELS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedDay === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {d}요일
          </button>
        ))}
      </div>

      {/* Class list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">해당 요일에 수업이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((cls) => (
            <div key={cls.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="flex-shrink-0 text-center w-10">
                <span className="text-xs font-bold text-blue-600">{DAY_LABELS[cls.day]}</span>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{cls.startTime}</p>
                <p className="text-xs text-gray-400">~{cls.endTime}</p>
              </div>
              <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{cls.name}</h4>
                  {cls.level && (
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[cls.level] ?? 'bg-gray-100 text-gray-600'}`}>
                      {cls.level}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{cls.instructor} 강사</p>
              </div>
              {cls.capacity !== undefined && (
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-500">
                    <span className={cls.enrolled !== undefined && cls.enrolled >= cls.capacity ? 'text-red-500 font-bold' : 'text-gray-700 font-semibold'}>
                      {cls.enrolled ?? 0}
                    </span>
                    /{cls.capacity}명
                  </p>
                  {cls.enrolled !== undefined && cls.enrolled >= cls.capacity && (
                    <span className="text-xs text-red-500 font-medium">마감</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
