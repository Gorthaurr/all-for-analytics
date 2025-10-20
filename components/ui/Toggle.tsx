'use client'

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = ''
}) => {
  const sizeStyles = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex ${currentSize.track} rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20
          ${checked 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'bg-gray-200 dark:bg-gray-700'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${currentSize.thumb} pointer-events-none inline-block rounded-full bg-white shadow-lg
            transform ring-0 transition duration-200 ease-in-out
            ${checked ? currentSize.translate : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};
