'use client';

import React from 'react';
import type { Room } from './types';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoomId: string | undefined;
  onSelectRoom: (roomId: string) => void;
}

export function RoomSelector({ rooms, selectedRoomId, onSelectRoom }: RoomSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rooms.map((room) => {
        const isSelected = room.id === selectedRoomId;

        return (
          <button
            key={room.id}
            type="button"
            onClick={() => onSelectRoom(room.id)}
            className={`
              text-left rounded-xl overflow-hidden border-2 transition-all
              min-h-[44px] cursor-pointer
              ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}
            `}
          >
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-base">{room.name}</h3>
                {isSelected && (
                  <span className="text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2">{room.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {room.price.toLocaleString()}원
                </span>
                <span className="text-sm text-gray-400">최대 {room.maxGuests}인</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
