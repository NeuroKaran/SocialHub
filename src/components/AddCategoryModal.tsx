'use client';

import React from 'react';
import { X } from 'lucide-react';
import { NewCategory } from '../types';

interface AddCategoryModalProps {
  darkMode: boolean;
  newCategory: NewCategory;
  setNewCategory: (category: NewCategory) => void;
  onAdd: () => void;
  onClose: () => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  darkMode,
  newCategory,
  setNewCategory,
  onAdd,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
      <div className={`${darkMode ? 'bg-[#141414] border border-gray-800' : 'bg-white'} rounded-2xl p-5 sm:p-6 md:p-8 max-w-md w-full shadow-2xl`}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className={`text-lg sm:text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>New Category</h3>
          <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} p-1`}>
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Category name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-200'} rounded-xl mb-3 sm:mb-4 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-gray-900'}`}
        />
        <textarea
          placeholder="YouTube channel URLs (one per line)"
          value={newCategory.channels}
          onChange={(e) => setNewCategory({ ...newCategory, channels: e.target.value })}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border ${darkMode ? 'bg-[#0a0a0a] border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-200'} rounded-xl mb-3 sm:mb-4 h-28 sm:h-32 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-gray-900'} resize-none`}
        />
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onAdd}
            className="flex-1 bg-white text-black py-2.5 sm:py-3 text-sm sm:text-base rounded-xl hover:bg-gray-200 transition"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className={`flex-1 ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};