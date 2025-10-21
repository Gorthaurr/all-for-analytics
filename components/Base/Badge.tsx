import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const baseStyles = `
    inline-flex items-center font-medium rounded-full
    backdrop-blur-xl border transition-all duration-200
  `;

  const variantStyles = {
    default: `
      bg-blue-500/20 text-blue-700 dark:text-blue-300
      border-blue-500/30 dark:border-blue-400/30
    `,
    success: `
      bg-green-500/20 text-green-700 dark:text-green-300
      border-green-500/30 dark:border-green-400/30
    `,
    warning: `
      bg-amber-500/20 text-amber-700 dark:text-amber-300
      border-amber-500/30 dark:border-amber-400/30
    `,
    error: `
      bg-red-500/20 text-red-700 dark:text-red-300
      border-red-500/30 dark:border-red-400/30
    `,
    info: `
      bg-gray-500/20 text-gray-700 dark:text-gray-300
      border-gray-500/30 dark:border-gray-400/30
    `
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
