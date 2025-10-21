import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseStyles = `
    relative overflow-hidden
    font-medium transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    disabled:opacity-50 disabled:cursor-not-allowed
    backdrop-blur-xl
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-500/80 to-purple-600/80
      text-white border border-white/20
      shadow-lg shadow-blue-500/25
      hover:shadow-xl hover:shadow-blue-500/30
      hover:from-blue-400/90 hover:to-purple-500/90
    `,
    secondary: `
      bg-white/10 text-gray-900 dark:text-white
      border border-gray-200/20 dark:border-gray-700/30
      shadow-lg shadow-black/5
      hover:bg-white/20 hover:shadow-xl hover:shadow-black/10
    `,
    ghost: `
      bg-transparent text-gray-700 dark:text-gray-300
      border border-gray-300/20 dark:border-gray-600/20
      hover:bg-gray-100/50 dark:hover:bg-gray-800/50
    `
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-2xl'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </button>
  );
};
