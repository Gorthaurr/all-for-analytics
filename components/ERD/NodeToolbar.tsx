'use client'

import React from 'react';
import { Button } from '@/components/Base/Button';

interface NodeToolbarProps {
  onAddEntity?: () => void;
  onAddAttribute?: () => void;
  onAddRelationship?: () => void;
  className?: string;
}

export const NodeToolbar: React.FC<NodeToolbarProps> = ({
  onAddEntity,
  onAddAttribute,
  onAddRelationship,
  className = ''
}) => {
  return (
    <div className={`
      flex flex-col gap-3 p-4
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl border border-white/20 dark:border-gray-700/20
      rounded-xl shadow-lg
      ${className}
    `}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
        🛠️ Инструменты
      </h3>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddEntity}
        className="w-full justify-start gap-2"
      >
        <span className="text-lg">📦</span>
        Сущность
      </Button>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddAttribute}
        className="w-full justify-start gap-2"
      >
        <span className="text-lg">🏷️</span>
        Атрибут
      </Button>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddRelationship}
        className="w-full justify-start gap-2"
      >
        <span className="text-lg">🔗</span>
        Связь
      </Button>
    </div>
  );
};
