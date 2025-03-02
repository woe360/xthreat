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
      user_sessions: {
        Row: {
          id: string
          user_id: string
          event_type: "login" | "logout"
          timestamp: string
          ip_address: string | null
          user_agent: string | null
          device_info: Json | null
          session_id: string | null
          session_status: string | null
          last_active_at: string | null
          session_duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: "login" | "logout"
          timestamp: string
          ip_address?: string | null
          user_agent?: string | null
          device_info?: Json | null
          session_id?: string | null
          session_status?: string | null
          last_active_at?: string | null
          session_duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: "login" | "logout"
          timestamp?: string
          ip_address?: string | null
          user_agent?: string | null
          device_info?: Json | null
          session_id?: string | null
          session_status?: string | null
          last_active_at?: string | null
          session_duration?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 