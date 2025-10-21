'use client'

import React from 'react';
import { Button } from '@/components/Base/Button';
import { Dropdown } from '@/components/Base/Dropdown';

interface DiagramToolbarProps {
  onSave?: () => void;
  onLoad?: () => void;
  onClear?: () => void;
  onExport?: (format: 'png' | 'svg' | 'json') => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  className?: string;
}

export const DiagramToolbar: React.FC<DiagramToolbarProps> = ({
  onSave,
  onLoad,
  onClear,
  onExport,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  className = ''
}) => {
  const exportOptions = [
    { value: 'png', label: 'PNG изображение' },
    { value: 'svg', label: 'SVG вектор' },
    { value: 'json', label: 'JSON данные' }
  ];

  const [exportFormat, setExportFormat] = React.useState('png');

  const handleExport = () => {
    onExport?.(exportFormat as 'png' | 'svg' | 'json');
  };

  return (
    <div className={`
      flex items-center justify-between p-4
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20
      ${className}
    `}>
      {/* Левая группа - Основные действия */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={onSave}
          className="gap-2"
        >
          💾 Сохранить
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onLoad}
          className="gap-2"
        >
          📂 Загрузить
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="gap-2 text-red-600 hover:text-red-700"
        >
          🗑️ Очистить
        </Button>
      </div>

      {/* Центральная группа - Экспорт */}
      <div className="flex items-center gap-3">
        <Dropdown
          options={exportOptions}
          value={exportFormat}
          onChange={setExportFormat}
          placeholder="Формат экспорта"
        />
        
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
          className="gap-2"
        >
          📤 Экспорт
        </Button>
      </div>

      {/* Правая группа - Масштаб */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="gap-1"
        >
          🔍-
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomReset}
          className="gap-1"
        >
          🔍100%
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="gap-1"
        >
          🔍+
        </Button>
      </div>
    </div>
  );
};
