export interface Category {
  id: string;
  user_id: string;
  name: string;
  channels: string[];
  created_at: string;
  updated_at: string;
}

export interface Widget {
  id: string;
  user_id: string;
  category_id: string;
  category_name: string;
  title: string;
  summary: string;
  video_url: string;
  created_at: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  widget_id: string;
  category_name: string;
  title: string;
  summary: string;
  video_url: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  dark_mode: boolean;
  has_completed_onboarding: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewCategory {
  name: string;
  channels: string;
}
