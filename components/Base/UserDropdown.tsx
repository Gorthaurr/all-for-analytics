'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserDropdownProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onAccountSettings?: () => void;
  onViewAgents?: () => void;
  className?: string;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  userName,
  userEmail,
  onLogout,
  onAccountSettings,
  onViewAgents,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { t } = useLanguage();

  const displayName = userName || user?.name || 'User';
  const displayEmail = userEmail || user?.email || 'user@example.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Профиль кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          {displayName.charAt(0)}
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:block">
          {displayName.split(' ')[0]}
        </span>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-black/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-2xl z-50">
          {/* Информация о пользователе */}
          <div className="p-4 border-b border-white/10 dark:border-gray-700/20">
            <div className="text-lg font-bold text-white mb-1">
              {displayName}
            </div>
            <div className="text-sm text-gray-400">
              {displayEmail}
            </div>
          </div>

          {/* Пункты меню */}
          <div className="py-2">
            <button
              onClick={() => {
                onAccountSettings?.();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors duration-150"
            >
              {t('user.account_settings')}
            </button>
            
            <button
              onClick={() => {
                onViewAgents?.();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors duration-150"
            >
              {t('user.view_agents')}
            </button>
            
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors duration-150 flex items-center justify-between"
            >
              {t('user.log_out')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
