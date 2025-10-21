'use client'

import React, { useState, useRef, useEffect } from 'react';
import { EntityNode } from './EntityNode';
import { AttributeNode } from './AttributeNode';
import { RelationshipNode } from './RelationshipNode';
import { ConnectionLine } from './ConnectionLine';

interface Node {
  id: string;
  type: 'entity' | 'attribute' | 'relationship';
  name: string;
  x: number;
  y: number;
  properties?: Record<string, any>;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  label?: string;
}

interface DiagramCanvasProps {
  nodes?: Node[];
  connections?: Connection[];
  onNodeAdd?: (node: Omit<Node, 'id'>) => void;
  onNodeUpdate?: (id: string, updates: Partial<Node>) => void;
  onNodeDelete?: (id: string) => void;
  onConnectionAdd?: (connection: Omit<Connection, 'id'>) => void;
  onConnectionDelete?: (id: string) => void;
  className?: string;
}

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  nodes = [],
  connections = [],
  onNodeAdd,
  onNodeUpdate,
  onNodeDelete,
  onConnectionAdd,
  onConnectionDelete,
  className = ''
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNodeId(null);
    }
  };

  const handleNodeSelect = (id: string) => {
    setSelectedNodeId(id);
  };

  const handleNodeMove = (id: string, x: number, y: number) => {
    onNodeUpdate?.(id, { x, y });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Delete' && selectedNodeId) {
      onNodeDelete?.(selectedNodeId);
      setSelectedNodeId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId]);

  return (
    <div
      ref={canvasRef}
      className={`
        relative w-full h-full min-h-[600px]
        bg-gray-50/50 dark:bg-gray-900/50
        border border-gray-200/30 dark:border-gray-700/30
        rounded-xl overflow-hidden
        cursor-crosshair
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        ${className}
      `}
      onClick={handleCanvasClick}
    >
      {/* Сетка */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* SVG для связей */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connection) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <ConnectionLine
              key={connection.id}
              id={connection.id}
              from={{ x: fromNode.x + 100, y: fromNode.y + 40 }}
              to={{ x: toNode.x + 100, y: toNode.y + 40 }}
              type={connection.type}
              label={connection.label}
              isSelected={false}
              onSelect={() => {}}
            />
          );
        })}
      </svg>

      {/* Узлы */}
      {nodes.map((node) => {
        const commonProps = {
          key: node.id,
          id: node.id,
          name: node.name,
          x: node.x,
          y: node.y,
          isSelected: selectedNodeId === node.id,
          onSelect: handleNodeSelect,
          onMove: handleNodeMove
        };

        switch (node.type) {
          case 'entity':
            return <EntityNode {...commonProps} />;
          case 'attribute':
            return (
              <AttributeNode
                {...commonProps}
                isKey={node.properties?.isKey}
                isRequired={node.properties?.isRequired}
              />
            );
          case 'relationship':
            return (
              <RelationshipNode
                {...commonProps}
                cardinality={node.properties?.cardinality}
              />
            );
          default:
            return null;
        }
      })}

      {/* Инструкции */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl opacity-30">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              ER Диаграмма
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 max-w-md">
              Начните создавать диаграмму, добавив сущности из панели инструментов
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
