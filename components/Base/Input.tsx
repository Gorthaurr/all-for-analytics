import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  error
}) => {
  const baseStyles = `
    w-full px-4 py-3 rounded-xl border
    bg-white/80 dark:bg-gray-900/80
    border-gray-200/30 dark:border-gray-700/30
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    focus:border-blue-500/50 dark:focus:border-blue-400/50
    transition-all duration-300 ease-out
    backdrop-blur-xl
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const errorStyles = error ? `
    border-red-500/50 dark:border-red-400/50
    focus:ring-red-500/20 focus:border-red-500/50
  ` : '';

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseStyles} ${errorStyles} ${className}`}
      />
      {error && (
        <div className="absolute inset-0 bg-red-500/5 border border-red-500/20 rounded-xl pointer-events-none" />
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
