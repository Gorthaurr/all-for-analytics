'use client'

import React from 'react';
import { EnvironmentToggle } from './EnvironmentToggle';
import { Card } from './Card';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showApiToggle?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = '🍎 Analytics Project',
  subtitle = 'BPMN-подобное приложение с дизайном Apple',
  showApiToggle = true,
  className = ''
}) => {
  return (
    <header className={`w-full p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>
        
        {showApiToggle && (
          <Card variant="glass" className="w-fit">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🌐 API:
              </span>
              <EnvironmentToggle />
            </div>
          </Card>
        )}
      </div>
    </header>
  );
};
