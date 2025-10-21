'use client'

import React from 'react';

interface ConnectionLineProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type?: 'one-to-one' | 'one-to-many' | 'many-to-many';
  label?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  id,
  from,
  to,
  type = 'one-to-many',
  label,
  isSelected = false,
  onSelect,
  className = ''
}) => {
  const getLineStyle = () => {
    switch (type) {
      case 'one-to-one':
        return {
          strokeDasharray: 'none',
          strokeWidth: 2
        };
      case 'one-to-many':
        return {
          strokeDasharray: 'none',
          strokeWidth: 2
        };
      case 'many-to-many':
        return {
          strokeDasharray: '5,5',
          strokeWidth: 2
        };
      default:
        return {
          strokeDasharray: 'none',
          strokeWidth: 2
        };
    }
  };

  const getArrowMarker = () => {
    switch (type) {
      case 'one-to-one':
        return 'url(#arrow-one)';
      case 'one-to-many':
        return 'url(#arrow-many)';
      case 'many-to-many':
        return 'url(#arrow-many-many)';
      default:
        return 'url(#arrow-default)';
    }
  };

  const getLineColor = () => {
    if (isSelected) return '#3B82F6';
    switch (type) {
      case 'one-to-one': return '#10B981';
      case 'one-to-many': return '#F59E0B';
      case 'many-to-many': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g className={`cursor-pointer ${className}`} onClick={() => onSelect?.(id)}>
      {/* Определения стрелок */}
      <defs>
        <marker
          id="arrow-one"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={getLineColor()} />
        </marker>
        <marker
          id="arrow-many"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={getLineColor()} />
        </marker>
        <marker
          id="arrow-many-many"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={getLineColor()} />
        </marker>
        <marker
          id="arrow-default"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={getLineColor()} />
        </marker>
      </defs>

      {/* Основная линия */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={getLineColor()}
        strokeWidth={getLineStyle().strokeWidth}
        strokeDasharray={getLineStyle().strokeDasharray}
        markerEnd={getArrowMarker()}
        className="transition-all duration-200"
      />

      {/* Подпись связи */}
      {label && (
        <text
          x={midX}
          y={midY - 5}
          textAnchor="middle"
          className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
        >
          {label}
        </text>
      )}

      {/* Индикатор выбора */}
      {isSelected && (
        <circle
          cx={midX}
          cy={midY}
          r="4"
          fill="#3B82F6"
          className="animate-pulse"
        />
      )}
    </g>
  );
};
