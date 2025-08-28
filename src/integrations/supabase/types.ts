export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          campaign_id: string
          id: string
          kol_id: string | null
          metric_name: string
          metric_value: number
          recorded_at: string | null
        }
        Insert: {
          campaign_id: string
          id?: string
          kol_id?: string | null
          metric_name: string
          metric_value: number
          recorded_at?: string | null
        }
        Update: {
          campaign_id?: string
          id?: string
          kol_id?: string | null
          metric_name?: string
          metric_value?: number
          recorded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_kol_id_fkey"
            columns: ["kol_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_applications: {
        Row: {
          applied_at: string | null
          campaign_id: string
          cover_letter: string | null
          deliverables: string[] | null
          id: string
          kol_id: string
          proposed_rate: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applied_at?: string | null
          campaign_id: string
          cover_letter?: string | null
          deliverables?: string[] | null
          id?: string
          kol_id: string
          proposed_rate: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_at?: string | null
          campaign_id?: string
          cover_letter?: string | null
          deliverables?: string[] | null
          id?: string
          kol_id?: string
          proposed_rate?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_applications_kol_id_fkey"
            columns: ["kol_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          application_deadline: string | null
          applications_count: number | null
          budget_max: number | null
          budget_min: number | null
          campaign_end_date: string | null
          campaign_start_date: string | null
          created_at: string | null
          deliverables: string[] | null
          description: string
          duration_days: number | null
          id: string
          project_id: string
          requirements: string[] | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          applications_count?: number | null
          budget_max?: number | null
          budget_min?: number | null
          campaign_end_date?: string | null
          campaign_start_date?: string | null
          created_at?: string | null
          deliverables?: string[] | null
          description: string
          duration_days?: number | null
          id?: string
          project_id: string
          requirements?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          applications_count?: number | null
          budget_max?: number | null
          budget_min?: number | null
          campaign_end_date?: string | null
          campaign_start_date?: string | null
          created_at?: string | null
          deliverables?: string[] | null
          description?: string
          duration_days?: number | null
          id?: string
          project_id?: string
          requirements?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      kol_profiles: {
        Row: {
          availability: boolean | null
          created_at: string | null
          display_name: string
          hourly_rate: number | null
          id: string
          languages: string[] | null
          rating: number | null
          specialties: string[] | null
          time_zone: string | null
          total_campaigns: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          display_name: string
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          rating?: number | null
          specialties?: string[] | null
          time_zone?: string | null
          total_campaigns?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          display_name?: string
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          rating?: number | null
          specialties?: string[] | null
          time_zone?: string | null
          total_campaigns?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kol_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          campaign_id: string | null
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string
          sender_id: string
          subject: string | null
        }
        Insert: {
          campaign_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id: string
          sender_id: string
          subject?: string | null
        }
        Update: {
          campaign_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_profiles: {
        Row: {
          company_name: string
          company_size: string | null
          created_at: string | null
          description: string | null
          id: string
          industry: string | null
          total_campaigns: number | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          total_campaigns?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          total_campaigns?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          twitter_followers_count: number | null
          twitter_id: string | null
          twitter_username: string | null
          twitter_verified: boolean | null
          updated_at: string | null
          user_type: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id: string
          twitter_followers_count?: number | null
          twitter_id?: string | null
          twitter_username?: string | null
          twitter_verified?: boolean | null
          updated_at?: string | null
          user_type: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          twitter_followers_count?: number | null
          twitter_id?: string | null
          twitter_username?: string | null
          twitter_verified?: boolean | null
          updated_at?: string | null
          user_type?: string
          website_url?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
