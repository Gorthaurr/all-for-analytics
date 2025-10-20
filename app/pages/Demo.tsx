'use client'

import { useState } from 'react'
import { 
  Button, 
  Card, 
  Input, 
  Modal, 
  Dropdown, 
  Toggle, 
  Progress, 
  Badge,
  Carousel,
  Header,
  Footer,
  MainContent,
  EnvironmentToggle 
} from '@/components/ui'

export default function Demo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('')
  const [toggleValue, setToggleValue] = useState(false)
  const [progressValue, setProgressValue] = useState(65)

  const dropdownOptions = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' }
  ]

  const carouselItems = [
    {
      id: '1',
      title: '🍎 Apple Design',
      description: 'Минималистичный дизайн в стиле Apple с акцентом на простоту и функциональность',
      content: (
        <div className="flex gap-4 justify-center mt-6">
          <Badge variant="default">Минимализм</Badge>
          <Badge variant="success">Функциональность</Badge>
          <Badge variant="info">Элегантность</Badge>
        </div>
      )
    },
    {
      id: '2',
      title: '💧 Liquid Glass',
      description: 'Полупрозрачные элементы с размытием создают эффект жидкого стекла',
      content: (
        <div className="flex gap-4 justify-center mt-6">
          <Badge variant="warning">Полупрозрачность</Badge>
          <Badge variant="error">Размытие</Badge>
          <Badge variant="info">Глубина</Badge>
        </div>
      )
    },
    {
      id: '3',
      title: '⚡ Современные технологии',
      description: 'Next.js 14, TypeScript, Tailwind CSS для создания быстрых и красивых приложений',
      content: (
        <div className="flex gap-4 justify-center mt-6">
          <Badge variant="default">Next.js</Badge>
          <Badge variant="success">TypeScript</Badge>
          <Badge variant="warning">Tailwind</Badge>
        </div>
      )
    }
  ]

  return (
    <>
      <Header 
        title="🍎 Analytics Project"
        subtitle="✨ BPMN-подобное приложение с дизайном Apple"
      />
      
      <MainContent layout="grid">

        {/* ЛЕВАЯ ПАНЕЛЬ - ИНСТРУМЕНТЫ */}
        <div className="col-span-3 space-y-4">
            <Card variant="elevated">
              <h3 className="text-lg font-semibold mb-4">🔧 Инструменты</h3>
              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full">
                  ✨ Создать процесс
                </Button>
                <Button variant="secondary" className="w-full">
                  📊 Аналитика
                </Button>
                <Button variant="ghost" className="w-full">
                  📋 Шаблоны
                </Button>
              </div>
            </Card>

            <Card variant="glass">
              <h3 className="text-lg font-semibold mb-4">📝 Формы</h3>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="📧 Email"
                />
                <Input
                  type="password"
                  placeholder="🔒 Пароль"
                />
                <Dropdown
                  options={dropdownOptions}
                  value={dropdownValue}
                  onChange={setDropdownValue}
                  placeholder="📋 Выберите"
                />
                <Toggle
                  checked={toggleValue}
                  onChange={setToggleValue}
                  label="🔘 Настройка"
                />
              </div>
            </Card>
          </div>

        {/* ЦЕНТРАЛЬНАЯ ОБЛАСТЬ - РАБОЧЕЕ ПРОСТРАНСТВО */}
        <div className="col-span-6">
            <Card variant="elevated" className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">🎯 Рабочее пространство</h3>
                <div className="flex gap-2">
                  <Badge variant="success">Активно</Badge>
                  <Badge variant="info">BPMN</Badge>
                </div>
              </div>
              
              {/* Карусель как основной контент */}
              <Carousel 
                items={carouselItems}
                autoPlay={true}
                autoPlayInterval={4000}
                showDots={true}
                showArrows={true}
              />
            </Card>
          </div>

        {/* ПРАВАЯ ПАНЕЛЬ - СВОЙСТВА И ПРОГРЕСС */}
        <div className="col-span-3 space-y-4">
            <Card variant="glass">
              <h3 className="text-lg font-semibold mb-4">⚙️ Свойства</h3>
              <div className="space-y-4">
                <Progress 
                  value={progressValue} 
                  variant="default" 
                  size="lg"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                  >
                    ➖
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                  >
                    ➕
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <h3 className="text-lg font-semibold mb-4">🏷️ Статусы</h3>
              <div className="space-y-2">
                <Badge variant="default" className="w-full justify-center">📘 Default</Badge>
                <Badge variant="success" className="w-full justify-center">✅ Success</Badge>
                <Badge variant="warning" className="w-full justify-center">⚠️ Warning</Badge>
                <Badge variant="error" className="w-full justify-center">❌ Error</Badge>
              </div>
            </Card>

            <Card variant="glass">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">🪟 Модальное окно</h3>
                <Button 
                  variant="primary" 
                  onClick={() => setModalOpen(true)}
                  className="w-full"
                >
                  Открыть модалку
                </Button>
              </div>
            </Card>
          </div>
      </MainContent>

      {/* МОДАЛЬНОЕ ОКНО */}
      <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="🎉 Модальное окно"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Это пример модального окна с liquid glass эффектами! 
              Оно имеет полупрозрачный фон с размытием.
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setModalOpen(false)}
              >
                Отмена
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setModalOpen(false)}
              >
                Подтвердить
              </Button>
            </div>
          </div>
      </Modal>

      <Footer 
        copyright="© 2024 Analytics Project. Все права защищены."
        links={[
          { label: 'О проекте', href: '/about' },
          { label: 'Документация', href: '/docs' },
          { label: 'GitHub', href: 'https://github.com' }
        ]}
      />
    </>
  )
}
