'use client';

import * as React from 'react';

export type SeatStatus = 'available' | 'occupied' | 'reserved';

export interface Seat {
  id: string;
  number: number;
  status: SeatStatus;
}

export interface SeatStatusBoardProps {
  seats: Seat[];
  title?: string;
  updateInterval?: number; // ms, default 5000
}

const STATUS_STYLES: Record<SeatStatus, string> = {
  available: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
  occupied: 'bg-red-100 text-red-700 border-red-200 cursor-not-allowed',
  reserved: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const STATUS_LABELS: Record<SeatStatus, string> = {
  available: '이용 가능',
  occupied: '사용 중',
  reserved: '예약됨',
};

function randomStatus(): SeatStatus {
  const r = Math.random();
  if (r < 0.5) return 'available';
  if (r < 0.85) return 'occupied';
  return 'reserved';
}

export function SeatStatusBoard({
  seats: initialSeats,
  title = '좌석 현황',
  updateInterval = 5000,
}: SeatStatusBoardProps) {
  const [seats, setSeats] = React.useState<Seat[]>(initialSeats);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeats((prev) =>
        prev.map((seat) => {
          // ~20% chance of status change per tick
          if (Math.random() < 0.2) {
            return { ...seat, status: randomStatus() };
          }
          return seat;
        })
      );
    }, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  const counts = React.useMemo(() => ({
    available: seats.filter((s) => s.status === 'available').length,
    occupied: seats.filter((s) => s.status === 'occupied').length,
    reserved: seats.filter((s) => s.status === 'reserved').length,
  }), [seats]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className="text-xs text-gray-400">5초마다 자동 갱신</span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {(Object.keys(STATUS_LABELS) as SeatStatus[]).map((status) => (
          <div key={status} className={`rounded-xl border p-3 text-center ${STATUS_STYLES[status].split(' ').slice(0, 3).join(' ')}`}>
            <p className="text-2xl font-extrabold">{counts[status]}</p>
            <p className="text-xs font-medium mt-0.5">{STATUS_LABELS[status]}</p>
          </div>
        ))}
      </div>

      {/* Seat grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`flex flex-col items-center justify-center border rounded-lg py-2 px-1 text-center transition-colors duration-300 ${STATUS_STYLES[seat.status]}`}
            title={STATUS_LABELS[seat.status]}
          >
            <span className="text-xs font-bold">{seat.number}</span>
            <span className="text-xs mt-0.5 leading-tight">
              {seat.status === 'available' ? '빈좌석' : seat.status === 'occupied' ? '사용중' : '예약'}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center">
        {(Object.entries(STATUS_LABELS) as [SeatStatus, string][]).map(([status, label]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded border ${STATUS_STYLES[status].split(' ').slice(0, 2).join(' ')}`} />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
