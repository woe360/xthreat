export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          first_name: string | null
          last_name: string | null
          company_name: string | null
          company_size: string | null
          job_title: string | null
          selected_plan: string | null
          is_active: boolean
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          company_name?: string | null
          company_size?: string | null
          job_title?: string | null
          selected_plan?: string | null
          is_active?: boolean
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          company_name?: string | null
          company_size?: string | null
          job_title?: string | null
          selected_plan?: string | null
          is_active?: boolean
          metadata?: Record<string, any> | null
          created_at?: string
        }
      }
    }
  }
}