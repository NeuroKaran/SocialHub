export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          channels: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          channels?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          channels?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      widgets: {
        Row: {
          id: string
          user_id: string
          category_id: string
          category_name: string
          title: string
          summary: string
          video_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          category_name: string
          title: string
          summary: string
          video_url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          category_name?: string
          title?: string
          summary?: string
          video_url?: string
          created_at?: string
        }
      }
      saved_items: {
        Row: {
          id: string
          user_id: string
          widget_id: string
          category_name: string
          title: string
          summary: string
          video_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          widget_id: string
          category_name: string
          title: string
          summary: string
          video_url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          widget_id?: string
          category_name?: string
          title?: string
          summary?: string
          video_url?: string
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          dark_mode: boolean
          has_completed_onboarding: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          dark_mode?: boolean
          has_completed_onboarding?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          dark_mode?: boolean
          has_completed_onboarding?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
