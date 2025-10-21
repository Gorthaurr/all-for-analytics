'use client'

import React from 'react';

interface MinimapProps {
  nodes: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
  }>;
  connections: Array<{
    id: string;
    from: { x: number; y: number };
    to: { x: number; y: number };
  }>;
  viewport: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onViewportChange?: (x: number, y: number) => void;
  className?: string;
}

export const Minimap: React.FC<MinimapProps> = ({
  nodes,
  connections,
  viewport,
  onViewportChange,
  className = ''
}) => {
  const minimapRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (minimapRef.current && onViewportChange) {
      const rect = minimapRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 1000 - viewport.width / 2;
      const y = (e.clientY - rect.top) / rect.height * 1000 - viewport.height / 2;
      onViewportChange(x, y);
    }
  };

  return (
    <div className={`
      w-48 h-32 bg-white/90 dark:bg-gray-800/90
      backdrop-blur-xl border border-white/20 dark:border-gray-700/20
      rounded-lg shadow-lg overflow-hidden
      ${className}
    `}>
      <div className="relative w-full h-full">
        {/* Фон мини-карты */}
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-700/50" />
        
        {/* Узлы на мини-карте */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`
              absolute rounded
              ${node.type === 'entity' ? 'bg-blue-500/70' : 
                node.type === 'attribute' ? 'bg-green-500/70' : 'bg-red-500/70'}
            `}
            style={{
              left: `${node.x / 10}%`,
              top: `${node.y / 10}%`,
              width: '8px',
              height: '8px'
            }}
          />
        ))}

        {/* Связи на мини-карте */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map((conn) => (
            <line
              key={conn.id}
              x1={`${conn.from.x / 10}%`}
              y1={`${conn.from.y / 10}%`}
              x2={`${conn.to.x / 10}%`}
              y2={`${conn.to.y / 10}%`}
              stroke="#6B7280"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Область просмотра */}
        <div
          className="absolute border-2 border-blue-500/70 bg-blue-500/10"
          style={{
            left: `${viewport.x / 10}%`,
            top: `${viewport.y / 10}%`,
            width: `${viewport.width / 10}%`,
            height: `${viewport.height / 10}%`
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
