'use client'

import React from 'react';

interface ExportToolsProps {
  onExportPNG?: () => void;
  onExportSVG?: () => void;
  onExportJSON?: () => void;
  onExportPDF?: () => void;
  className?: string;
}

export const ExportTools: React.FC<ExportToolsProps> = ({
  onExportPNG,
  onExportSVG,
  onExportJSON,
  onExportPDF,
  className = ''
}) => {
  const handleExport = (format: string) => {
    switch (format) {
      case 'png':
        onExportPNG?.();
        break;
      case 'svg':
        onExportSVG?.();
        break;
      case 'json':
        onExportJSON?.();
        break;
      case 'pdf':
        onExportPDF?.();
        break;
    }
  };

  const exportOptions = [
    {
      format: 'png',
      label: 'PNG изображение',
      icon: '🖼️',
      description: 'Растровое изображение высокого качества'
    },
    {
      format: 'svg',
      label: 'SVG вектор',
      icon: '📐',
      description: 'Векторная графика, масштабируемая'
    },
    {
      format: 'json',
      label: 'JSON данные',
      icon: '📄',
      description: 'Структурированные данные диаграммы'
    },
    {
      format: 'pdf',
      label: 'PDF документ',
      icon: '📋',
      description: 'Документ для печати и обмена'
    }
  ];

  return (
    <div className={`
      p-4 bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl border border-white/20 dark:border-gray-700/20
      rounded-xl shadow-lg
      ${className}
    `}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        📤 Экспорт диаграммы
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {exportOptions.map((option) => (
          <button
            key={option.format}
            onClick={() => handleExport(option.format)}
            className="
              p-3 rounded-lg border border-gray-200/30 dark:border-gray-600/30
              bg-white/50 dark:bg-gray-700/50
              hover:bg-white/80 dark:hover:bg-gray-600/50
              transition-all duration-200
              text-left
            "
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
