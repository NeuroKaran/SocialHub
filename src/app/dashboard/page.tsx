'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Moon, Sun, LogOut, Search } from 'lucide-react';
import { CategoryGrid } from '../../components/CategoryGrid';
import { CategoryDetailView } from '../../components/CategoryDetailView';
import { AddCategoryModal } from '../../components/AddCategoryModal';
import { SavedItemsGrid } from '../../components/SavedItemsGrid';
import { RandomSearchModal } from '../../components/RandomSearchModal';
import { createClient } from '../../lib/supabase/client';
import { Category, Widget, SavedItem, NewCategory } from '../../types';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showRandomSearch, setShowRandomSearch] = useState(false);
  const [newCategory, setNewCategory] = useState<NewCategory>({ name: '', channels: '' });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const loadUserData = React.useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }

      setUserId(user.id);

      // Load user preferences
      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (prefs) {
        setDarkMode(prefs.dark_mode);
      }

      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Load widgets
      const { data: widgetsData } = await supabase
        .from('widgets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (widgetsData) {
        setWidgets(widgetsData);
      }

      // Load saved items
      const { data: savedData } = await supabase
        .from('saved_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (savedData) {
        setSavedItems(savedData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  }, [supabase, router]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const addCategory = async () => {
    if (!newCategory.name || !newCategory.channels || !userId) return;

    try {
      const channelArray = newCategory.channels.split('\n').filter(c => c.trim());
      
      const { data, error } = await supabase
        .from('categories')
        .insert({
          user_id: userId,
          name: newCategory.name,
          channels: channelArray
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setCategories([data, ...categories]);
        setNewCategory({ name: '', channels: '' });
        setShowAddCategory(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const fetchContent = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || !userId) return;

    try {
      const mockWidgets = category.channels.slice(0, 3).map((channel) => ({
        user_id: userId,
        category_id: categoryId,
        category_name: category.name,
        title: `Latest from ${channel.split('/').pop()}`,
        summary: `AI-generated summary: Key developments in ${category.name.toLowerCase()} covering new techniques, practical applications, and real-world implementations.`,
        video_url: channel,
      }));

      const { data, error } = await supabase
        .from('widgets')
        .insert(mockWidgets)
        .select();

      if (error) throw error;

      if (data) {
        setWidgets([...data, ...widgets]);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const openCategory = (category: Category) => {
    setSelectedCategory(category);
    if (!widgets.some(w => w.category_id === category.id)) {
      fetchContent(category.id);
    }
  };

  const closeCategory = () => {
    setSelectedCategory(null);
  };

  const saveWidget = async (widget: Widget) => {
    if (!userId) return;

    try {
      const exists = savedItems.find(item => item.widget_id === widget.id);
      if (exists) return;

      const { data, error } = await supabase
        .from('saved_items')
        .insert({
          user_id: userId,
          widget_id: widget.id,
          category_name: widget.category_name,
          title: widget.title,
          summary: widget.summary,
          video_url: widget.video_url,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setSavedItems([data, ...savedItems]);
      }
    } catch (error) {
      console.error('Error saving widget:', error);
    }
  };

  const unsaveWidget = async (widgetId: string) => {
    try {
      const savedItem = savedItems.find(item => item.widget_id === widgetId);
      if (!savedItem) return;

      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('id', savedItem.id);

      if (error) throw error;

      setSavedItems(savedItems.filter(item => item.widget_id !== widgetId));
    } catch (error) {
      console.error('Error unsaving widget:', error);
    }
  };

  const handleDeleteWidget = async (widgetId: string) => {
    try {
      const response = await fetch(`/api/widgets/${widgetId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete widget');
      }

      setWidgets(widgets.filter(widget => widget.id !== widgetId));
    } catch (error) {
      console.error('Error deleting widget:', error);
    }
  };

  const toggleDarkMode = async () => {
    if (!userId) return;

    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    try {
      await supabase
        .from('user_preferences')
        .update({ dark_mode: newDarkMode })
        .eq('user_id', userId);
    } catch (error) {
      console.error('Error updating dark mode:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleRandomSearch = async (categoryId: string, description: string) => {
    try {
      const category = categories.find(c => c.id === categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      const searchQuery = `${category.name} ${description}`;

      const webSearchResponse = await fetch('/api/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const webSearchData = await webSearchResponse.json();

      if (!webSearchResponse.ok) {
        throw new Error(webSearchData.error || 'Failed to fetch search results');
      }

      const searchResults = webSearchData.searchResults;

      const response = await fetch('/api/random-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, description, searchResults }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate search results');
      }

      if (data.success && data.widgets) {
        // Add new widgets to the state
        setWidgets([...data.widgets, ...widgets]);
        
        // Open the category to show the new widgets
        if (category) {
          setSelectedCategory(category);
        }
      }
    } catch (error: unknown) {
      console.error('Error in random search:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <CategoryDetailView
        category={selectedCategory}
        widgets={widgets}
        savedItems={savedItems}
        darkMode={darkMode}
        onBack={closeCategory}
        onSave={saveWidget}
        onUnsave={unsaveWidget}
        onDelete={handleDeleteWidget}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>SocialHub</h1>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your curated knowledge stream</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 sm:p-3 rounded-xl transition ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun size={18} className="text-white" /> : <Moon size={18} />}
            </button>
            <button
              onClick={handleLogout}
              className={`p-2.5 sm:p-3 rounded-xl transition ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Logout"
            >
              <LogOut size={18} className={darkMode ? 'text-white' : ''} />
            </button>
            <button
              onClick={() => setShowRandomSearch(true)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl transition text-sm sm:text-base ${
                darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              title="Random Search"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              onClick={() => setShowAddCategory(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition text-sm sm:text-base"
            >
              <Plus size={18} />
              <span className="hidden xs:inline">New Category</span>
              <span className="xs:hidden">New</span>
            </button>
          </div>
        </div>

        {showAddCategory && (
          <AddCategoryModal
            darkMode={darkMode}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            onAdd={addCategory}
            onClose={() => setShowAddCategory(false)}
          />
        )}

        {showRandomSearch && (
          <RandomSearchModal
            darkMode={darkMode}
            categories={categories}
            onClose={() => setShowRandomSearch(false)}
            onSearch={handleRandomSearch}
          />
        )}

        {categories.length === 0 ? (
          <div className="text-center py-20">
            <div className={`${darkMode ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'} rounded-2xl p-12 border inline-block`}>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>No categories yet</p>
              <button
                onClick={() => setShowAddCategory(true)}
                className={`text-sm ${darkMode ? 'text-white hover:underline' : 'text-gray-900 hover:underline'}`}
              >
                Create your first category
              </button>
            </div>
          </div>
        ) : (
          <CategoryGrid
            categories={categories}
            darkMode={darkMode}
            onCategoryClick={openCategory}
          />
        )}

        <SavedItemsGrid savedItems={savedItems} darkMode={darkMode} />
      </div>
    </div>
  );
}