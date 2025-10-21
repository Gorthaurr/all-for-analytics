import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  className?: string;
  showClearButton?: boolean;
  autoFocus?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  placeholder = 'Поиск...',
  onSearch,
  onClear,
  className = '',
  showClearButton = true,
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2 w-full">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus={autoFocus}
            className="pr-12 w-full"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg 
              className="w-5 h-5 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Найти
          </Button>
          
          {showClearButton && (
            <Button
              variant="ghost"
              size="md"
              onClick={handleClear}
              className={query ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            >
              Очистить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
