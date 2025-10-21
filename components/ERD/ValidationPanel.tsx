'use client'

import React from 'react';
import { Badge } from '@/components/Base/Badge';

interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  nodeId?: string;
}

interface ValidationPanelProps {
  issues: ValidationIssue[];
  onIssueClick?: (issue: ValidationIssue) => void;
  className?: string;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  issues,
  onIssueClick,
  className = ''
}) => {
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  const getIssueVariant = (type: string) => {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const infoCount = issues.filter(i => i.type === 'info').length;

  return (
    <div className={`
      p-4 bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl border border-white/20 dark:border-gray-700/20
      rounded-xl shadow-lg
      ${className}
    `}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          🔍 Проверка диаграммы
        </h3>
        
        <div className="flex gap-2">
          {errorCount > 0 && (
            <Badge variant="error" className="text-xs">
              {errorCount}
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="warning" className="text-xs">
              {warningCount}
            </Badge>
          )}
          {infoCount > 0 && (
            <Badge variant="info" className="text-xs">
              {infoCount}
            </Badge>
          )}
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">✅</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Диаграмма корректна
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`
                p-3 rounded-lg cursor-pointer transition-colors
                hover:bg-gray-100/50 dark:hover:bg-gray-700/50
                ${issue.type === 'error' ? 'bg-red-50/50 dark:bg-red-900/20' :
                  issue.type === 'warning' ? 'bg-yellow-50/50 dark:bg-yellow-900/20' :
                  'bg-blue-50/50 dark:bg-blue-900/20'}
              `}
              onClick={() => onIssueClick?.(issue)}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm">{getIssueIcon(issue.type)}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {issue.message}
                  </p>
                  {issue.nodeId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Узел: {issue.nodeId}
                    </p>
                  )}
                </div>
                <Badge variant={getIssueVariant(issue.type)} className="text-xs">
                  {issue.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
