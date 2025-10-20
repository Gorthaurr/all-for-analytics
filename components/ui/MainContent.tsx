'use client'

import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  layout?: 'default' | 'grid' | 'flex';
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  layout = 'default',
  className = ''
}) => {
  const layoutStyles = {
    default: 'w-full space-y-6',
    grid: 'w-full grid grid-cols-12 gap-6',
    flex: 'w-full flex flex-col gap-6'
  };

  return (
    <main className={`min-h-screen p-4 ${className}`}>
      <div className={layoutStyles[layout]}>
        {children}
      </div>
    </main>
  );
};
