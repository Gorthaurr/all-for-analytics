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
  EnvironmentToggle,
  Search
} from '@/components/Base'
import {
  EntityNode,
  AttributeNode,
  RelationshipNode,
  ConnectionLine,
  NodeToolbar,
  PropertyPanel,
  DiagramToolbar,
  Minimap,
  ValidationPanel,
  ExportTools
} from '@/components/ERD'

export default function Demo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('')
  const [toggleValue, setToggleValue] = useState(false)
  const [progressValue, setProgressValue] = useState(65)
  const [searchResults, setSearchResults] = useState<string[]>([])
  
  // ERD состояние
  const [selectedERDNode, setSelectedERDNode] = useState<any>(null)
  const [erdNodes, setErdNodes] = useState([
    { id: '1', type: 'entity', name: 'Пользователь', x: 20, y: 20 },
    { id: '2', type: 'attribute', name: 'ID', x: 320, y: 20, isKey: true },
    { id: '3', type: 'relationship', name: 'Имеет', x: 500, y: 20, cardinality: '1:N' as const }
  ])
  const [erdConnections] = useState([
    { id: '1', from: '1', to: '2', type: 'one-to-many' }
  ])

  const handleSearch = (query: string) => {
    console.log('Поиск:', query)
    // Имитация результатов поиска
    setSearchResults([
      `Результат 1 для "${query}"`,
      `Результат 2 для "${query}"`,
      `Результат 3 для "${query}"`
    ])
  }

  const handleClearSearch = () => {
    setSearchResults([])
  }

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
              <h3 className="text-lg font-semibold mb-4">🔍 Поиск</h3>
              <div className="space-y-3">
                <Search
                  placeholder="Поиск по проекту..."
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  showClearButton={true}
                />
                {searchResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Результаты поиска:
                    </h4>
                    {searchResults.map((result, index) => (
                      <div 
                        key={index}
                        className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-sm"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

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

        {/* СЕКЦИЯ: ERD КОМПОНЕНТЫ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            ERD компоненты
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Левая колонка - Инструменты */}
            <div className="space-y-6">
              <NodeToolbar
                onAddEntity={() => console.log('Add Entity')}
                onAddAttribute={() => console.log('Add Attribute')}
                onAddRelationship={() => console.log('Add Relationship')}
              />
              
              <PropertyPanel
                selectedNode={selectedERDNode}
                onUpdateNode={(id: string, updates: any) => console.log('Update node:', id, updates)}
              />
              
              <ValidationPanel
                issues={[
                  { id: '1', type: 'warning', message: 'Сущность не имеет атрибутов', nodeId: 'entity_1' }
                ]}
                onIssueClick={(issue: any) => console.log('Issue clicked:', issue)}
              />
            </div>

            {/* Правая колонка - Диаграмма */}
            <div className="space-y-6">
              <DiagramToolbar
                onSave={() => console.log('Save')}
                onLoad={() => console.log('Load')}
                onClear={() => console.log('Clear')}
                onExport={(format: any) => console.log('Export:', format)}
                onZoomIn={() => console.log('Zoom In')}
                onZoomOut={() => console.log('Zoom Out')}
                onZoomReset={() => console.log('Zoom Reset')}
              />
              
              <div className="relative h-96 w-full bg-gray-100/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30 overflow-hidden">
                {/* Мини-диаграмма с узлами */}
                <div className="relative w-full h-full">
                  {erdNodes.map((node) => {
                    const commonProps = {
                      key: node.id,
                      id: node.id,
                      name: node.name,
                      x: node.x,
                      y: node.y,
                      isSelected: selectedERDNode?.id === node.id,
                      onSelect: setSelectedERDNode,
                      onMove: (id: string, x: number, y: number) => {
                        setErdNodes(prev => prev.map(n => n.id === id ? {...n, x, y} : n))
                      }
                    };

                    switch (node.type) {
                      case 'entity':
                        return <EntityNode {...commonProps} />;
                      case 'attribute':
                        return <AttributeNode {...commonProps} isKey={node.isKey} />;
                      case 'relationship':
                        return <RelationshipNode {...commonProps} cardinality={node.cardinality} />;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Minimap
                  nodes={erdNodes.map(node => ({ id: node.id, type: node.type, x: node.x, y: node.y }))}
                  connections={erdConnections.map(conn => ({ id: conn.id, from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }))}
                  viewport={{ x: 0, y: 0, width: 400, height: 200 }}
                  onViewportChange={() => {}}
                />
                
                <ExportTools
                  onExportPNG={() => console.log('Export PNG')}
                  onExportSVG={() => console.log('Export SVG')}
                  onExportJSON={() => console.log('Export JSON')}
                  onExportPDF={() => console.log('Export PDF')}
                />
              </div>
            </div>
          </div>
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
