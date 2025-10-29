'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { SavedItem } from '../types';

interface SavedItemsGridProps {
  savedItems: SavedItem[];
  darkMode: boolean;
}

export const SavedItemsGrid: React.FC<SavedItemsGridProps> = ({
  savedItems,
  darkMode,
}) => {
  if (savedItems.length === 0) return null;

  return (
    <div className="mt-12 sm:mt-16">
      <h2 className={`text-xl sm:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}>Saved</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {savedItems.map(item => (
          <div key={item.id} className={`${darkMode ? 'bg-[#141414] border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-900'} rounded-2xl p-5 sm:p-6 border hover:shadow-xl transition-all`}>
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>{item.category_name}</span>
              <Bookmark size={14} className="text-yellow-500" fill="currentColor" />
            </div>
            <h4 className={`text-base sm:text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{item.title}</h4>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};