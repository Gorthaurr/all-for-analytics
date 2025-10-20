'use client'

import React, { useState } from 'react';
import { UserDropdown } from './UserDropdown';
import { Button } from './Button';
import { AuthModal } from './AuthModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationHeaderProps {
  siteName?: string;
  navItems?: Array<{
    labelKey: string;
    href: string;
    isActive?: boolean;
  }>;
  className?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  siteName,
  navItems = [
    { labelKey: 'nav.demo', href: '/demo', isActive: true },
    { labelKey: 'nav.analytics', href: '/analytics' },
    { labelKey: 'nav.reports', href: '/reports' },
    { labelKey: 'nav.dashboard', href: '/dashboard' },
    { labelKey: 'nav.settings', href: '/settings' },
    { labelKey: 'nav.help', href: '/help' }
  ],
  className = ''
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header className={`w-full p-4 border-b border-gray-200/20 dark:border-gray-700/20 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Логотип/Название сайта */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {siteName || t('site.name')}
          </h1>
        </div>

        {/* Центральная навигация */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`text-lg font-medium transition-colors duration-200 ${
                item.isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        {/* Правая часть - тоглы и профиль */}
        <div className="flex items-center gap-4">
          {/* Тогл темной темы */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200"
            title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Тогл языка */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {language === 'ru' ? 'RU' : 'EN'}
          </button>

          {/* Профиль или кнопка входа */}
          {isAuthenticated ? (
            <UserDropdown
              onLogout={logout}
              onAccountSettings={() => console.log('Account Settings')}
              onViewAgents={() => console.log('View Agents')}
            />
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
            >
              Войти
            </Button>
          )}
        </div>
      </div>

      {/* Модальное окно авторизации */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
};
