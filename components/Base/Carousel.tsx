'use client'

import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  content?: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Автопрокрутка
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  if (items.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Контейнер карусели */}
      <div className="relative overflow-hidden rounded-2xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative p-8 md:p-12">
                {item.image && (
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                )}
                
                <div className="text-center space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      {item.description}
                    </p>
                  )}
                  
                  {item.content && (
                    <div className="max-w-2xl mx-auto">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Стрелки навигации */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/20 
                       backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                       flex items-center justify-center text-gray-700 dark:text-gray-300
                       hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200
                       shadow-lg"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/20 
                       backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                       flex items-center justify-center text-gray-700 dark:text-gray-300
                       hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200
                       shadow-lg"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Индикаторы (точки) */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}
    </div>
  );
};
