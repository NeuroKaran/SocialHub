'use client';

import React, { useState } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { Category } from '../types';

interface RandomSearchModalProps {
  darkMode: boolean;
  categories: Category[];
  onClose: () => void;
  onSearch: (categoryId: string, description: string) => Promise<void>;
}

export const RandomSearchModal: React.FC<RandomSearchModalProps> = ({
  darkMode,
  categories,
  onClose,
  onSearch,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!selectedCategoryId || !description.trim()) {
      setError('Please select a category and enter a description');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onSearch(selectedCategoryId, description);
      onClose();
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) || 'Failed to generate search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'} rounded-2xl border max-w-lg w-full p-6 shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Search size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Random Search
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode
                  ? 'bg-[#0a0a0a] border-gray-800 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            >
              <option value="">Choose a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Search Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you're looking for... (e.g., 'latest trends in AI', 'beginner tutorials on React')"
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border resize-none ${
                darkMode
                  ? 'bg-[#0a0a0a] border-gray-800 text-white placeholder-gray-600'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded-xl transition ${
                darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } disabled:opacity-50`}
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              disabled={loading || !selectedCategoryId || !description.trim()}
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
