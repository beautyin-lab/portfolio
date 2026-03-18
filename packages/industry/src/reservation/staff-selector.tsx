'use client';

import React from 'react';
import type { Staff } from './types';

interface StaffSelectorProps {
  staff: Staff[];
  selectedStaffId: string | undefined;
  onSelectStaff: (staffId: string) => void;
  optional?: boolean;
}

export function StaffSelector({
  staff,
  selectedStaffId,
  onSelectStaff,
  optional = false,
}: StaffSelectorProps) {
  return (
    <div>
      {optional && (
        <p className="text-sm text-gray-500 mb-3">담당자를 선택하지 않으면 자동 배정됩니다.</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {optional && (
          <button
            type="button"
            onClick={() => onSelectStaff('')}
            className={`
              flex flex-col items-center p-4 rounded-xl border-2 transition-all
              min-h-[44px] cursor-pointer
              ${!selectedStaffId ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">자동 배정</span>
          </button>
        )}
        {staff.map((member) => {
          const isSelected = member.id === selectedStaffId;

          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onSelectStaff(member.id)}
              className={`
                flex flex-col items-center p-4 rounded-xl border-2 transition-all
                min-h-[44px] cursor-pointer
                ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mb-2">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold">{member.name}</span>
              <span className="text-xs text-gray-500">{member.role}</span>
              {member.specialty && (
                <span className="text-xs text-blue-500 mt-0.5">{member.specialty}</span>
              )}
              {isSelected && (
                <span className="text-blue-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
