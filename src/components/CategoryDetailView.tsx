'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, Lightbulb, Search, ExternalLink, Moon, Sun, Trash2 } from 'lucide-react';
import { Category, Widget, SavedItem } from '../types';

interface CategoryDetailViewProps {
  category: Category;
  widgets: Widget[];
  savedItems: SavedItem[];
  darkMode: boolean;
  onBack: () => void;
  onSave: (widget: Widget) => void;
  onUnsave: (widgetId: string) => void;
  onDelete: (widgetId: string) => void;
  onToggleDarkMode: () => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  widgets,
  savedItems,
  darkMode,
  onBack,
  onSave,
  onUnsave,
  onDelete,
  onToggleDarkMode,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [expandedResearch, setExpandedResearch] = useState(false);
  const [ideaContent, setIdeaContent] = useState('');

  const categoryWidgets = widgets.filter(w => w.category_id === category.id);
  const currentWidget = categoryWidgets[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < categoryWidgets.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setExpandedResearch(false);
      setIdeaContent('');
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setExpandedResearch(false);
      setIdeaContent('');
    }
  };

  const generateIdea = () => {
    const ideas = [
      'Build an automation tool for this workflow',
      'Create a learning roadmap from this content',
      'Develop a case study for your current project',
      'Start a tutorial series on this topic'
    ];
    setIdeaContent(ideas[Math.floor(Math.random() * ideas.length)]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
          <button onClick={onBack} className={`flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>
            <ChevronLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <h2 className="text-xl sm:text-2xl">{category.name}</h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{currentCardIndex + 1} / {categoryWidgets.length}</span>
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {currentWidget ? (
          <div className="relative">
            <div className={`${darkMode ? 'bg-[#141414] border-gray-800' : 'bg-gray-50 border-gray-200'} rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl mb-2">{currentWidget.title}</h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{new Date(currentWidget.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base leading-relaxed mb-6`}>{currentWidget.summary}</p>

              {expandedResearch && (
                <div className={`${darkMode ? 'bg-[#0a0a0a] border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>Research Insights</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed`}>
                    This content relates to broader trends in {currentWidget.category_name}. Consider exploring foundational concepts, 
                    related tools, community discussions, and practical implementations. Key areas include methodology improvements, 
                    ecosystem developments, and emerging best practices.
                  </p>
                </div>
              )}

              {ideaContent && (
                <div className={`${darkMode ? 'bg-[#0a0a0a] border-yellow-900/30' : 'bg-yellow-50 border-yellow-200'} border rounded-xl p-6 mb-6`}>
                  <p className={`text-sm ${darkMode ? 'text-yellow-600' : 'text-yellow-700'} mb-3`}>💡 Generated Idea</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed`}>{ideaContent}</p>
                </div>
              )}

              <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
                <button
                  onClick={() => savedItems.some(s => s.widget_id === currentWidget.id) ? onUnsave(currentWidget.id) : onSave(currentWidget)}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition"
                >
                  <Bookmark size={14} fill={savedItems.some(s => s.widget_id === currentWidget.id) ? 'currentColor' : 'none'} />
                  <span className="hidden sm:inline">{savedItems.some(s => s.widget_id === currentWidget.id) ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={() => setExpandedResearch(!expandedResearch)}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition"
                >
                  <Search size={14} />
                  <span className="hidden sm:inline">Research</span>
                </button>
                <button
                  onClick={generateIdea}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition"
                >
                  <Lightbulb size={14} />
                  <span className="hidden sm:inline">Idea</span>
                </button>
                <a
                  href={currentWidget.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <button
                  onClick={() => onDelete(currentWidget.id)}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <Trash2 size={14} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className={`p-2.5 sm:p-3 rounded-full transition ${
                  currentCardIndex === 0
                    ? darkMode ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <ChevronLeft size={20} className="sm:hidden" />
                <ChevronLeft size={24} className="hidden sm:block" />
              </button>

              <div className="flex gap-1.5 sm:gap-2">
                {categoryWidgets.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentCardIndex 
                        ? darkMode ? 'bg-white w-6 sm:w-8' : 'bg-black w-6 sm:w-8'
                        : darkMode ? 'bg-gray-700 w-1.5' : 'bg-gray-300 w-1.5'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCard}
                disabled={currentCardIndex === categoryWidgets.length - 1}
                className={`p-2.5 sm:p-3 rounded-full transition ${
                  currentCardIndex === categoryWidgets.length - 1
                    ? darkMode ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <ChevronRight size={20} className="sm:hidden" />
                <ChevronRight size={24} className="hidden sm:block" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>No content available</p>
          </div>
        )}
      </div>
    </div>
  );
};