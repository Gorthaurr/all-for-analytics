'use client'

import React from 'react';

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
    <header className={`w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
