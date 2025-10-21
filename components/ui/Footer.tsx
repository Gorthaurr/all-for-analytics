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
  const footerSections = [
    {
      title: 'Продукт',
      links: [
        { label: 'Функции', href: '/features' },
        { label: 'Корпоративные решения', href: '/enterprise' },
        { label: 'API', href: '/api' },
        { label: 'CLI', href: '/cli' },
        { label: 'Цены', href: '/pricing' }
      ]
    },
    {
      title: 'Ресурсы',
      links: [
        { label: 'Скачать', href: '/download' },
        { label: 'Веб-агенты', href: '/web-agents' },
        { label: 'Обновления', href: '/changelog' },
        { label: 'Документация', href: '/docs' },
        { label: 'Форум', href: '/forum' },
        { label: 'Статус', href: '/status' }
      ]
    },
    {
      title: 'Компания',
      links: [
        { label: 'Карьера', href: '/careers' },
        { label: 'Блог', href: '/blog' },
        { label: 'Сообщество', href: '/community' },
        { label: 'Студентам', href: '/students' },
        { label: 'Бренд', href: '/brand' }
      ]
    },
    {
      title: 'Правовая информация',
      links: [
        { label: 'Условия использования', href: '/terms' },
        { label: 'Политика конфиденциальности', href: '/privacy' },
        { label: 'Использование данных', href: '/data-use' },
        { label: 'Безопасность', href: '/security' }
      ]
    },
    {
      title: 'Связь',
      links: [
        { label: 'X (Twitter)', href: 'https://x.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'YouTube', href: 'https://youtube.com' }
      ]
    }
  ];

  return (
    <footer className={`w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3 min-w-[200px]">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {copyright}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Создано с ❤️ для аналитики
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
