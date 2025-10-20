'use client'

import React from 'react';
import { setEnvironment, getApiConfig } from '../../config/api';

export const EnvironmentToggle: React.FC = () => {
  const [isProduction, setIsProduction] = React.useState(false);
  const currentConfig = getApiConfig();

  const handleToggle = (production: boolean) => {
    setIsProduction(production);
    setEnvironment(production);
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Environment:
      </span>
      
      <div className="flex bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => handleToggle(false)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            !isProduction
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Localhost
        </button>
        <button
          onClick={() => handleToggle(true)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            isProduction
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Production
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div className={`w-2 h-2 rounded-full ${!isProduction ? 'bg-green-500' : 'bg-blue-500'}`} />
        <span>{currentConfig.baseUrl}</span>
      </div>
    </div>
  );
};
