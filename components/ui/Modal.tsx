'use client'

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full ${sizeStyles[size]} animate-scale-in`}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
          {title && (
            <div className="px-6 py-4 border-b border-gray-200/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
