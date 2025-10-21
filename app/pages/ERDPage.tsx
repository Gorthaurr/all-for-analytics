'use client'

import React from 'react';
import { ERDProvider } from '@/components/ERD/ERDContext';
import { DiagramCanvas } from '@/components/ERD/DiagramCanvas';
import { NodeToolbar } from '@/components/ERD/NodeToolbar';
import { PropertyPanel } from '@/components/ERD/PropertyPanel';
import { DiagramToolbar } from '@/components/ERD/DiagramToolbar';
import { Minimap } from '@/components/ERD/Minimap';
import { ValidationPanel } from '@/components/ERD/ValidationPanel';
import { ExportTools } from '@/components/ERD/ExportTools';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MainContent } from '@/components/ui/MainContent';
import { useERD } from '@/components/ERD/ERDContext';

const ERDWorkspace: React.FC = () => {
  const { 
    nodes, 
    connections, 
    selectedNodeId,
    addNode, 
    updateNode, 
    deleteNode, 
    selectNode,
    clearDiagram,
    exportDiagram
  } = useERD();

  const handleAddEntity = () => {
    addNode({
      type: 'entity',
      name: 'Новая сущность',
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100
    });
  };

  const handleAddAttribute = () => {
    addNode({
      type: 'attribute',
      name: 'Новый атрибут',
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100
    });
  };

  const handleAddRelationship = () => {
    addNode({
      type: 'relationship',
      name: 'Новая связь',
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100
    });
  };

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  // Моковые данные для валидации
  const validationIssues = [
    {
      id: '1',
      type: 'warning' as const,
      message: 'Сущность "Пользователь" не имеет первичного ключа',
      nodeId: 'user_entity'
    }
  ];

  const handleExport = (format: 'png' | 'svg' | 'json') => {
    if (format === 'json') {
      const data = exportDiagram();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'erd-diagram.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        title="🗄️ ER Диаграмма"
        subtitle="Создание Entity-Relationship диаграмм"
        showApiToggle={false}
      />
      
      {/* Верхняя панель инструментов */}
      <DiagramToolbar
        onSave={() => console.log('Save')}
        onLoad={() => console.log('Load')}
        onClear={clearDiagram}
        onExport={handleExport}
        onZoomIn={() => console.log('Zoom In')}
        onZoomOut={() => console.log('Zoom Out')}
        onZoomReset={() => console.log('Zoom Reset')}
      />
      
      <MainContent layout="flex" className="flex-1">
        <div className="flex gap-6 h-full">
          {/* Левая панель - Инструменты */}
          <div className="w-64 flex-shrink-0 space-y-4">
            <NodeToolbar
              onAddEntity={handleAddEntity}
              onAddAttribute={handleAddAttribute}
              onAddRelationship={handleAddRelationship}
            />
            
            <PropertyPanel
              selectedNode={selectedNode}
              onUpdateNode={updateNode}
            />
          </div>

          {/* Центральная область - Холст */}
          <div className="flex-1">
            <DiagramCanvas 
              nodes={nodes} 
              connections={connections}
              onNodeUpdate={updateNode}
              onNodeDelete={deleteNode}
            />
          </div>

          {/* Правая панель - Дополнительные инструменты */}
          <div className="w-64 flex-shrink-0 space-y-4">
            <Minimap
              nodes={nodes.map(node => ({ id: node.id, type: node.type, x: node.x, y: node.y }))}
              connections={connections.map(conn => ({
                id: conn.id,
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 }
              }))}
              viewport={{ x: 0, y: 0, width: 800, height: 600 }}
              onViewportChange={() => {}}
            />
            
            <ValidationPanel
              issues={validationIssues}
              onIssueClick={(issue) => console.log('Issue clicked:', issue)}
            />
            
            <ExportTools
              onExportPNG={() => handleExport('png')}
              onExportSVG={() => handleExport('svg')}
              onExportJSON={() => handleExport('json')}
            />
          </div>
        </div>
      </MainContent>

      <Footer />
    </div>
  );
};

export default function ERDPage() {
  return (
    <ERDProvider>
      <ERDWorkspace />
    </ERDProvider>
  );
}
