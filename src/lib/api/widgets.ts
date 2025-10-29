import { createClient } from '../supabase/client';
import { Database } from '../database.types';

type Widget = Database['public']['Tables']['widgets']['Row'];
type WidgetInsert = Database['public']['Tables']['widgets']['Insert'];
type WidgetUpdate = Database['public']['Tables']['widgets']['Update'];

const supabase = createClient();

export async function fetchWidgets(userId: string) {
  const { data, error } = await supabase
    .from('widgets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Widget[];
}

export async function fetchWidgetsByCategory(userId: string, categoryId: string) {
  const { data, error } = await supabase
    .from('widgets')
    .select('*')
    .eq('user_id', userId)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Widget[];
}

export async function createWidget(widget: WidgetInsert) {
  const { data, error } = await supabase
    .from('widgets')
    .insert(widget)
    .select()
    .single();

  if (error) throw error;
  return data as Widget;
}

export async function updateWidget(id: string, updates: WidgetUpdate) {
  const { data, error } = await supabase
    .from('widgets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Widget;
}

export async function deleteWidget(id: string) {
  const { error } = await supabase
    .from('widgets')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
