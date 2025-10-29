'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  darkMode: boolean;
  onCategoryClick: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  darkMode,
  onCategoryClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category)}
          className={`group ${darkMode ? 'bg-[#141414] border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-900'} rounded-2xl p-5 sm:p-6 border hover:shadow-xl transition-all text-left min-h-[140px] sm:min-h-auto`}
        >
          <h3 className={`text-lg sm:text-xl ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3`}>{category.name}</h3>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 sm:mb-4`}>{category.channels.length} sources</p>
          <div className={`flex items-center text-xs sm:text-sm ${darkMode ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-gray-900'} transition`}>
            <span>View updates</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </button>
      ))}
    </div>
  );
};