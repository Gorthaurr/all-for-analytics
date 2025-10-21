'use client'

import React from 'react';
import { Input } from '@/components/Base/Input';
import { Button } from '@/components/Base/Button';
import { Toggle } from '@/components/Base/Toggle';
import { Dropdown } from '@/components/Base/Dropdown';

interface PropertyPanelProps {
  selectedNode?: {
    id: string;
    type: 'entity' | 'attribute' | 'relationship';
    name: string;
    properties?: Record<string, any>;
  } | null;
  onUpdateNode?: (id: string, updates: any) => void;
  className?: string;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedNode,
  onUpdateNode,
  className = ''
}) => {
  const [name, setName] = React.useState(selectedNode?.name || '');
  const [isKey, setIsKey] = React.useState(selectedNode?.properties?.isKey || false);
  const [isRequired, setIsRequired] = React.useState(selectedNode?.properties?.isRequired || false);
  const [cardinality, setCardinality] = React.useState(selectedNode?.properties?.cardinality || '1:N');

  React.useEffect(() => {
    if (selectedNode) {
      setName(selectedNode.name);
      setIsKey(selectedNode.properties?.isKey || false);
      setIsRequired(selectedNode.properties?.isRequired || false);
      setCardinality(selectedNode.properties?.cardinality || '1:N');
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode && onUpdateNode) {
      onUpdateNode(selectedNode.id, {
        name,
        properties: {
          ...selectedNode.properties,
          isKey,
          isRequired,
          cardinality
        }
      });
    }
  };

  const cardinalityOptions = [
    { value: '1:1', label: '1:1 (Один к одному)' },
    { value: '1:N', label: '1:N (Один ко многим)' },
    { value: 'N:1', label: 'N:1 (Многие к одному)' },
    { value: 'M:N', label: 'M:N (Многие ко многим)' }
  ];

  if (!selectedNode) {
    return (
      <div className={`
        p-4 bg-white/80 dark:bg-gray-800/80
        backdrop-blur-xl border border-white/20 dark:border-gray-700/20
        rounded-xl shadow-lg
        ${className}
      `}>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          ⚙️ Свойства
        </h3>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-sm">Выберите узел для редактирования</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      p-4 bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl border border-white/20 dark:border-gray-700/20
      rounded-xl shadow-lg
      ${className}
    `}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        ⚙️ Свойства {selectedNode.type === 'entity' ? 'сущности' : 
                     selectedNode.type === 'attribute' ? 'атрибута' : 'связи'}
      </h3>

      <div className="space-y-4">
        {/* Название */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Название
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
          />
        </div>

        {/* Специфичные свойства для атрибутов */}
        {selectedNode.type === 'attribute' && (
          <>
            <Toggle
              checked={isKey}
              onChange={setIsKey}
              label="🔑 Первичный ключ"
            />
            <Toggle
              checked={isRequired}
              onChange={setIsRequired}
              label="⚠️ Обязательный"
            />
          </>
        )}

        {/* Специфичные свойства для связей */}
        {selectedNode.type === 'relationship' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Мощность связи
            </label>
            <Dropdown
              options={cardinalityOptions}
              value={cardinality}
              onChange={setCardinality}
              placeholder="Выберите тип связи"
            />
          </div>
        )}

        {/* Кнопка сохранения */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          className="w-full"
        >
          💾 Сохранить
        </Button>
      </div>
    </div>
  );
};
