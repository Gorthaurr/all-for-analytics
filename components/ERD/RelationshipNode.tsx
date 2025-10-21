'use client'

import React from 'react';

interface RelationshipNodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  isSelected?: boolean;
  cardinality?: '1:1' | '1:N' | 'N:1' | 'M:N';
  onSelect?: (id: string) => void;
  onMove?: (id: string, x: number, y: number) => void;
  className?: string;
}

export const RelationshipNode: React.FC<RelationshipNodeProps> = ({
  id,
  name,
  x,
  y,
  isSelected = false,
  cardinality = '1:N',
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

  const getCardinalityColor = () => {
    switch (cardinality) {
      case '1:1': return 'border-blue-500/70 shadow-blue-500/20';
      case '1:N': return 'border-green-500/70 shadow-green-500/20';
      case 'N:1': return 'border-orange-500/70 shadow-orange-500/20';
      case 'M:N': return 'border-purple-500/70 shadow-purple-500/20';
      default: return 'border-gray-200/50 dark:border-gray-600/50';
    }
  };

  return (
    <div
      className={`
        absolute cursor-move select-none
        bg-white/90 dark:bg-gray-800/90
        backdrop-blur-xl border-2
        shadow-lg shadow-black/10
        transition-all duration-200 ease-out
        hover:shadow-xl hover:shadow-black/20
        ${isSelected 
          ? 'border-red-500/70 shadow-red-500/20' 
          : getCardinalityColor()
        }
        ${className}
      `}
      style={{
        left: x,
        top: y,
        width: 140,
        height: 100,
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="flex items-center justify-center h-full px-2">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {cardinality}
          </div>
        </div>
      </div>
      
      {/* Индикатор выбора */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
      )}
    </div>
  );
};
