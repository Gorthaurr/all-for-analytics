'use client'

import React from 'react';

interface FooterProps {
  copyright?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  copyright = '© 2024 Analytics Project. Все права защищены.',
  links = [],
  className = ''
}) => {
  return (
    <footer className={`w-full px-6 py-6 border-t border-gray-200/20 dark:border-gray-700/20 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {copyright}
        </div>
        
        {links.length > 0 && (
          <nav className="flex items-center gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
};
