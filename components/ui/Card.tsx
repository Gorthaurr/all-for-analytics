import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const baseStyles = `
    rounded-2xl border transition-all duration-300 ease-out
    backdrop-blur-xl
  `;

  const variantStyles = {
    default: `
      bg-white/80 dark:bg-gray-900/80
      border-gray-200/30 dark:border-gray-700/30
      shadow-lg shadow-black/5
      hover:shadow-xl hover:shadow-black/10
    `,
    elevated: `
      bg-white/90 dark:bg-gray-900/90
      border-gray-200/40 dark:border-gray-700/40
      shadow-2xl shadow-black/10
      hover:shadow-2xl hover:shadow-black/15
      transform hover:-translate-y-1
    `,
    glass: `
      bg-white/10 dark:bg-gray-900/10
      border-white/20 dark:border-gray-700/20
      shadow-lg shadow-black/5
      hover:bg-white/20 dark:hover:bg-gray-900/20
    `
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};
