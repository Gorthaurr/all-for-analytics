'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  ru: {
    'site.name': 'Analytics Project',
    'nav.demo': 'Демо',
    'nav.erd': 'ERD',
    'nav.reports': 'Отчеты',
    'nav.dashboard': 'Панель',
    'nav.settings': 'Настройки',
    'nav.help': 'Помощь',
    'user.account_settings': 'Account Settings',
    'user.view_agents': 'View Agents',
    'user.log_out': 'Log Out',
    'home.welcome': 'Добро пожаловать в Analytics Project',
    'home.subtitle': 'Современная платформа для аналитики с дизайном в стиле Apple и liquid glass эффектами',
    'home.analytics.title': 'Аналитика',
    'home.analytics.desc': 'Мощные инструменты для анализа данных и создания отчетов',
    'home.design.title': 'Дизайн',
    'home.design.desc': 'Современный интерфейс с liquid glass эффектами и минимализмом',
    'home.performance.title': 'Производительность',
    'home.performance.desc': 'Быстрая работа благодаря современным технологиям',
    'footer.copyright': '© 2024 Analytics Project. Все права защищены.',
    'footer.about': 'О проекте',
    'footer.docs': 'Документация',
    'footer.support': 'Поддержка',
    'auth.login': 'Войти',
    'auth.register': 'Зарегистрироваться',
    'theme.light': 'Светлая тема',
    'theme.dark': 'Темная тема',
    'language.ru': 'RU',
    'language.en': 'EN'
  },
  en: {
    'site.name': 'Analytics Project',
    'nav.demo': 'Demo',
    'nav.erd': 'ERD',
    'nav.reports': 'Reports',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'nav.help': 'Help',
    'user.account_settings': 'Account Settings',
    'user.view_agents': 'View Agents',
    'user.log_out': 'Log Out',
    'home.welcome': 'Welcome to Analytics Project',
    'home.subtitle': 'Modern analytics platform with Apple design and liquid glass effects',
    'home.analytics.title': 'Analytics',
    'home.analytics.desc': 'Powerful tools for data analysis and report generation',
    'home.design.title': 'Design',
    'home.design.desc': 'Modern interface with liquid glass effects and minimalism',
    'home.performance.title': 'Performance',
    'home.performance.desc': 'Fast operation thanks to modern technologies',
    'footer.copyright': '© 2024 Analytics Project. All rights reserved.',
    'footer.about': 'About',
    'footer.docs': 'Documentation',
    'footer.support': 'Support',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'theme.light': 'Light theme',
    'theme.dark': 'Dark theme',
    'language.ru': 'RU',
    'language.en': 'EN'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    // Проверяем сохраненный язык
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
