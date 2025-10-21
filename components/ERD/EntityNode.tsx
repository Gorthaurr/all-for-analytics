'use client'

import React from 'react';

interface EntityNodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onMove?: (id: string, x: number, y: number) => void;
  className?: string;
}

export const EntityNode: React.FC<EntityNodeProps> = ({
  id,
  name,
  x,
  y,
  isSelected = false,
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
      const rect = e.currentTarget.getBoundingClientRect();
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
        backdrop-blur-xl border-2 rounded-xl
        shadow-lg shadow-black/10
        transition-all duration-200 ease-out
        hover:shadow-xl hover:shadow-black/20
        ${isSelected 
          ? 'border-blue-500/70 shadow-blue-500/20' 
          : 'border-gray-200/50 dark:border-gray-600/50'
        }
        ${className}
      `}
      style={{
        left: x,
        top: y,
        width: 280,
        minHeight: 120
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {/* Заголовок сущности */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-xl border-b border-gray-200/30 dark:border-gray-600/30">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white text-center">
          {name}
        </h3>
      </div>
      
      {/* Тело сущности */}
      <div className="px-4 py-3">
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Сущность
        </div>
      </div>
      
      {/* Индикатор выбора */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800" />
      )}
    </div>
  );
};
