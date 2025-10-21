'use client'

import React from 'react';

interface AttributeNodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  isSelected?: boolean;
  isKey?: boolean;
  isRequired?: boolean;
  onSelect?: (id: string) => void;
  onMove?: (id: string, x: number, y: number) => void;
  className?: string;
}

export const AttributeNode: React.FC<AttributeNodeProps> = ({
  id,
  name,
  x,
  y,
  isSelected = false,
  isKey = false,
  isRequired = false,
  onSelect,
  onMove,
  className = ''
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 && onMove) {
      const newX = x + e.movementX;
      const newY = y + e.movementY;
      onMove(id, newX, newY);
    }
  };

  return (
    <div
      className={`
        absolute cursor-move select-none
        bg-white/90 dark:bg-gray-800/90
        backdrop-blur-xl border-2 rounded-full
        shadow-lg shadow-black/10
        transition-all duration-200 ease-out
        hover:shadow-xl hover:shadow-black/20
        ${isSelected 
          ? 'border-green-500/70 shadow-green-500/20' 
          : 'border-gray-200/50 dark:border-gray-600/50'
        }
        ${isKey ? 'bg-yellow-50/90 dark:bg-yellow-900/20' : ''}
        ${isRequired ? 'border-red-300/70' : ''}
        ${className}
      `}
      style={{
        left: x,
        top: y,
        width: 160,
        height: 80
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="flex items-center justify-center h-full px-3">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {name}
          </div>
          {isKey && (
            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-bold">
              PK
            </div>
          )}
          {isRequired && (
            <div className="text-sm text-red-500">*</div>
          )}
        </div>
      </div>
      
      {/* Индикатор выбора */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
      )}
    </div>
  );
};
