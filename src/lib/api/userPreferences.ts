import { createClient } from '../supabase/client';
import { Database } from '../database.types';

type UserPreferences = Database['public']['Tables']['user_preferences']['Row'];
type UserPreferencesUpdate = Database['public']['Tables']['user_preferences']['Update'];

const supabase = createClient();

export async function fetchUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data as UserPreferences;
}

export async function updateUserPreferences(userId: string, updates: UserPreferencesUpdate) {
  const { data, error } = await supabase
    .from('user_preferences')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as UserPreferences;
}

export async function completeOnboarding(userId: string) {
  return updateUserPreferences(userId, { has_completed_onboarding: true });
}
