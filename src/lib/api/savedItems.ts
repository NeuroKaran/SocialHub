import { createClient } from '../supabase/client';
import { Database } from '../database.types';

type SavedItem = Database['public']['Tables']['saved_items']['Row'];
type SavedItemInsert = Database['public']['Tables']['saved_items']['Insert'];

const supabase = createClient();

export async function fetchSavedItems(userId: string) {
  const { data, error } = await supabase
    .from('saved_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as SavedItem[];
}

export async function saveItem(savedItem: SavedItemInsert) {
  const { data, error } = await supabase
    .from('saved_items')
    .insert(savedItem)
    .select()
    .single();

  if (error) throw error;
  return data as SavedItem;
}

export async function unsaveItem(id: string) {
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
