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
      achievement_progress: {
        Row: {
          achievement_id: string
          completed_at: string | null
          current_value: number | null
          id: string
          metadata: Json | null
          started_at: string | null
          target_value: number
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed_at?: string | null
          current_value?: number | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          target_value: number
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed_at?: string | null
          current_value?: number | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          target_value?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievement_progress_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievement_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievement_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      achievements: {
        Row: {
          badge_icon: string
          category: Database["public"]["Enums"]["achievement_category"] | null
          created_at: string | null
          description: string
          display_order: number | null
          icon_color: string | null
          id: string
          name: string
          points: number
          requirements: Json
        }
        Insert: {
          badge_icon: string
          category?: Database["public"]["Enums"]["achievement_category"] | null
          created_at?: string | null
          description: string
          display_order?: number | null
          icon_color?: string | null
          id?: string
          name: string
          points?: number
          requirements: Json
        }
        Update: {
          badge_icon?: string
          category?: Database["public"]["Enums"]["achievement_category"] | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          icon_color?: string | null
          id?: string
          name?: string
          points?: number
          requirements?: Json
        }
        Relationships: []
      }
      active_2fa_sessions: {
        Row: {
          created_at: string | null
          device_name: string
          id: string
          idle_since: string | null
          ip_address: string | null
          is_active: boolean | null
          last_activity: string | null
          last_used: string | null
          session_data: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_name: string
          id?: string
          idle_since?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          last_used?: string | null
          session_data?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_name?: string
          id?: string
          idle_since?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          last_used?: string | null
          session_data?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_2fa_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_2fa_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_feed: {
        Row: {
          activity_type: string
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_feed_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_feed_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      addons: {
        Row: {
          addon_type: string
          compatibility: string[] | null
          cost_usd: number | null
          created_at: string | null
          features: string[] | null
          id: string
          image_url: string | null
          installation_complexity:
            | Database["public"]["Enums"]["rating_type"]
            | null
          manufacturer: string
          name: string
          search_vector: unknown | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Insert: {
          addon_type: string
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          installation_complexity?:
            | Database["public"]["Enums"]["rating_type"]
            | null
          manufacturer: string
          name: string
          search_vector?: unknown | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Update: {
          addon_type?: string
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          installation_complexity?:
            | Database["public"]["Enums"]["rating_type"]
            | null
          manufacturer?: string
          name?: string
          search_vector?: unknown | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action_type: string
          admin_id: string | null
          changes: Json
          id: string
          ip_address: string | null
          performed_at: string | null
          target_id: string | null
          target_type: string
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          changes: Json
          id?: string
          ip_address?: string | null
          performed_at?: string | null
          target_id?: string | null
          target_type: string
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          changes?: Json
          id?: string
          ip_address?: string | null
          performed_at?: string | null
          target_id?: string | null
          target_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_audit_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_build_workflows: {
        Row: {
          component_types: string[]
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          validation_rules: Json
        }
        Insert: {
          component_types?: string[]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Update: {
          component_types?: string[]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Relationships: [
          {
            foreignKeyName: "admin_build_workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_build_workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_notification_preferences: {
        Row: {
          admin_id: string | null
          created_at: string | null
          enabled: boolean | null
          event_type: string
          id: string
          notification_method: string[] | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          enabled?: boolean | null
          event_type: string
          id?: string
          notification_method?: string[] | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          enabled?: boolean | null
          event_type?: string
          id?: string
          notification_method?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_notification_preferences_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_notification_preferences_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_notification_queue: {
        Row: {
          created_at: string | null
          event_data: Json
          event_type: string
          id: string
          processed_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          event_data: Json
          event_type: string
          id?: string
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json
          event_type?: string
          id?: string
          processed_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      admin_role_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_edit: boolean | null
          can_view: boolean | null
          created_at: string | null
          feature_key: string
          id: string
          role_id: string | null
          updated_at: string | null
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          feature_key: string
          id?: string
          role_id?: string | null
          updated_at?: string | null
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          feature_key?: string
          id?: string
          role_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          application_required: boolean | null
          assigned_at: string | null
          assigned_by: string | null
          auto_approve: boolean | null
          created_at: string | null
          deletion_protected: boolean | null
          description: string | null
          features: Json | null
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          application_required?: boolean | null
          assigned_at?: string | null
          assigned_by?: string | null
          auto_approve?: boolean | null
          created_at?: string | null
          deletion_protected?: boolean | null
          description?: string | null
          features?: Json | null
          id?: string
          permissions?: Json | null
          role: Database["public"]["Enums"]["admin_role_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          application_required?: boolean | null
          assigned_at?: string | null
          assigned_by?: string | null
          auto_approve?: boolean | null
          created_at?: string | null
          deletion_protected?: boolean | null
          description?: string | null
          features?: Json | null
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_type: Database["public"]["Enums"]["setting_type"]
          setting_value: Json
          ui_effects: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_type?: Database["public"]["Enums"]["setting_type"]
          setting_value: Json
          ui_effects?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_type?: Database["public"]["Enums"]["setting_type"]
          setting_value?: Json
          ui_effects?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      api_access_logs: {
        Row: {
          api_credential_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          ip_address: string | null
          method: string
          status_code: number | null
          user_agent: string | null
        }
        Insert: {
          api_credential_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: string | null
          method: string
          status_code?: number | null
          user_agent?: string | null
        }
        Update: {
          api_credential_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: string | null
          method?: string
          status_code?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_access_logs_api_credential_id_fkey"
            columns: ["api_credential_id"]
            isOneToOne: false
            referencedRelation: "api_credentials"
            referencedColumns: ["id"]
          },
        ]
      }
      api_credentials: {
        Row: {
          access_level: Database["public"]["Enums"]["api_access_level"] | null
          allowed_ips: string[] | null
          allowed_origins: string[] | null
          api_key: string
          api_secret: string
          created_at: string | null
          enabled: boolean | null
          expires_at: string | null
          id: string
          last_used_at: string | null
          metadata: Json | null
          name: string
          user_id: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["api_access_level"] | null
          allowed_ips?: string[] | null
          allowed_origins?: string[] | null
          api_key: string
          api_secret: string
          created_at?: string | null
          enabled?: boolean | null
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          metadata?: Json | null
          name: string
          user_id: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["api_access_level"] | null
          allowed_ips?: string[] | null
          allowed_origins?: string[] | null
          api_key?: string
          api_secret?: string
          created_at?: string | null
          enabled?: boolean | null
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          metadata?: Json | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      api_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_value: Json
          recorded_at: string | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: Json
          recorded_at?: string | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: Json
          recorded_at?: string | null
        }
        Relationships: []
      }
      api_request_logs: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          error_message: string | null
          id: string
          method: string
          response_time: number | null
          status_code: number | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          error_message?: string | null
          id?: string
          method: string
          response_time?: number | null
          status_code?: number | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          error_message?: string | null
          id?: string
          method?: string
          response_time?: number | null
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_request_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_credentials"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_attempts: {
        Row: {
          attempt_timestamp: string | null
          attempt_type: string
          id: string
          ip_address: string
          metadata: Json | null
          success: boolean | null
          user_id: string | null
        }
        Insert: {
          attempt_timestamp?: string | null
          attempt_type: string
          id?: string
          ip_address: string
          metadata?: Json | null
          success?: boolean | null
          user_id?: string | null
        }
        Update: {
          attempt_timestamp?: string | null
          attempt_type?: string
          id?: string
          ip_address?: string
          metadata?: Json | null
          success?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      base_product: {
        Row: {
          cost_usd: number | null
          created_at: string | null
          id: string
          image_url: string | null
          manufacturer: string
          name: string
          search_vector: unknown | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Insert: {
          cost_usd?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          manufacturer: string
          name: string
          search_vector?: unknown | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Update: {
          cost_usd?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string
          name?: string
          search_vector?: unknown | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
        }
        Relationships: []
      }
      bearings: {
        Row: {
          bearing_type: string
          compatibility: string[] | null
          cost_usd: number | null
          created_at: string | null
          dimensions: string | null
          durability_rating: Database["public"]["Enums"]["rating_type"] | null
          id: string
          image_url: string | null
          lubrication_type: string | null
          manufacturer: string
          material: string | null
          name: string
          noise_level: number | null
          search_vector: unknown | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Insert: {
          bearing_type: string
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          durability_rating?: Database["public"]["Enums"]["rating_type"] | null
          id?: string
          image_url?: string | null
          lubrication_type?: string | null
          manufacturer: string
          material?: string | null
          name: string
          noise_level?: number | null
          search_vector?: unknown | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Update: {
          bearing_type?: string
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          durability_rating?: Database["public"]["Enums"]["rating_type"] | null
          id?: string
          image_url?: string | null
          lubrication_type?: string | null
          manufacturer?: string
          material?: string | null
          name?: string
          noise_level?: number | null
          search_vector?: unknown | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
        }
        Relationships: []
      }
      blog_code_snippets: {
        Row: {
          code: string
          copy_count: number | null
          created_at: string | null
          id: string
          language: string
          post_id: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          copy_count?: number | null
          created_at?: string | null
          id?: string
          language: string
          post_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          copy_count?: number | null
          created_at?: string | null
          id?: string
          language?: string
          post_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_code_snippets_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean | null
          publication_status: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          publication_status?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          publication_status?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cms_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      build_comments: {
        Row: {
          build_id: string | null
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          build_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          build_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "build_comments_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "build_gallery_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_comments_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "printer_builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      build_component_analytics: {
        Row: {
          avg_cost: number | null
          component_id: string
          component_name: string
          created_at: string | null
          unique_users: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          avg_cost?: number | null
          component_id?: string
          component_name: string
          created_at?: string | null
          unique_users?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          avg_cost?: number | null
          component_id?: string
          component_name?: string
          created_at?: string | null
          unique_users?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      build_configurations: {
        Row: {
          components: Json
          created_at: string | null
          estimated_cost: number | null
          id: string
          is_complete: boolean | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          components: Json
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          is_complete?: boolean | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          components?: Json
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          is_complete?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "build_configurations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_configurations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      build_plates: {
        Row: {
          adhesion_quality: Database["public"]["Enums"]["rating_type"] | null
          compatibility: string[] | null
          cost_usd: number | null
          created_at: string | null
          dimensions: string | null
          durability_rating: Database["public"]["Enums"]["rating_type"] | null
          heat_resistance: number | null
          id: string
          image_url: string | null
          manufacturer: string
          name: string
          plate_type: string
          search_vector: unknown | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Insert: {
          adhesion_quality?: Database["public"]["Enums"]["rating_type"] | null
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          durability_rating?: Database["public"]["Enums"]["rating_type"] | null
          heat_resistance?: number | null
          id?: string
          image_url?: string | null
          manufacturer: string
          name: string
          plate_type: string
          search_vector?: unknown | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Update: {
          adhesion_quality?: Database["public"]["Enums"]["rating_type"] | null
          compatibility?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          durability_rating?: Database["public"]["Enums"]["rating_type"] | null
          heat_resistance?: number | null
          id?: string
          image_url?: string | null
          manufacturer?: string
          name?: string
          plate_type?: string
          search_vector?: unknown | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
        }
        Relationships: []
      }
      build_recommendations: {
        Row: {
          component_type: string
          created_at: string | null
          id: string
          reason: string
          score: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          component_type: string
          created_at?: string | null
          id?: string
          reason: string
          score: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          component_type?: string
          created_at?: string | null
          id?: string
          reason?: string
          score?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "build_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      build_submission_images: {
        Row: {
          annotations: Json | null
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          step_number: number | null
          submission_id: string | null
        }
        Insert: {
          annotations?: Json | null
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          step_number?: number | null
          submission_id?: string | null
        }
        Update: {
          annotations?: Json | null
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          step_number?: number | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "build_submission_images_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "build_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      build_submission_workflows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          steps_order: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          steps_order?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          steps_order?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      build_submissions: {
        Row: {
          build_time_hours: number | null
          build_type: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          estimated_cost: number | null
          id: string
          social_media_preferences: Json | null
          status: string
          title: string
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
          videos: Json | null
        }
        Insert: {
          build_time_hours?: number | null
          build_type: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_cost?: number | null
          id?: string
          social_media_preferences?: Json | null
          status?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          videos?: Json | null
        }
        Update: {
          build_time_hours?: number | null
          build_type?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_cost?: number | null
          id?: string
          social_media_preferences?: Json | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          videos?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "build_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      build_success_metrics: {
        Row: {
          build_type: string
          completion_rate: number
          created_at: string | null
          id: string
        }
        Insert: {
          build_type: string
          completion_rate: number
          created_at?: string | null
          id?: string
        }
        Update: {
          build_type?: string
          completion_rate?: number
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      build_updates: {
        Row: {
          build_id: string | null
          content: string
          created_at: string | null
          id: string
          images: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          build_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          build_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "build_updates_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "build_gallery_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_updates_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "printer_builds"
            referencedColumns: ["id"]
          },
        ]
      }
      build_verification_responses: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          question_id: string
          response: boolean
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          question_id: string
          response: boolean
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          question_id?: string
          response?: boolean
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "build_verification_responses_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "build_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      build_wizard_configs: {
        Row: {
          addons: Json | null
          build_volume: Json | null
          completed_at: string | null
          core_components: Json | null
          created_at: string | null
          estimated_cost: number | null
          id: string
          kinematic_type: Database["public"]["Enums"]["kinematic_type"] | null
          last_step_completed: number | null
          metadata: Json | null
          motion_components: Json | null
          name: string | null
          status: Database["public"]["Enums"]["build_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          addons?: Json | null
          build_volume?: Json | null
          completed_at?: string | null
          core_components?: Json | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          kinematic_type?: Database["public"]["Enums"]["kinematic_type"] | null
          last_step_completed?: number | null
          metadata?: Json | null
          motion_components?: Json | null
          name?: string | null
          status?: Database["public"]["Enums"]["build_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          addons?: Json | null
          build_volume?: Json | null
          completed_at?: string | null
          core_components?: Json | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          kinematic_type?: Database["public"]["Enums"]["kinematic_type"] | null
          last_step_completed?: number | null
          metadata?: Json | null
          motion_components?: Json | null
          name?: string | null
          status?: Database["public"]["Enums"]["build_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "build_wizard_configs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_wizard_configs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_blog_posts: {
        Row: {
          builder_id: string
          content: string
          created_at: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          builder_id: string
          content: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          builder_id?: string
          content?: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_blog_posts_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_blog_posts_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_blog_revisions: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          post_id: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          post_id: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          post_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "builder_blog_revisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_blog_revisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_blog_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "builder_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_pages: {
        Row: {
          breakpoint_config: Json | null
          content: Json
          created_at: string | null
          grid_settings: Json | null
          id: string
          is_published: boolean | null
          slug: string
          style_config: Json
          template_id: string | null
          title: string
          updated_at: string | null
          user_id: string
          visual_editor_settings: Json | null
        }
        Insert: {
          breakpoint_config?: Json | null
          content?: Json
          created_at?: string | null
          grid_settings?: Json | null
          id?: string
          is_published?: boolean | null
          slug: string
          style_config?: Json
          template_id?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          visual_editor_settings?: Json | null
        }
        Update: {
          breakpoint_config?: Json | null
          content?: Json
          created_at?: string | null
          grid_settings?: Json | null
          id?: string
          is_published?: boolean | null
          slug?: string
          style_config?: Json
          template_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          visual_editor_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_pages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "page_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_pages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_pages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_statistics: {
        Row: {
          builder_id: string | null
          created_at: string | null
          engagement_rate: number | null
          id: string
          total_comments: number | null
          total_likes: number | null
          total_views: number | null
          trending_coefficient: number | null
          updated_at: string | null
        }
        Insert: {
          builder_id?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          total_comments?: number | null
          total_likes?: number | null
          total_views?: number | null
          trending_coefficient?: number | null
          updated_at?: string | null
        }
        Update: {
          builder_id?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          total_comments?: number | null
          total_likes?: number | null
          total_views?: number | null
          trending_coefficient?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_statistics_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_statistics_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_ads: {
        Row: {
          campaign_id: string | null
          clicks: number | null
          content: string
          created_at: string | null
          cta_link: string | null
          cta_text: string | null
          id: string
          image_url: string | null
          impressions: number | null
          placement: string
          title: string
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicks?: number | null
          content: string
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          placement: string
          title: string
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicks?: number | null
          content?: string
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          placement?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_ads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          ad_id: string | null
          campaign_id: string | null
          clicks: number | null
          conversions: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
          spend: number | null
        }
        Insert: {
          ad_id?: string | null
          campaign_id?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          date: string
          id?: string
          impressions?: number | null
          spend?: number | null
        }
        Update: {
          ad_id?: string | null
          campaign_id?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "campaign_ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          status: string
          target_audience: Json | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          status?: string
          target_audience?: Json | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          status?: string
          target_audience?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      challenge_participants: {
        Row: {
          challenge_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          progress: Json
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: Json
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cms_content: {
        Row: {
          allow_comments: boolean | null
          author_id: string | null
          auto_save_data: Json | null
          content: string
          content_category: string | null
          content_type: string
          created_at: string | null
          difficulty_level: string | null
          id: string
          metadata: Json | null
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          allow_comments?: boolean | null
          author_id?: string | null
          auto_save_data?: Json | null
          content: string
          content_category?: string | null
          content_type: string
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          allow_comments?: boolean | null
          author_id?: string | null
          auto_save_data?: Json | null
          content?: string
          content_category?: string | null
          content_type?: string
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content_categories: {
        Row: {
          category_id: string
          content_id: string
        }
        Insert: {
          category_id: string
          content_id: string
        }
        Update: {
          category_id?: string
          content_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cms_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_categories_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content_index: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_postindex: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_challenges: {
        Row: {
          badge_id: string | null
          created_at: string | null
          created_by: string | null
          description: string
          end_date: string
          id: string
          requirements: Json
          reward_points: number
          start_date: string
          title: string
        }
        Insert: {
          badge_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          end_date: string
          id?: string
          requirements?: Json
          reward_points: number
          start_date: string
          title: string
        }
        Update: {
          badge_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          end_date?: string
          id?: string
          requirements?: Json
          reward_points?: number
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_challenges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          end_date: string | null
          event_type: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          registration_url: string | null
          start_date: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          end_date?: string | null
          event_type: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          registration_url?: string | null
          start_date: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          end_date?: string | null
          event_type?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          registration_url?: string | null
          start_date?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      community_highlights: {
        Row: {
          achievement_data: Json | null
          content_reference_id: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          highlight_type: string
          id: string
          is_active: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          achievement_data?: Json | null
          content_reference_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          highlight_type: string
          id?: string
          is_active?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          achievement_data?: Json | null
          content_reference_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          highlight_type?: string
          id?: string
          is_active?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      community_memberships: {
        Row: {
          community_id: string
          joined_at: string | null
          role: string
          user_id: string
        }
        Insert: {
          community_id: string
          joined_at?: string | null
          role?: string
          user_id: string
        }
        Update: {
          community_id?: string
          joined_at?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_memberships_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "sub_communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      component_compatibility: {
        Row: {
          compatibility_type: string
          compatible_with_id: string
          component_id: string
          created_at: string | null
          id: string
          notes: string | null
        }
        Insert: {
          compatibility_type: string
          compatible_with_id: string
          component_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
        }
        Update: {
          compatibility_type?: string
          compatible_with_id?: string
          component_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      component_compatibility_rules: {
        Row: {
          compatible_with_id: string
          component_id: string
          conditions: Json | null
          created_at: string | null
          id: string
          rule_type: string
        }
        Insert: {
          compatible_with_id: string
          component_id: string
          conditions?: Json | null
          created_at?: string | null
          id?: string
          rule_type: string
        }
        Update: {
          compatible_with_id?: string
          component_id?: string
          conditions?: Json | null
          created_at?: string | null
          id?: string
          rule_type?: string
        }
        Relationships: []
      }
      component_field_mappings: {
        Row: {
          created_at: string | null
          display_name: string
          field_name: string
          field_type: string
          id: string
          is_required: boolean | null
          table_name: string
          updated_at: string | null
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          field_name: string
          field_type: string
          id?: string
          is_required?: boolean | null
          table_name: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          field_name?: string
          field_type?: string
          id?: string
          is_required?: boolean | null
          table_name?: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Relationships: []
      }
      component_images: {
        Row: {
          component_id: string
          component_type: string
          content_type: string
          file_path: string
          file_size: number
          id: string
          metadata: Json | null
          original_name: string
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          component_id: string
          component_type: string
          content_type: string
          file_path: string
          file_size: number
          id?: string
          metadata?: Json | null
          original_name: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          component_id?: string
          component_type?: string
          content_type?: string
          file_path?: string
          file_size?: number
          id?: string
          metadata?: Json | null
          original_name?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      component_import_sessions: {
        Row: {
          component_type: string
          created_at: string | null
          id: string
          import_mode: Database["public"]["Enums"]["import_mode"]
          metadata: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          component_type: string
          created_at?: string | null
          id?: string
          import_mode: Database["public"]["Enums"]["import_mode"]
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          component_type?: string
          created_at?: string | null
          id?: string
          import_mode?: Database["public"]["Enums"]["import_mode"]
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      component_imports: {
        Row: {
          admin_id: string | null
          column_mappings: Json | null
          completed_at: string | null
          created_at: string | null
          current_stage: string | null
          id: string
          import_type: string
          metadata: Json | null
          original_filename: string
          processed_rows: number | null
          progress_percentage: number | null
          stage_progress: Json | null
          status: Database["public"]["Enums"]["import_status"] | null
          total_rows: number | null
          validation_errors: Json[] | null
        }
        Insert: {
          admin_id?: string | null
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_stage?: string | null
          id?: string
          import_type: string
          metadata?: Json | null
          original_filename: string
          processed_rows?: number | null
          progress_percentage?: number | null
          stage_progress?: Json | null
          status?: Database["public"]["Enums"]["import_status"] | null
          total_rows?: number | null
          validation_errors?: Json[] | null
        }
        Update: {
          admin_id?: string | null
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_stage?: string | null
          id?: string
          import_type?: string
          metadata?: Json | null
          original_filename?: string
          processed_rows?: number | null
          progress_percentage?: number | null
          stage_progress?: Json | null
          status?: Database["public"]["Enums"]["import_status"] | null
          total_rows?: number | null
          validation_errors?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "component_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      component_price_history: {
        Row: {
          component_id: string
          component_type: string
          id: string
          price: number
          recorded_at: string | null
        }
        Insert: {
          component_id: string
          component_type: string
          id?: string
          price: number
          recorded_at?: string | null
        }
        Update: {
          component_id?: string
          component_type?: string
          id?: string
          price?: number
          recorded_at?: string | null
        }
        Relationships: []
      }
      component_reviews: {
        Row: {
          comments: string | null
          component_id: string
          component_type: string
          created_at: string | null
          id: string
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
        }
        Insert: {
          comments?: string | null
          component_id: string
          component_type: string
          created_at?: string | null
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Update: {
          comments?: string | null
          component_id?: string
          component_type?: string
          created_at?: string | null
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Relationships: []
      }
      component_tag_relations: {
        Row: {
          component_id: string
          component_type: string
          created_at: string | null
          tag_id: string
        }
        Insert: {
          component_id: string
          component_type: string
          created_at?: string | null
          tag_id: string
        }
        Update: {
          component_id?: string
          component_type?: string
          created_at?: string | null
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "component_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      component_tags: {
        Row: {
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      component_valuations: {
        Row: {
          community_rating: number | null
          component_id: string
          component_type: string
          id: string
          last_updated: string | null
          market_value: number | null
          reliability_score: number | null
          value_coefficient: number | null
        }
        Insert: {
          community_rating?: number | null
          component_id: string
          component_type: string
          id?: string
          last_updated?: string | null
          market_value?: number | null
          reliability_score?: number | null
          value_coefficient?: number | null
        }
        Update: {
          community_rating?: number | null
          component_id?: string
          component_type?: string
          id?: string
          last_updated?: string | null
          market_value?: number | null
          reliability_score?: number | null
          value_coefficient?: number | null
        }
        Relationships: []
      }
      content_comments: {
        Row: {
          comment: string
          content_id: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          parent_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_comments_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      content_tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      content_tags_relation: {
        Row: {
          content_id: string
          tag_id: string
        }
        Insert: {
          content_id: string
          tag_id: string
        }
        Update: {
          content_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_relation_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_relation_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "content_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          content: string
          content_id: string | null
          content_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          metadata: Json | null
          version_number: number
        }
        Insert: {
          content: string
          content_id?: string | null
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          version_number: number
        }
        Update: {
          content?: string
          content_id?: string | null
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      contributions: {
        Row: {
          associated_hardware: string[] | null
          contribution_type: string
          contributor_name: string | null
          created_at: string | null
          description: string | null
          file_link: string | null
          id: string
          upvotes: number | null
        }
        Insert: {
          associated_hardware?: string[] | null
          contribution_type: string
          contributor_name?: string | null
          created_at?: string | null
          description?: string | null
          file_link?: string | null
          id?: string
          upvotes?: number | null
        }
        Update: {
          associated_hardware?: string[] | null
          contribution_type?: string
          contributor_name?: string | null
          created_at?: string | null
          description?: string | null
          file_link?: string | null
          id?: string
          upvotes?: number | null
        }
        Relationships: []
      }
      cooling_systems: {
        Row: {
          airflow_rating: number | null
          compatibility: string[] | null
          cooling_type: string
          cost_usd: number | null
          created_at: string | null
          fan_size: number | null
          id: string
          image_url: string | null
          mounting_type: string | null
          noise_level: number | null
          power_source: string | null
          summary: string | null
          today_trending: Database["public"]["Enums"]["trending_type"] | null
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"] | null
        }
        Insert: {
          airflow_rating?: number | null
          compatibility?: string[] | null
          cooling_type: string
          cost_usd?: number | null
          created_at?: string | null
          fan_size?: number | null
          id?: string
          image_url?: string | null
          mounting_type?: string | null
          noise_level?: number | null
          power_source?: string | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Update: {
          airflow_rating?: number | null
          compatibility?: string[] | null
          cooling_type?: string
          cost_usd?: number | null
          created_at?: string | null
          fan_size?: number | null
          id?: string
          image_url?: string | null
          mounting_type?: string | null
          noise_level?: number | null
          power_source?: string | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Relationships: []
      }
      core_settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_system: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          key: string
          updated_at?: string | null
          value?: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      cross_field_validation_rules: {
        Row: {
          condition_group: string | null
          condition_logic: Json | null
          condition_type: string
          created_at: string | null
          created_by: string | null
          custom_logic: string | null
          dependency_chain: Json | null
          description: string | null
          field1: string
          field2: string
          group_id: string | null
          id: string
          is_active: boolean | null
          name: string
          operator: string
          test_cases: Json | null
          updated_at: string | null
          validation_function: string | null
        }
        Insert: {
          condition_group?: string | null
          condition_logic?: Json | null
          condition_type: string
          created_at?: string | null
          created_by?: string | null
          custom_logic?: string | null
          dependency_chain?: Json | null
          description?: string | null
          field1: string
          field2: string
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          operator: string
          test_cases?: Json | null
          updated_at?: string | null
          validation_function?: string | null
        }
        Update: {
          condition_group?: string | null
          condition_logic?: Json | null
          condition_type?: string
          created_at?: string | null
          created_by?: string | null
          custom_logic?: string | null
          dependency_chain?: Json | null
          description?: string | null
          field1?: string
          field2?: string
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          operator?: string
          test_cases?: Json | null
          updated_at?: string | null
          validation_function?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cross_field_validation_rules_condition_group_fkey"
            columns: ["condition_group"]
            isOneToOne: false
            referencedRelation: "validation_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cross_field_validation_rules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "validation_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      csv_import_logs: {
        Row: {
          admin_id: string | null
          completed_at: string | null
          created_at: string | null
          errors: Json[] | null
          file_name: string
          id: string
          processed_rows: number | null
          row_count: number | null
          status: string | null
        }
        Insert: {
          admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          errors?: Json[] | null
          file_name: string
          id?: string
          processed_rows?: number | null
          row_count?: number | null
          status?: string | null
        }
        Update: {
          admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          errors?: Json[] | null
          file_name?: string
          id?: string
          processed_rows?: number | null
          row_count?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "csv_import_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "csv_import_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      csv_import_rollbacks: {
        Row: {
          backup_data: Json
          created_at: string | null
          id: string
          import_id: string | null
          restored_at: string | null
          restored_by: string | null
          status: string | null
        }
        Insert: {
          backup_data: Json
          created_at?: string | null
          id?: string
          import_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: string | null
        }
        Update: {
          backup_data?: Json
          created_at?: string | null
          id?: string
          import_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "csv_import_rollbacks_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "csv_imports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "csv_import_rollbacks_restored_by_fkey"
            columns: ["restored_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "csv_import_rollbacks_restored_by_fkey"
            columns: ["restored_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      csv_imports: {
        Row: {
          admin_id: string | null
          completed_at: string | null
          created_at: string | null
          errors: Json | null
          file_name: string
          file_path: string
          id: string
          import_type: string
          metadata: Json | null
          processed_rows: number | null
          row_count: number | null
          status: string
        }
        Insert: {
          admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          errors?: Json | null
          file_name: string
          file_path: string
          id?: string
          import_type: string
          metadata?: Json | null
          processed_rows?: number | null
          row_count?: number | null
          status?: string
        }
        Update: {
          admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          errors?: Json | null
          file_name?: string
          file_path?: string
          id?: string
          import_type?: string
          metadata?: Json | null
          processed_rows?: number | null
          row_count?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "csv_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "csv_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      csv_parsing_documentation: {
        Row: {
          content: string
          created_at: string | null
          examples: Json | null
          id: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          examples?: Json | null
          id?: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          examples?: Json | null
          id?: string
          topic?: string
        }
        Relationships: []
      }
      csv_parsing_help: {
        Row: {
          content: string
          created_at: string | null
          id: string
          order_index: number
          section: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          order_index: number
          section: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          order_index?: number
          section?: string
          title?: string
        }
        Relationships: []
      }
      custom_elements: {
        Row: {
          base_element_id: string | null
          created_at: string | null
          creator_id: string | null
          customization: Json
          id: string
          is_template: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          base_element_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          customization?: Json
          id?: string
          is_template?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          base_element_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          customization?: Json
          id?: string
          is_template?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_elements_base_element_id_fkey"
            columns: ["base_element_id"]
            isOneToOne: false
            referencedRelation: "element_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_elements_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_elements_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_validation_functions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          function_body: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          parameters: Json | null
          test_cases: Json | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          function_body: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          parameters?: Json | null
          test_cases?: Json | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          function_body?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          parameters?: Json | null
          test_cases?: Json | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      daily_point_totals: {
        Row: {
          activity_type: string
          consecutive_days: number | null
          created_at: string | null
          date: string | null
          id: string
          points_earned: number | null
          streak_multiplier: number | null
          user_id: string
        }
        Insert: {
          activity_type: string
          consecutive_days?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          points_earned?: number | null
          streak_multiplier?: number | null
          user_id: string
        }
        Update: {
          activity_type?: string
          consecutive_days?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          points_earned?: number | null
          streak_multiplier?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_point_totals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_point_totals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_layouts: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          layout_config: Json | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          layout_config?: Json | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          layout_config?: Json | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      data_maestro_canvas_elements: {
        Row: {
          created_at: string | null
          element_type: string
          grid_position: Json
          id: string
          position: Json
          properties: Json | null
          size: Json
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          element_type: string
          grid_position?: Json
          id?: string
          position?: Json
          properties?: Json | null
          size?: Json
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          element_type?: string
          grid_position?: Json
          id?: string
          position?: Json
          properties?: Json | null
          size?: Json
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_maestro_canvas_elements_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      data_maestro_collaborators: {
        Row: {
          created_at: string | null
          id: string
          role: string
          template_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          template_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_maestro_collaborators_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      data_maestro_configurations: {
        Row: {
          business_rules: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          duplicate_detection_rules: Json
          id: string
          name: string
          updated_at: string | null
          validation_schema: Json
        }
        Insert: {
          business_rules?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duplicate_detection_rules?: Json
          id?: string
          name: string
          updated_at?: string | null
          validation_schema?: Json
        }
        Update: {
          business_rules?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duplicate_detection_rules?: Json
          id?: string
          name?: string
          updated_at?: string | null
          validation_schema?: Json
        }
        Relationships: []
      }
      data_maestro_imports: {
        Row: {
          column_mappings: Json | null
          completed_at: string | null
          created_at: string | null
          error_count: number | null
          file_name: string
          format_settings: Json | null
          id: string
          import_type: string | null
          metadata: Json | null
          original_data: Json | null
          processed_count: number | null
          processed_data: Json | null
          row_count: number | null
          status: string
          target_table: string
          user_id: string | null
          validation_errors: Json[] | null
        }
        Insert: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name: string
          format_settings?: Json | null
          id?: string
          import_type?: string | null
          metadata?: Json | null
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Update: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name?: string
          format_settings?: Json | null
          id?: string
          import_type?: string | null
          metadata?: Json | null
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table?: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Relationships: []
      }
      data_maestro_rule_group_mappings: {
        Row: {
          created_at: string | null
          group_id: string
          rule_id: string
        }
        Insert: {
          created_at?: string | null
          group_id: string
          rule_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: string
          rule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_maestro_rule_group_mappings_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_validation_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_maestro_rule_group_mappings_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_validation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      data_maestro_template_versions: {
        Row: {
          changes: Json
          created_at: string | null
          created_by: string | null
          id: string
          template_id: string | null
          version_number: number
        }
        Insert: {
          changes: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          version_number: number
        }
        Update: {
          changes?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "data_maestro_template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      data_maestro_templates: {
        Row: {
          canvas_settings: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          field_mappings: Json | null
          grid_settings: Json | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          name: string
          status: Database["public"]["Enums"]["template_status"]
          updated_at: string | null
          validation_rules: Json | null
          version: number
        }
        Insert: {
          canvas_settings?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_mappings?: Json | null
          grid_settings?: Json | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          name: string
          status?: Database["public"]["Enums"]["template_status"]
          updated_at?: string | null
          validation_rules?: Json | null
          version?: number
        }
        Update: {
          canvas_settings?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_mappings?: Json | null
          grid_settings?: Json | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          name?: string
          status?: Database["public"]["Enums"]["template_status"]
          updated_at?: string | null
          validation_rules?: Json | null
          version?: number
        }
        Relationships: []
      }
      data_maestro_ui_config: {
        Row: {
          created_at: string | null
          favorite_views: Json | null
          id: string
          recent_actions: Json | null
          shortcuts: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          favorite_views?: Json | null
          id?: string
          recent_actions?: Json | null
          shortcuts?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          favorite_views?: Json | null
          id?: string
          recent_actions?: Json | null
          shortcuts?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      data_maestro_validation_configs: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          field_mappings: Json
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          validation_rules: Json
          version: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          field_mappings?: Json
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          validation_rules?: Json
          version?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          field_mappings?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          validation_rules?: Json
          version?: number | null
        }
        Relationships: []
      }
      data_maestro_validation_groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          parent_group_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          parent_group_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          parent_group_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_maestro_validation_groups_parent_group_id_fkey"
            columns: ["parent_group_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_validation_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      data_maestro_validation_rules: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_maestro_validation_templates: {
        Row: {
          base_configuration: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          updated_at: string | null
          version: number | null
        }
        Insert: {
          base_configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          base_configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          rule_type?: Database["public"]["Enums"]["validation_rule_type"]
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      data_maestro_visual_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          field_config: Json
          id: string
          is_active: boolean | null
          layout_config: Json
          name: string
          updated_at: string | null
          validation_rules: Json
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_config?: Json
          id?: string
          is_active?: boolean | null
          layout_config?: Json
          name: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_config?: Json
          id?: string
          is_active?: boolean | null
          layout_config?: Json
          name?: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Relationships: []
      }
      data_transformation_rules: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          configuration: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      delimiter_stats: {
        Row: {
          correct_delimiter: string | null
          created_at: string | null
          detected_delimiter: string
          feedback_source: string | null
          file_name: string
          id: string
        }
        Insert: {
          correct_delimiter?: string | null
          created_at?: string | null
          detected_delimiter: string
          feedback_source?: string | null
          file_name: string
          id?: string
        }
        Update: {
          correct_delimiter?: string | null
          created_at?: string | null
          detected_delimiter?: string
          feedback_source?: string | null
          file_name?: string
          id?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          parent_id: string | null
          recipient_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_id?: string | null
          recipient_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_id?: string | null
          recipient_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "direct_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      discord_connections: {
        Row: {
          discord_user_id: string
          discord_username: string | null
          id: string
          last_synced_at: string | null
          permissions: Json | null
          user_id: string | null
        }
        Insert: {
          discord_user_id: string
          discord_username?: string | null
          id?: string
          last_synced_at?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Update: {
          discord_user_id?: string
          discord_username?: string | null
          id?: string
          last_synced_at?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discord_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discord_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      diy_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diy_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "diy_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation_cache: {
        Row: {
          cache_expires_at: string
          content: Json
          id: string
          last_updated: string | null
          topic: string
        }
        Insert: {
          cache_expires_at: string
          content: Json
          id?: string
          last_updated?: string | null
          topic: string
        }
        Update: {
          cache_expires_at?: string
          content?: Json
          id?: string
          last_updated?: string | null
          topic?: string
        }
        Relationships: []
      }
      element_library: {
        Row: {
          allowed_children: string[] | null
          category: string
          created_at: string | null
          data_binding_config: Json | null
          default_props: Json | null
          description: string | null
          icon: string | null
          id: string
          name: string
          style_options: Json | null
          updated_at: string | null
        }
        Insert: {
          allowed_children?: string[] | null
          category: string
          created_at?: string | null
          data_binding_config?: Json | null
          default_props?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          style_options?: Json | null
          updated_at?: string | null
        }
        Update: {
          allowed_children?: string[] | null
          category?: string
          created_at?: string | null
          data_binding_config?: Json | null
          default_props?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          style_options?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      endstops: {
        Row: {
          applications: string[] | null
          compatibility: string[] | null
          connection_type: string | null
          cost_usd: number | null
          created_at: string | null
          durability: string | null
          endstop_type: string
          id: string
          image_url: string | null
          manufacturer: string | null
          operating_voltage: string | null
          output_signal: string | null
          sensitivity_range: string | null
          summary: string | null
          today_trending: Database["public"]["Enums"]["trending_type"] | null
          trigger_method: string | null
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"] | null
        }
        Insert: {
          applications?: string[] | null
          compatibility?: string[] | null
          connection_type?: string | null
          cost_usd?: number | null
          created_at?: string | null
          durability?: string | null
          endstop_type: string
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          operating_voltage?: string | null
          output_signal?: string | null
          sensitivity_range?: string | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          trigger_method?: string | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Update: {
          applications?: string[] | null
          compatibility?: string[] | null
          connection_type?: string | null
          cost_usd?: number | null
          created_at?: string | null
          durability?: string | null
          endstop_type?: string
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          operating_voltage?: string | null
          output_signal?: string | null
          sensitivity_range?: string | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          trigger_method?: string | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Relationships: []
      }
      erd_layout_configurations: {
        Row: {
          created_at: string
          grid_enabled: boolean
          id: string
          is_default: boolean
          layout_type: string
          name: string
          node_positions: Json
          pan_position: Json
          updated_at: string
          user_id: string
          zoom_level: number
        }
        Insert: {
          created_at?: string
          grid_enabled?: boolean
          id?: string
          is_default?: boolean
          layout_type: string
          name: string
          node_positions: Json
          pan_position?: Json
          updated_at?: string
          user_id: string
          zoom_level?: number
        }
        Update: {
          created_at?: string
          grid_enabled?: boolean
          id?: string
          is_default?: boolean
          layout_type?: string
          name?: string
          node_positions?: Json
          pan_position?: Json
          updated_at?: string
          user_id?: string
          zoom_level?: number
        }
        Relationships: []
      }
      erd_visualizations: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          diagram_data: Json
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          diagram_data?: Json
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          diagram_data?: Json
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      extruders: {
        Row: {
          applications: string[] | null
          compatibility: string[] | null
          cooling_type: string | null
          cost_usd: number | null
          created_at: string | null
          drive_gear_material: string | null
          extruder_type: string
          filament_compatibility: string[] | null
          gear_ratio: string | null
          id: string
          image_url: string | null
          manufacturer: string
          max_filament_diameter: number | null
          max_printing_speed: number | null
          mounting_type: string | null
          search_vector: unknown | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Insert: {
          applications?: string[] | null
          compatibility?: string[] | null
          cooling_type?: string | null
          cost_usd?: number | null
          created_at?: string | null
          drive_gear_material?: string | null
          extruder_type: string
          filament_compatibility?: string[] | null
          gear_ratio?: string | null
          id?: string
          image_url?: string | null
          manufacturer: string
          max_filament_diameter?: number | null
          max_printing_speed?: number | null
          mounting_type?: string | null
          search_vector?: unknown | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
        }
        Update: {
          applications?: string[] | null
          compatibility?: string[] | null
          cooling_type?: string | null
          cost_usd?: number | null
          created_at?: string | null
          drive_gear_material?: string | null
          extruder_type?: string
          filament_compatibility?: string[] | null
          gear_ratio?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string
          max_filament_diameter?: number | null
          max_printing_speed?: number | null
          mounting_type?: string | null
          search_vector?: unknown | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
        }
        Relationships: []
      }
      featured_content: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          created_by: string | null
          featured_from: string
          featured_until: string
          id: string
          priority: number | null
          reason: string | null
          rotation_end_date: string | null
          selection_criteria: Json | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          created_by?: string | null
          featured_from?: string
          featured_until: string
          id?: string
          priority?: number | null
          reason?: string | null
          rotation_end_date?: string | null
          selection_criteria?: Json | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          featured_from?: string
          featured_until?: string
          id?: string
          priority?: number | null
          reason?: string | null
          rotation_end_date?: string | null
          selection_criteria?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "featured_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_content_printer_builds_fk"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "build_gallery_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_content_printer_builds_fk"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "printer_builds"
            referencedColumns: ["id"]
          },
        ]
      }
      field_mapping_history: {
        Row: {
          created_at: string | null
          frequency: number | null
          id: string
          source_field: string
          target_field: string
        }
        Insert: {
          created_at?: string | null
          frequency?: number | null
          id?: string
          source_field: string
          target_field: string
        }
        Update: {
          created_at?: string | null
          frequency?: number | null
          id?: string
          source_field?: string
          target_field?: string
        }
        Relationships: []
      }
      field_mapping_suggestions: {
        Row: {
          confidence_score: number
          created_at: string
          id: string
          last_used: string
          metadata: Json | null
          source_field: string
          suggested_target_field: string
          usage_count: number | null
        }
        Insert: {
          confidence_score: number
          created_at?: string
          id?: string
          last_used?: string
          metadata?: Json | null
          source_field: string
          suggested_target_field: string
          usage_count?: number | null
        }
        Update: {
          confidence_score?: number
          created_at?: string
          id?: string
          last_used?: string
          metadata?: Json | null
          source_field?: string
          suggested_target_field?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      field_suggestions: {
        Row: {
          created_at: string | null
          field_name: string
          frequency: number | null
          id: string
          suggested_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          frequency?: number | null
          id?: string
          suggested_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          frequency?: number | null
          id?: string
          suggested_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      field_type_compatibility: {
        Row: {
          compatibility_level: string
          conversion_rule: Json | null
          created_at: string
          id: string
          source_type: string
          target_type: string
        }
        Insert: {
          compatibility_level: string
          conversion_rule?: Json | null
          created_at?: string
          id?: string
          source_type: string
          target_type: string
        }
        Update: {
          compatibility_level?: string
          conversion_rule?: Json | null
          created_at?: string
          id?: string
          source_type?: string
          target_type?: string
        }
        Relationships: []
      }
      field_type_suggestions: {
        Row: {
          confidence_score: number
          created_at: string | null
          field_name: string
          id: string
          suggested_type: string
          usage_count: number | null
        }
        Insert: {
          confidence_score: number
          created_at?: string | null
          field_name: string
          id?: string
          suggested_type: string
          usage_count?: number | null
        }
        Update: {
          confidence_score?: number
          created_at?: string | null
          field_name?: string
          id?: string
          suggested_type?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      field_validation_rules: {
        Row: {
          allowed_characters: string | null
          config_id: string | null
          created_at: string | null
          error_message: string | null
          field_name: string
          id: string
          regex_pattern: string | null
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          rule_value: Json
          updated_at: string | null
        }
        Insert: {
          allowed_characters?: string | null
          config_id?: string | null
          created_at?: string | null
          error_message?: string | null
          field_name: string
          id?: string
          regex_pattern?: string | null
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          rule_value: Json
          updated_at?: string | null
        }
        Update: {
          allowed_characters?: string | null
          config_id?: string | null
          created_at?: string | null
          error_message?: string | null
          field_name?: string
          id?: string
          regex_pattern?: string | null
          rule_type?: Database["public"]["Enums"]["validation_rule_type"]
          rule_value?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_validation_rules_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "vdb_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      filaments: {
        Row: {
          bed_adhesion_requirements: string | null
          color: string | null
          cost_usd: number | null
          created_at: string | null
          diameter: number | null
          flexibility: Database["public"]["Enums"]["flexibility_type"] | null
          id: string
          image_url: string | null
          material_type: string
          recommended_printing_temp_max: number | null
          recommended_printing_temp_min: number | null
          strength: Database["public"]["Enums"]["strength_type"] | null
          summary: string | null
          today_trending: Database["public"]["Enums"]["trending_type"] | null
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"] | null
        }
        Insert: {
          bed_adhesion_requirements?: string | null
          color?: string | null
          cost_usd?: number | null
          created_at?: string | null
          diameter?: number | null
          flexibility?: Database["public"]["Enums"]["flexibility_type"] | null
          id?: string
          image_url?: string | null
          material_type: string
          recommended_printing_temp_max?: number | null
          recommended_printing_temp_min?: number | null
          strength?: Database["public"]["Enums"]["strength_type"] | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Update: {
          bed_adhesion_requirements?: string | null
          color?: string | null
          cost_usd?: number | null
          created_at?: string | null
          diameter?: number | null
          flexibility?: Database["public"]["Enums"]["flexibility_type"] | null
          id?: string
          image_url?: string | null
          material_type?: string
          recommended_printing_temp_max?: number | null
          recommended_printing_temp_min?: number | null
          strength?: Database["public"]["Enums"]["strength_type"] | null
          summary?: string | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Relationships: []
      }
      file_processing_workflows: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error: string | null
          file_id: string | null
          id: string
          result: Json | null
          started_at: string | null
          status: string | null
          workflow_type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          file_id?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string | null
          workflow_type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          file_id?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string | null
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_processing_workflows_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          bucket_name: string
          created_at: string | null
          file_path: string
          file_type: string
          filename: string
          id: string
          metadata: Json | null
          mime_type: string
          processing_error: string | null
          size: number
          updated_at: string | null
          uploaded_by: string | null
          workflow_status: string | null
        }
        Insert: {
          bucket_name: string
          created_at?: string | null
          file_path: string
          file_type: string
          filename: string
          id?: string
          metadata?: Json | null
          mime_type: string
          processing_error?: string | null
          size: number
          updated_at?: string | null
          uploaded_by?: string | null
          workflow_status?: string | null
        }
        Update: {
          bucket_name?: string
          created_at?: string | null
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
          metadata?: Json | null
          mime_type?: string
          processing_error?: string | null
          size?: number
          updated_at?: string | null
          uploaded_by?: string | null
          workflow_status?: string | null
        }
        Relationships: []
      }
      firmware: {
        Row: {
          community_support:
            | Database["public"]["Enums"]["community_support_type"]
            | null
          complexity: Database["public"]["Enums"]["complexity_type"] | null
          cost_usd: number | null
          created_at: string | null
          documentation_quality:
            | Database["public"]["Enums"]["documentation_type"]
            | null
          firmware_name: string
          id: string
          image_url: string | null
          license: string | null
          recommended_use_case: string | null
          summary: string | null
          supported_features: string[] | null
          supported_mcu_types: string[] | null
          today_trending: Database["public"]["Enums"]["trending_type"] | null
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"] | null
        }
        Insert: {
          community_support?:
            | Database["public"]["Enums"]["community_support_type"]
            | null
          complexity?: Database["public"]["Enums"]["complexity_type"] | null
          cost_usd?: number | null
          created_at?: string | null
          documentation_quality?:
            | Database["public"]["Enums"]["documentation_type"]
            | null
          firmware_name: string
          id?: string
          image_url?: string | null
          license?: string | null
          recommended_use_case?: string | null
          summary?: string | null
          supported_features?: string[] | null
          supported_mcu_types?: string[] | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Update: {
          community_support?:
            | Database["public"]["Enums"]["community_support_type"]
            | null
          complexity?: Database["public"]["Enums"]["complexity_type"] | null
          cost_usd?: number | null
          created_at?: string | null
          documentation_quality?:
            | Database["public"]["Enums"]["documentation_type"]
            | null
          firmware_name?: string
          id?: string
          image_url?: string | null
          license?: string | null
          recommended_use_case?: string | null
          summary?: string | null
          supported_features?: string[] | null
          supported_mcu_types?: string[] | null
          today_trending?: Database["public"]["Enums"]["trending_type"] | null
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"] | null
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_build_category: boolean | null
          is_private: boolean | null
          name: string
          position: number | null
          printer_build_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_build_category?: boolean | null
          is_private?: boolean | null
          name: string
          position?: number | null
          printer_build_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_build_category?: boolean | null
          is_private?: boolean | null
          name?: string
          position?: number | null
          printer_build_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_categories_printer_build_id_fkey"
            columns: ["printer_build_id"]
            isOneToOne: false
            referencedRelation: "build_gallery_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_categories_printer_build_id_fkey"
            columns: ["printer_build_id"]
            isOneToOne: false
            referencedRelation: "printer_builds"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_solution: boolean | null
          parent_id: string | null
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          parent_id?: string | null
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          parent_id?: string | null
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_subscriptions: {
        Row: {
          created_at: string | null
          id: string
          thread_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          thread_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_subscriptions_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          author_id: string
          category_id: string
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          slug: string
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id: string
          category_id: string
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string
          category_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_threads_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_threads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      gamification_levels: {
        Row: {
          badge_url: string | null
          created_at: string | null
          id: string
          level_number: number
          perks: Json | null
          points_required: number
          title: string
        }
        Insert: {
          badge_url?: string | null
          created_at?: string | null
          id?: string
          level_number: number
          perks?: Json | null
          points_required: number
          title: string
        }
        Update: {
          badge_url?: string | null
          created_at?: string | null
          id?: string
          level_number?: number
          perks?: Json | null
          points_required?: number
          title?: string
        }
        Relationships: []
      }
      gamification_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_name: string
          setting_type: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_name: string
          setting_type: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_name?: string
          setting_type?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      import_configurations: {
        Row: {
          created_at: string | null
          created_by: string | null
          delimiter_settings: Json | null
          id: string
          name: string
          primary_fields: Json | null
          secondary_fields: Json | null
          table_name: string
          updated_at: string | null
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          delimiter_settings?: Json | null
          id?: string
          name: string
          primary_fields?: Json | null
          secondary_fields?: Json | null
          table_name: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          delimiter_settings?: Json | null
          id?: string
          name?: string
          primary_fields?: Json | null
          secondary_fields?: Json | null
          table_name?: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Relationships: []
      }
      import_documentation: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          order_index: number
          section: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_index: number
          section: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_index?: number
          section?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      import_field_definitions: {
        Row: {
          config_id: string | null
          created_at: string | null
          field_name: string
          field_type: string
          id: string
          is_primary: boolean | null
          is_required: boolean | null
          suggestions_enabled: boolean | null
          validation_rules: Json | null
        }
        Insert: {
          config_id?: string | null
          created_at?: string | null
          field_name: string
          field_type: string
          id?: string
          is_primary?: boolean | null
          is_required?: boolean | null
          suggestions_enabled?: boolean | null
          validation_rules?: Json | null
        }
        Update: {
          config_id?: string | null
          created_at?: string | null
          field_name?: string
          field_type?: string
          id?: string
          is_primary?: boolean | null
          is_required?: boolean | null
          suggestions_enabled?: boolean | null
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "import_field_definitions_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "vdb_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      import_field_mappings: {
        Row: {
          created_at: string | null
          data_type: string
          id: string
          is_required: boolean | null
          source_field: string
          target_field: string
          template_id: string | null
          transformation_rule: Json | null
          updated_at: string | null
          validation_rule: Json | null
        }
        Insert: {
          created_at?: string | null
          data_type: string
          id?: string
          is_required?: boolean | null
          source_field: string
          target_field: string
          template_id?: string | null
          transformation_rule?: Json | null
          updated_at?: string | null
          validation_rule?: Json | null
        }
        Update: {
          created_at?: string | null
          data_type?: string
          id?: string
          is_required?: boolean | null
          source_field?: string
          target_field?: string
          template_id?: string | null
          transformation_rule?: Json | null
          updated_at?: string | null
          validation_rule?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "import_field_mappings_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "import_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      import_field_suggestions: {
        Row: {
          created_at: string | null
          field_name: string
          frequency: number | null
          id: string
          suggested_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          frequency?: number | null
          id?: string
          suggested_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          frequency?: number | null
          id?: string
          suggested_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      import_format_rules: {
        Row: {
          created_at: string | null
          format: Database["public"]["Enums"]["file_format_type"]
          id: string
          rules: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          format: Database["public"]["Enums"]["file_format_type"]
          id?: string
          rules?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          format?: Database["public"]["Enums"]["file_format_type"]
          id?: string
          rules?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      import_generated_tags: {
        Row: {
          approved: boolean | null
          created_at: string | null
          id: string
          import_id: string | null
          row_count: number
          source_field: string
          tag_name: string
        }
        Insert: {
          approved?: boolean | null
          created_at?: string | null
          id?: string
          import_id?: string | null
          row_count: number
          source_field: string
          tag_name: string
        }
        Update: {
          approved?: boolean | null
          created_at?: string | null
          id?: string
          import_id?: string | null
          row_count?: number
          source_field?: string
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_generated_tags_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "import_history"
            referencedColumns: ["id"]
          },
        ]
      }
      import_history: {
        Row: {
          backup_data: Json | null
          can_rollback: boolean | null
          configuration_id: string | null
          created_at: string | null
          created_by: string | null
          error_count: number
          error_details: Json
          file_name: string
          id: string
          rollback_expires_at: string | null
          row_count: number
          success_count: number
        }
        Insert: {
          backup_data?: Json | null
          can_rollback?: boolean | null
          configuration_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_count?: number
          error_details?: Json
          file_name: string
          id?: string
          rollback_expires_at?: string | null
          row_count: number
          success_count?: number
        }
        Update: {
          backup_data?: Json | null
          can_rollback?: boolean | null
          configuration_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_count?: number
          error_details?: Json
          file_name?: string
          id?: string
          rollback_expires_at?: string | null
          row_count?: number
          success_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "import_history_configuration_id_fkey"
            columns: ["configuration_id"]
            isOneToOne: false
            referencedRelation: "vdb_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      import_processing_queue: {
        Row: {
          chunk_size: number | null
          completed_at: string | null
          created_at: string | null
          current_chunk: number | null
          error_details: Json | null
          id: string
          priority: number | null
          session_id: string | null
          started_at: string | null
          status: string
          total_chunks: number | null
        }
        Insert: {
          chunk_size?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_chunk?: number | null
          error_details?: Json | null
          id?: string
          priority?: number | null
          session_id?: string | null
          started_at?: string | null
          status?: string
          total_chunks?: number | null
        }
        Update: {
          chunk_size?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_chunk?: number | null
          error_details?: Json | null
          id?: string
          priority?: number | null
          session_id?: string | null
          started_at?: string | null
          status?: string
          total_chunks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "import_processing_queue_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "import_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      import_relationship_visualizations: {
        Row: {
          created_at: string | null
          field_mappings: Json
          id: string
          import_id: string | null
          metadata: Json | null
          relationship_type: string
          source_table: string
          target_table: string
        }
        Insert: {
          created_at?: string | null
          field_mappings?: Json
          id?: string
          import_id?: string | null
          metadata?: Json | null
          relationship_type: string
          source_table: string
          target_table: string
        }
        Update: {
          created_at?: string | null
          field_mappings?: Json
          id?: string
          import_id?: string | null
          metadata?: Json | null
          relationship_type?: string
          source_table?: string
          target_table?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_relationship_visualizations_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "temp_imports"
            referencedColumns: ["id"]
          },
        ]
      }
      import_relationships: {
        Row: {
          config_id: string | null
          created_at: string | null
          field_mappings: Json
          id: string
          relationship_type: string
          source_table: string
          target_table: string
        }
        Insert: {
          config_id?: string | null
          created_at?: string | null
          field_mappings: Json
          id?: string
          relationship_type: string
          source_table: string
          target_table: string
        }
        Update: {
          config_id?: string | null
          created_at?: string | null
          field_mappings?: Json
          id?: string
          relationship_type?: string
          source_table?: string
          target_table?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_relationships_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "vdb_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      import_rollbacks: {
        Row: {
          backup_data: Json
          created_at: string | null
          expires_at: string
          id: string
          import_id: string | null
          restored_at: string | null
          restored_by: string | null
          status: string | null
        }
        Insert: {
          backup_data: Json
          created_at?: string | null
          expires_at: string
          id?: string
          import_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: string | null
        }
        Update: {
          backup_data?: Json
          created_at?: string | null
          expires_at?: string
          id?: string
          import_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_rollbacks_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "import_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_rollbacks_restored_by_fkey"
            columns: ["restored_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_rollbacks_restored_by_fkey"
            columns: ["restored_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      import_sessions: {
        Row: {
          column_mappings: Json | null
          completed_at: string | null
          created_at: string | null
          error_count: number | null
          file_name: string
          id: string
          original_data: Json | null
          processed_count: number | null
          processed_data: Json | null
          row_count: number | null
          status: string
          target_table: string
          user_id: string | null
          validation_errors: Json[] | null
        }
        Insert: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name: string
          id?: string
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Update: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name?: string
          id?: string
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table?: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Relationships: []
      }
      import_step_connections: {
        Row: {
          condition: Json | null
          created_at: string | null
          id: string
          source_step: string
          target_step: string
          template_id: string | null
        }
        Insert: {
          condition?: Json | null
          created_at?: string | null
          id?: string
          source_step: string
          target_step: string
          template_id?: string | null
        }
        Update: {
          condition?: Json | null
          created_at?: string | null
          id?: string
          source_step?: string
          target_step?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_step_connections_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "import_wizard_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      import_template_versions: {
        Row: {
          changes: Json
          created_at: string | null
          created_by: string | null
          id: string
          template_id: string | null
          version: number
        }
        Insert: {
          changes: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          version: number
        }
        Update: {
          changes?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "import_template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "import_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      import_templates: {
        Row: {
          column_mappings: Json
          created_at: string | null
          created_by: string | null
          delimiter: string | null
          encoding: string | null
          file_format: string
          format_settings: Json | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          name: string
          schema_definition: Json | null
          target_table: string
          transformation_rules: Json | null
          updated_at: string | null
          validation_rules: Json | null
          version: number
        }
        Insert: {
          column_mappings?: Json
          created_at?: string | null
          created_by?: string | null
          delimiter?: string | null
          encoding?: string | null
          file_format?: string
          format_settings?: Json | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name: string
          schema_definition?: Json | null
          target_table: string
          transformation_rules?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: number
        }
        Update: {
          column_mappings?: Json
          created_at?: string | null
          created_by?: string | null
          delimiter?: string | null
          encoding?: string | null
          file_format?: string
          format_settings?: Json | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name?: string
          schema_definition?: Json | null
          target_table?: string
          transformation_rules?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: number
        }
        Relationships: []
      }
      import_wizard_states: {
        Row: {
          branch_conditions: Json | null
          configuration: Json | null
          created_at: string | null
          current_step: string
          expires_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          branch_conditions?: Json | null
          configuration?: Json | null
          created_at?: string | null
          current_step: string
          expires_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          branch_conditions?: Json | null
          configuration?: Json | null
          created_at?: string | null
          current_step?: string
          expires_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      import_wizard_templates: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          flow_diagram: Json | null
          id: string
          is_active: boolean | null
          name: string
          steps: Json
          updated_at: string | null
          version: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_diagram?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          steps: Json
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_diagram?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          media_type: string | null
          metadata: Json | null
          updated_at: string | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          media_type?: string | null
          metadata?: Json | null
          updated_at?: string | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          media_type?: string | null
          metadata?: Json | null
          updated_at?: string | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_library_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_library_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_programs: {
        Row: {
          created_at: string | null
          description: string
          expertise_areas: string[]
          id: string
          is_active: boolean | null
          max_mentees: number
          mentor_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          expertise_areas: string[]
          id?: string
          is_active?: boolean | null
          max_mentees?: number
          mentor_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          expertise_areas?: string[]
          id?: string
          is_active?: boolean | null
          max_mentees?: number
          mentor_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_programs_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_programs_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_relationships: {
        Row: {
          created_at: string | null
          ended_at: string | null
          id: string
          mentee_id: string | null
          program_id: string | null
          started_at: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          mentee_id?: string | null
          program_id?: string | null
          started_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          mentee_id?: string | null
          program_id?: string | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_relationships_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "mentorship_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          metadata: Json | null
          moderator_id: string
          reason: string
          target_id: string
          target_type: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          moderator_id: string
          reason: string
          target_id: string
          target_type: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          moderator_id?: string
          reason?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      navigation_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          metadata: Json | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          metadata?: Json | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          metadata?: Json | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_step_templates: {
        Row: {
          completion_points: number | null
          content: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          key: string
          order_index: number
          published_version: number | null
          required: boolean | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          completion_points?: number | null
          content: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          order_index: number
          published_version?: number | null
          required?: boolean | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          completion_points?: number | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          order_index?: number
          published_version?: number | null
          required?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_step_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_step_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_steps: {
        Row: {
          completion_points: number | null
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_required: boolean | null
          key: string
          order_index: number
          status: string | null
          title: string
        }
        Insert: {
          completion_points?: number | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          key: string
          order_index: number
          status?: string | null
          title: string
        }
        Update: {
          completion_points?: number | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          key?: string
          order_index?: number
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      page_analytics: {
        Row: {
          avg_time_on_page: number | null
          bounce_rate: number | null
          created_at: string | null
          device_stats: Json | null
          id: string
          page_id: string | null
          referrer_stats: Json | null
          unique_visitors: number | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          device_stats?: Json | null
          id?: string
          page_id?: string | null
          referrer_stats?: Json | null
          unique_visitors?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          device_stats?: Json | null
          id?: string
          page_id?: string | null
          referrer_stats?: Json | null
          unique_visitors?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "page_analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "builder_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_element_layouts: {
        Row: {
          created_at: string | null
          element_id: string
          grid_position: Json | null
          id: string
          page_id: string | null
          position: Json | null
          size: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          element_id: string
          grid_position?: Json | null
          id?: string
          page_id?: string | null
          position?: Json | null
          size?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          element_id?: string
          grid_position?: Json | null
          id?: string
          page_id?: string | null
          position?: Json | null
          size?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_element_layouts_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "builder_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          layout_config: Json
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          layout_config?: Json
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          layout_config?: Json
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      part_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "part_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "part_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      point_rules: {
        Row: {
          activity_type: string
          created_at: string | null
          id: string
          max_daily_points: number | null
          min_duration_seconds: number | null
          points: number
          progressive_bonus_cap: number | null
          progressive_bonus_multiplier: number | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          id?: string
          max_daily_points?: number | null
          min_duration_seconds?: number | null
          points: number
          progressive_bonus_cap?: number | null
          progressive_bonus_multiplier?: number | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          id?: string
          max_daily_points?: number | null
          min_duration_seconds?: number | null
          points?: number
          progressive_bonus_cap?: number | null
          progressive_bonus_multiplier?: number | null
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: number
          post_id: number
        }
        Insert: {
          category_id: number
          post_id: number
        }
        Update: {
          category_id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author: string | null
          content: string
          created_at: string | null
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string | null
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string | null
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      printer_builds: {
        Row: {
          aluminum_extrusion_details: Json | null
          belt_details: Json[] | null
          build_type: string | null
          build_volume: Json | null
          building_experience: string | null
          compatibility_summary: string | null
          created_at: string | null
          description: string | null
          difficulty:
            | Database["public"]["Enums"]["build_difficulty_type"]
            | null
          enclosure_details: string | null
          expansion_cards: Json[] | null
          extruder_id: string | null
          extrusion_details: Json[] | null
          featured_rotation_count: number | null
          heatbed_id: string | null
          hotend_id: string | null
          id: string
          images: string[] | null
          is_public: boolean | null
          issues_faced: string | null
          kinematics: Database["public"]["Enums"]["kinematics_type"]
          likes_count: number | null
          mcu_id: string | null
          motion_components: Json | null
          motion_system: Json | null
          power_supply_details: Json | null
          printer_name: string
          required_fields_complete: boolean | null
          sbc_details: Json | null
          sort_score: number | null
          tags: string[] | null
          technical_specs: Json | null
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Insert: {
          aluminum_extrusion_details?: Json | null
          belt_details?: Json[] | null
          build_type?: string | null
          build_volume?: Json | null
          building_experience?: string | null
          compatibility_summary?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?:
            | Database["public"]["Enums"]["build_difficulty_type"]
            | null
          enclosure_details?: string | null
          expansion_cards?: Json[] | null
          extruder_id?: string | null
          extrusion_details?: Json[] | null
          featured_rotation_count?: number | null
          heatbed_id?: string | null
          hotend_id?: string | null
          id?: string
          images?: string[] | null
          is_public?: boolean | null
          issues_faced?: string | null
          kinematics: Database["public"]["Enums"]["kinematics_type"]
          likes_count?: number | null
          mcu_id?: string | null
          motion_components?: Json | null
          motion_system?: Json | null
          power_supply_details?: Json | null
          printer_name: string
          required_fields_complete?: boolean | null
          sbc_details?: Json | null
          sort_score?: number | null
          tags?: string[] | null
          technical_specs?: Json | null
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Update: {
          aluminum_extrusion_details?: Json | null
          belt_details?: Json[] | null
          build_type?: string | null
          build_volume?: Json | null
          building_experience?: string | null
          compatibility_summary?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?:
            | Database["public"]["Enums"]["build_difficulty_type"]
            | null
          enclosure_details?: string | null
          expansion_cards?: Json[] | null
          extruder_id?: string | null
          extrusion_details?: Json[] | null
          featured_rotation_count?: number | null
          heatbed_id?: string | null
          hotend_id?: string | null
          id?: string
          images?: string[] | null
          is_public?: boolean | null
          issues_faced?: string | null
          kinematics?: Database["public"]["Enums"]["kinematics_type"]
          likes_count?: number | null
          mcu_id?: string | null
          motion_components?: Json | null
          motion_system?: Json | null
          power_supply_details?: Json | null
          printer_name?: string
          required_fields_complete?: boolean | null
          sbc_details?: Json | null
          sort_score?: number | null
          tags?: string[] | null
          technical_specs?: Json | null
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "printer_builds_extruder_id_fkey"
            columns: ["extruder_id"]
            isOneToOne: false
            referencedRelation: "extruders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_heatbed_id_fkey"
            columns: ["heatbed_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_hotend_id_fkey"
            columns: ["hotend_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_mcu_id_fkey"
            columns: ["mcu_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      printer_builds_addons: {
        Row: {
          addon_id: string
          build_id: string
          created_at: string | null
        }
        Insert: {
          addon_id: string
          build_id: string
          created_at?: string | null
        }
        Update: {
          addon_id?: string
          build_id?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printer_builds_addons_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "addons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_addons_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "build_gallery_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_addons_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "printer_builds"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements_count: number | null
          avatar_url: string | null
          backup_codes: string[] | null
          badges: Json | null
          bio: string | null
          builder_level: number | null
          created_at: string | null
          current_level: number | null
          daily_points: number | null
          daily_points_updated_at: string | null
          discord_id: string | null
          display_name: string | null
          experience_level: string | null
          gamification_enabled: boolean | null
          id: string
          interests: string[] | null
          last_activity_at: string | null
          last_login_at: string | null
          location: string | null
          login_streak: number | null
          mentor_rating: number | null
          mentorship_count: number | null
          mfa_enabled: boolean | null
          mfa_verified_at: string | null
          next_level_points: number | null
          onboarding_completed: boolean | null
          onboarding_last_step: string | null
          onboarding_started_at: string | null
          opt_out_page: boolean | null
          page_customization: Json | null
          points: number | null
          primary_intent: string | null
          role: Database["public"]["Enums"]["user_role_type"] | null
          show_avatar: boolean | null
          signature: string | null
          social_links: Json | null
          status: string | null
          status_changed_at: string | null
          status_changed_by: string | null
          status_reason: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          total_points: number | null
          trending_score: number | null
          two_factor_backup_codes: string[] | null
          two_factor_enabled: boolean | null
          two_factor_recovery_email: string | null
          two_factor_secret: string | null
          updated_at: string | null
          username: string | null
          visual_editor_enabled: boolean | null
          visual_editor_preferences: Json | null
        }
        Insert: {
          achievements_count?: number | null
          avatar_url?: string | null
          backup_codes?: string[] | null
          badges?: Json | null
          bio?: string | null
          builder_level?: number | null
          created_at?: string | null
          current_level?: number | null
          daily_points?: number | null
          daily_points_updated_at?: string | null
          discord_id?: string | null
          display_name?: string | null
          experience_level?: string | null
          gamification_enabled?: boolean | null
          id: string
          interests?: string[] | null
          last_activity_at?: string | null
          last_login_at?: string | null
          location?: string | null
          login_streak?: number | null
          mentor_rating?: number | null
          mentorship_count?: number | null
          mfa_enabled?: boolean | null
          mfa_verified_at?: string | null
          next_level_points?: number | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: string | null
          onboarding_started_at?: string | null
          opt_out_page?: boolean | null
          page_customization?: Json | null
          points?: number | null
          primary_intent?: string | null
          role?: Database["public"]["Enums"]["user_role_type"] | null
          show_avatar?: boolean | null
          signature?: string | null
          social_links?: Json | null
          status?: string | null
          status_changed_at?: string | null
          status_changed_by?: string | null
          status_reason?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          total_points?: number | null
          trending_score?: number | null
          two_factor_backup_codes?: string[] | null
          two_factor_enabled?: boolean | null
          two_factor_recovery_email?: string | null
          two_factor_secret?: string | null
          updated_at?: string | null
          username?: string | null
          visual_editor_enabled?: boolean | null
          visual_editor_preferences?: Json | null
        }
        Update: {
          achievements_count?: number | null
          avatar_url?: string | null
          backup_codes?: string[] | null
          badges?: Json | null
          bio?: string | null
          builder_level?: number | null
          created_at?: string | null
          current_level?: number | null
          daily_points?: number | null
          daily_points_updated_at?: string | null
          discord_id?: string | null
          display_name?: string | null
          experience_level?: string | null
          gamification_enabled?: boolean | null
          id?: string
          interests?: string[] | null
          last_activity_at?: string | null
          last_login_at?: string | null
          location?: string | null
          login_streak?: number | null
          mentor_rating?: number | null
          mentorship_count?: number | null
          mfa_enabled?: boolean | null
          mfa_verified_at?: string | null
          next_level_points?: number | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: string | null
          onboarding_started_at?: string | null
          opt_out_page?: boolean | null
          page_customization?: Json | null
          points?: number | null
          primary_intent?: string | null
          role?: Database["public"]["Enums"]["user_role_type"] | null
          show_avatar?: boolean | null
          signature?: string | null
          social_links?: Json | null
          status?: string | null
          status_changed_at?: string | null
          status_changed_by?: string | null
          status_reason?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          total_points?: number | null
          trending_score?: number | null
          two_factor_backup_codes?: string[] | null
          two_factor_enabled?: boolean | null
          two_factor_recovery_email?: string | null
          two_factor_secret?: string | null
          updated_at?: string | null
          username?: string | null
          visual_editor_enabled?: boolean | null
          visual_editor_preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_onboarding_last_step_fkey"
            columns: ["onboarding_last_step"]
            isOneToOne: false
            referencedRelation: "onboarding_steps"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "profiles_status_changed_by_fkey"
            columns: ["status_changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_status_changed_by_fkey"
            columns: ["status_changed_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      progressive_bonus_rules: {
        Row: {
          created_at: string | null
          id: string
          min_consecutive_days: number
          multiplier: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          min_consecutive_days: number
          multiplier: number
        }
        Update: {
          created_at?: string | null
          id?: string
          min_consecutive_days?: number
          multiplier?: number
        }
        Relationships: []
      }
      rate_limit_policies: {
        Row: {
          created_at: string | null
          endpoint_pattern: string | null
          id: string
          name: string
          requests_per_minute: number
          subscription_type: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          created_at?: string | null
          endpoint_pattern?: string | null
          id?: string
          name: string
          requests_per_minute: number
          subscription_type: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          created_at?: string | null
          endpoint_pattern?: string | null
          id?: string
          name?: string
          requests_per_minute?: number
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_count: number | null
          action_type: string
          id: string
          last_action: string | null
          user_id: string
        }
        Insert: {
          action_count?: number | null
          action_type: string
          id?: string
          last_action?: string | null
          user_id: string
        }
        Update: {
          action_count?: number | null
          action_type?: string
          id?: string
          last_action?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      recovery_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          used: boolean | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recovery_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      relationship_visualizations: {
        Row: {
          created_at: string | null
          id: string
          import_id: string | null
          relationship_type: string
          source_table: string
          target_table: string
          updated_at: string | null
          visualization_data: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          import_id?: string | null
          relationship_type: string
          source_table: string
          target_table: string
          updated_at?: string | null
          visualization_data?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          import_id?: string | null
          relationship_type?: string
          source_table?: string
          target_table?: string
          updated_at?: string | null
          visualization_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "relationship_visualizations_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "temp_imports"
            referencedColumns: ["id"]
          },
        ]
      }
      revision_history: {
        Row: {
          changes: Json
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          revision_type: string
          user_id: string | null
        }
        Insert: {
          changes: Json
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          revision_type: string
          user_id?: string | null
        }
        Update: {
          changes?: Json
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          revision_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revision_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "revision_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      role_applications: {
        Row: {
          id: string
          metadata: Json | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: Database["public"]["Enums"]["admin_role_type"]
          status: string | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role: Database["public"]["Enums"]["admin_role_type"]
          status?: string | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: Database["public"]["Enums"]["admin_role_type"]
          status?: string | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_test_cases: {
        Row: {
          created_at: string | null
          created_by: string | null
          expected_result: boolean
          id: string
          rule_id: string | null
          test_input: Json
          test_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expected_result: boolean
          id?: string
          rule_id?: string | null
          test_input: Json
          test_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expected_result?: boolean
          id?: string
          rule_id?: string | null
          test_input?: Json
          test_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rule_test_cases_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "template_rule_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_test_results: {
        Row: {
          actual_result: boolean
          error_message: string | null
          executed_at: string | null
          execution_time: number | null
          id: string
          test_case_id: string | null
        }
        Insert: {
          actual_result: boolean
          error_message?: string | null
          executed_at?: string | null
          execution_time?: number | null
          id?: string
          test_case_id?: string | null
        }
        Update: {
          actual_result?: boolean
          error_message?: string | null
          executed_at?: string | null
          execution_time?: number | null
          id?: string
          test_case_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rule_test_results_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "rule_test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_validation_rules: {
        Row: {
          config_name: string
          created_at: string | null
          created_by: string | null
          id: string
          rules: Json
          updated_at: string | null
        }
        Insert: {
          config_name: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          rules: Json
          updated_at?: string | null
        }
        Update: {
          config_name?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          rules?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      schema_changes: {
        Row: {
          admin_id: string | null
          approved_at: string | null
          approved_by: string | null
          change_type: string
          changes: Json
          created_at: string | null
          id: string
          reason: string | null
          rollback_status: string | null
          table_name: string
        }
        Insert: {
          admin_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          change_type: string
          changes: Json
          created_at?: string | null
          id?: string
          reason?: string | null
          rollback_status?: string | null
          table_name: string
        }
        Update: {
          admin_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          change_type?: string
          changes?: Json
          created_at?: string | null
          id?: string
          reason?: string | null
          rollback_status?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "schema_changes_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schema_changes_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schema_changes_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schema_changes_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      schema_version_control: {
        Row: {
          applied_at: string | null
          applied_by: string | null
          changes: Json
          description: string
          id: string
          status: string | null
          version_number: number
        }
        Insert: {
          applied_at?: string | null
          applied_by?: string | null
          changes: Json
          description: string
          id?: string
          status?: string | null
          version_number: number
        }
        Update: {
          applied_at?: string | null
          applied_by?: string | null
          changes?: Json
          description?: string
          id?: string
          status?: string | null
          version_number?: number
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          session_id: string | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_id?: string | null
          severity: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sensors: {
        Row: {
          accuracy: string | null
          avg_price: number | null
          avg_rating: number | null
          connector_type: string | null
          cons: string[] | null
          cost_usd: number | null
          created_at: string | null
          dimensions: string | null
          english_reviews_count: number | null
          firmware_compatibility: string[] | null
          has_self_test: boolean | null
          id: string
          image_url: string | null
          includes_alarm: boolean | null
          manufacturer: string
          mounting_type: string | null
          name: string
          printer_models: string[] | null
          probe_material: string | null
          pros: string[] | null
          search_vector: unknown | null
          sensor_type: string
          site_rating: number | null
          summary: string
          today_trending: Database["public"]["Enums"]["trending_type"]
          updated_at: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
          weight: number | null
        }
        Insert: {
          accuracy?: string | null
          avg_price?: number | null
          avg_rating?: number | null
          connector_type?: string | null
          cons?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          english_reviews_count?: number | null
          firmware_compatibility?: string[] | null
          has_self_test?: boolean | null
          id?: string
          image_url?: string | null
          includes_alarm?: boolean | null
          manufacturer: string
          mounting_type?: string | null
          name: string
          printer_models?: string[] | null
          probe_material?: string | null
          pros?: string[] | null
          search_vector?: unknown | null
          sensor_type: string
          site_rating?: number | null
          summary: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating: Database["public"]["Enums"]["value_type"]
          weight?: number | null
        }
        Update: {
          accuracy?: string | null
          avg_price?: number | null
          avg_rating?: number | null
          connector_type?: string | null
          cons?: string[] | null
          cost_usd?: number | null
          created_at?: string | null
          dimensions?: string | null
          english_reviews_count?: number | null
          firmware_compatibility?: string[] | null
          has_self_test?: boolean | null
          id?: string
          image_url?: string | null
          includes_alarm?: boolean | null
          manufacturer?: string
          mounting_type?: string | null
          name?: string
          printer_models?: string[] | null
          probe_material?: string | null
          pros?: string[] | null
          search_vector?: unknown | null
          sensor_type?: string
          site_rating?: number | null
          summary?: string
          today_trending?: Database["public"]["Enums"]["trending_type"]
          updated_at?: string | null
          value_rating?: Database["public"]["Enums"]["value_type"]
          weight?: number | null
        }
        Relationships: []
      }
      setting_validation_rules: {
        Row: {
          allowed_values: Json | null
          created_at: string | null
          id: string
          max_value: number | null
          min_value: number | null
          pattern: string | null
          setting_key: string
          updated_at: string | null
          validation_type: Database["public"]["Enums"]["setting_type"]
        }
        Insert: {
          allowed_values?: Json | null
          created_at?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          pattern?: string | null
          setting_key: string
          updated_at?: string | null
          validation_type: Database["public"]["Enums"]["setting_type"]
        }
        Update: {
          allowed_values?: Json | null
          created_at?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          pattern?: string | null
          setting_key?: string
          updated_at?: string | null
          validation_type?: Database["public"]["Enums"]["setting_type"]
        }
        Relationships: []
      }
      site_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_value: Json
          recorded_at: string | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: Json
          recorded_at?: string | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: Json
          recorded_at?: string | null
        }
        Relationships: []
      }
      social_media_posts: {
        Row: {
          build_id: string | null
          created_at: string | null
          engagement_metrics: Json | null
          id: string
          platform: string
          post_id: string | null
        }
        Insert: {
          build_id?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform: string
          post_id?: string | null
        }
        Update: {
          build_id?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_media_posts_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "build_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      social_shares: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          platform: string
          share_url: string | null
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          platform: string
          share_url?: string | null
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          platform?: string
          share_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_shares_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_shares_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_communities: {
        Row: {
          category: string
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          is_private: boolean | null
          member_count: number | null
          name: string
          rules: string[] | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          is_private?: boolean | null
          member_count?: number | null
          name: string
          rules?: string[] | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          is_private?: boolean | null
          member_count?: number | null
          name?: string
          rules?: string[] | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tag_generation_rules: {
        Row: {
          created_at: string | null
          field_name: string
          id: string
          is_active: boolean | null
          min_frequency: number | null
          pattern: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          id?: string
          is_active?: boolean | null
          min_frequency?: number | null
          pattern?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          id?: string
          is_active?: boolean | null
          min_frequency?: number | null
          pattern?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tag_verification_history: {
        Row: {
          id: string
          metadata: Json | null
          status: string
          tag_name: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          status: string
          tag_name: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          status?: string
          tag_name?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      temp_imports: {
        Row: {
          admin_id: string | null
          created_at: string | null
          detected_delimiter:
            | Database["public"]["Enums"]["delimiter_type"]
            | null
          detected_encoding: Database["public"]["Enums"]["file_encoding"] | null
          error_summary: Json | null
          expires_at: string
          id: string
          import_type: string
          metadata: Json | null
          original_filename: string
          parsing_errors: Json | null
          raw_data: Json
          status: Database["public"]["Enums"]["import_status"] | null
          validated_data: Json | null
          validation_errors: Json[] | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          detected_delimiter?:
            | Database["public"]["Enums"]["delimiter_type"]
            | null
          detected_encoding?:
            | Database["public"]["Enums"]["file_encoding"]
            | null
          error_summary?: Json | null
          expires_at: string
          id?: string
          import_type: string
          metadata?: Json | null
          original_filename: string
          parsing_errors?: Json | null
          raw_data: Json
          status?: Database["public"]["Enums"]["import_status"] | null
          validated_data?: Json | null
          validation_errors?: Json[] | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          detected_delimiter?:
            | Database["public"]["Enums"]["delimiter_type"]
            | null
          detected_encoding?:
            | Database["public"]["Enums"]["file_encoding"]
            | null
          error_summary?: Json | null
          expires_at?: string
          id?: string
          import_type?: string
          metadata?: Json | null
          original_filename?: string
          parsing_errors?: Json | null
          raw_data?: Json
          status?: Database["public"]["Enums"]["import_status"] | null
          validated_data?: Json | null
          validation_errors?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "temp_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temp_imports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      template_collaborators: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["collaboration_role"]
          template_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["collaboration_role"]
          template_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["collaboration_role"]
          template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_collaborators_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_layout_elements: {
        Row: {
          created_at: string
          element_type: string
          grid_position: Json
          id: string
          position: Json
          properties: Json
          size: Json
          template_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          element_type: string
          grid_position?: Json
          id?: string
          position?: Json
          properties?: Json
          size?: Json
          template_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          element_type?: string
          grid_position?: Json
          id?: string
          position?: Json
          properties?: Json
          size?: Json
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_layout_elements_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_rule_definitions: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rule_type?: Database["public"]["Enums"]["validation_rule_type"]
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_rule_definitions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_validation_mappings: {
        Row: {
          configuration_override: Json | null
          created_at: string | null
          id: string
          rule_id: string
          template_id: string
        }
        Insert: {
          configuration_override?: Json | null
          created_at?: string | null
          id?: string
          rule_id: string
          template_id: string
        }
        Update: {
          configuration_override?: Json | null
          created_at?: string | null
          id?: string
          rule_id?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_validation_mappings_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "unified_validation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      template_validation_rules: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          rule_config: Json
          rule_type: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rule_config?: Json
          rule_type: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rule_config?: Json
          rule_type?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_validation_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_version_history: {
        Row: {
          content: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_current: boolean | null
          metadata: Json | null
          template_id: string
          version_number: number
        }
        Insert: {
          content: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_current?: boolean | null
          metadata?: Json | null
          template_id: string
          version_number: number
        }
        Update: {
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_current?: boolean | null
          metadata?: Json | null
          template_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_version_history_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_versions: {
        Row: {
          changes: Json
          created_at: string | null
          created_by: string | null
          diff_summary: Json | null
          id: string
          metadata: Json | null
          rollback_status: string | null
          template_id: string | null
          version_number: number
        }
        Insert: {
          changes: Json
          created_at?: string | null
          created_by?: string | null
          diff_summary?: Json | null
          id?: string
          metadata?: Json | null
          rollback_status?: string | null
          template_id?: string | null
          version_number: number
        }
        Update: {
          changes?: Json
          created_at?: string | null
          created_by?: string | null
          diff_summary?: Json | null
          id?: string
          metadata?: Json | null
          rollback_status?: string | null
          template_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_visual_layouts: {
        Row: {
          created_at: string | null
          created_by: string | null
          field_mappings: Json
          id: string
          layout_data: Json
          preview_config: Json
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          field_mappings?: Json
          id?: string
          layout_data?: Json
          preview_config?: Json
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          field_mappings?: Json
          id?: string
          layout_data?: Json
          preview_config?: Json
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_visual_layouts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "data_maestro_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      transformation_executions: {
        Row: {
          created_at: string | null
          error_message: string | null
          execution_time: unknown | null
          id: string
          input_value: Json
          output_value: Json | null
          success: boolean | null
          transformation_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          execution_time?: unknown | null
          id?: string
          input_value: Json
          output_value?: Json | null
          success?: boolean | null
          transformation_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          execution_time?: unknown | null
          id?: string
          input_value?: Json
          output_value?: Json | null
          success?: boolean | null
          transformation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transformation_executions_transformation_id_fkey"
            columns: ["transformation_id"]
            isOneToOne: false
            referencedRelation: "transformation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      transformation_functions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          function_body: string
          function_type: Database["public"]["Enums"]["transformation_type"]
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          function_body: string
          function_type: Database["public"]["Enums"]["transformation_type"]
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          function_body?: string
          function_type?: Database["public"]["Enums"]["transformation_type"]
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Relationships: []
      }
      transformation_rule_configs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          rules: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rules: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rules?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      transformation_rules: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          rule_type: string
          script: string | null
          updated_at: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          rule_type: string
          script?: string | null
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          rule_type?: string
          script?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transformation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transformation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      transformation_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_predefined: boolean | null
          name: string
          template: Json
          type: Database["public"]["Enums"]["transformation_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_predefined?: boolean | null
          name: string
          template: Json
          type: Database["public"]["Enums"]["transformation_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_predefined?: boolean | null
          name?: string
          template?: Json
          type?: Database["public"]["Enums"]["transformation_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      trusted_devices: {
        Row: {
          created_at: string | null
          device_hash: string
          device_name: string | null
          expires_at: string
          id: string
          last_browser: string | null
          last_ip: string | null
          last_used: string | null
          risk_score: number | null
          trust_token: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_hash: string
          device_name?: string | null
          expires_at: string
          id?: string
          last_browser?: string | null
          last_ip?: string | null
          last_used?: string | null
          risk_score?: number | null
          trust_token?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_hash?: string
          device_name?: string | null
          expires_at?: string
          id?: string
          last_browser?: string | null
          last_ip?: string | null
          last_used?: string | null
          risk_score?: number | null
          trust_token?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trusted_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trusted_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      two_factor_attempts: {
        Row: {
          attempt_count: number | null
          id: string
          last_attempt: string | null
          locked_until: string | null
          user_id: string | null
        }
        Insert: {
          attempt_count?: number | null
          id?: string
          last_attempt?: string | null
          locked_until?: string | null
          user_id?: string | null
        }
        Update: {
          attempt_count?: number | null
          id?: string
          last_attempt?: string | null
          locked_until?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "two_factor_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "two_factor_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      unified_validation_rules: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_global: boolean | null
          name: string
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_global?: boolean | null
          name: string
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_global?: boolean | null
          name?: string
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_achievement_progress: {
        Row: {
          achievement_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          progress: number | null
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievement_progress_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievement_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievement_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          completed_at: string | null
          created_at: string | null
          display_settings: Json | null
          id: string
          progress: Json
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed_at?: string | null
          created_at?: string | null
          display_settings?: Json | null
          id?: string
          progress?: Json
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed_at?: string | null
          created_at?: string | null
          display_settings?: Json | null
          id?: string
          progress?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_metrics: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          page_path: string
          points_earned: number | null
          user_id: string
          visit_ended_at: string | null
          visit_started_at: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_path: string
          points_earned?: number | null
          user_id: string
          visit_ended_at?: string | null
          visit_started_at?: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_path?: string
          points_earned?: number | null
          user_id?: string
          visit_ended_at?: string | null
          visit_started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_points: {
        Row: {
          activity_type: string
          created_at: string | null
          id: string
          metadata: Json | null
          points: number
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          points: number
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          points?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_audit_logs: {
        Row: {
          action_details: Json
          action_type: Database["public"]["Enums"]["audit_action_type"]
          created_at: string | null
          id: string
          performed_by: string
          user_id: string
        }
        Insert: {
          action_details: Json
          action_type: Database["public"]["Enums"]["audit_action_type"]
          created_at?: string | null
          id?: string
          performed_by: string
          user_id: string
        }
        Update: {
          action_details?: Json
          action_type?: Database["public"]["Enums"]["audit_action_type"]
          created_at?: string | null
          id?: string
          performed_by?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_audit_logs_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_audit_logs_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_connections_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_connections_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_connections_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_connections_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_locations: {
        Row: {
          city: string | null
          country: string | null
          last_updated: string | null
          latitude: number | null
          longitude: number | null
          timezone: string | null
          user_id: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          last_updated?: string | null
          latitude?: number | null
          longitude?: number | null
          timezone?: string | null
          user_id: string
        }
        Update: {
          city?: string | null
          country?: string | null
          last_updated?: string | null
          latitude?: number | null
          longitude?: number | null
          timezone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_locations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_locations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_onboarding_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          skipped_at: string | null
          status: string
          step_key: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          skipped_at?: string | null
          status?: string
          step_key: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          skipped_at?: string | null
          status?: string
          step_key?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          component_type: string
          created_at: string | null
          id: string
          preferences: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          component_type: string
          created_at?: string | null
          id?: string
          preferences?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          component_type?: string
          created_at?: string | null
          id?: string
          preferences?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          last_seen_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          last_seen_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          last_seen_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_presence_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_presence_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      validation_function_tests: {
        Row: {
          actual_output: Json | null
          error_message: string | null
          executed_at: string | null
          execution_time_ms: number | null
          expected_output: Json
          function_id: string | null
          id: string
          is_passing: boolean | null
          test_input: Json
        }
        Insert: {
          actual_output?: Json | null
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          expected_output: Json
          function_id?: string | null
          id?: string
          is_passing?: boolean | null
          test_input: Json
        }
        Update: {
          actual_output?: Json | null
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          expected_output?: Json
          function_id?: string | null
          id?: string
          is_passing?: boolean | null
          test_input?: Json
        }
        Relationships: [
          {
            foreignKeyName: "validation_function_tests_function_id_fkey"
            columns: ["function_id"]
            isOneToOne: false
            referencedRelation: "custom_validation_functions"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          group_type: string | null
          id: string
          metadata: Json | null
          name: string
          parent_group_id: string | null
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          group_type?: string | null
          id?: string
          metadata?: Json | null
          name: string
          parent_group_id?: string | null
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          group_type?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          parent_group_id?: string | null
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validation_groups_parent_group_id_fkey"
            columns: ["parent_group_id"]
            isOneToOne: false
            referencedRelation: "validation_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_rule_tests: {
        Row: {
          created_at: string | null
          created_by: string | null
          error_message: string | null
          id: string
          rule_id: string | null
          test_data: Json
          test_result: boolean
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          rule_id?: string | null
          test_data: Json
          test_result: boolean
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          rule_id?: string | null
          test_data?: Json
          test_result?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "validation_rule_tests_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "template_validation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_rules: {
        Row: {
          configuration: Json | null
          created_at: string | null
          created_by: string | null
          dependency_chain: Json | null
          description: string | null
          error_message_template: string | null
          execution_order: number | null
          group_id: string | null
          id: string
          is_active: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          success_message_template: string | null
          template_id: string | null
          updated_at: string | null
          validation_scope: string | null
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          dependency_chain?: Json | null
          description?: string | null
          error_message_template?: string | null
          execution_order?: number | null
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["validation_rule_type"]
          success_message_template?: string | null
          template_id?: string | null
          updated_at?: string | null
          validation_scope?: string | null
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          dependency_chain?: Json | null
          description?: string | null
          error_message_template?: string | null
          execution_order?: number | null
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rule_type?: Database["public"]["Enums"]["validation_rule_type"]
          success_message_template?: string | null
          template_id?: string | null
          updated_at?: string | null
          validation_scope?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validation_rules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "validation_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validation_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "import_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      vdb_collaborators: {
        Row: {
          created_at: string | null
          id: string
          role: string
          template_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          template_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vdb_collaborators_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "vdb_visual_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      vdb_configurations: {
        Row: {
          allow_duplicates: boolean | null
          auto_generate_tags: boolean | null
          created_at: string | null
          created_by: string | null
          delimiter: string
          encoding: string
          id: string
          min_primary_fields: number | null
          name: string
          null_threshold: number | null
          preview_config: Json | null
          primary_fields: Json
          secondary_fields: Json
          table_name: string
          tag_generation_config: Json | null
          updated_at: string | null
          validation_rules: Json
        }
        Insert: {
          allow_duplicates?: boolean | null
          auto_generate_tags?: boolean | null
          created_at?: string | null
          created_by?: string | null
          delimiter?: string
          encoding?: string
          id?: string
          min_primary_fields?: number | null
          name: string
          null_threshold?: number | null
          preview_config?: Json | null
          primary_fields?: Json
          secondary_fields?: Json
          table_name: string
          tag_generation_config?: Json | null
          updated_at?: string | null
          validation_rules?: Json
        }
        Update: {
          allow_duplicates?: boolean | null
          auto_generate_tags?: boolean | null
          created_at?: string | null
          created_by?: string | null
          delimiter?: string
          encoding?: string
          id?: string
          min_primary_fields?: number | null
          name?: string
          null_threshold?: number | null
          preview_config?: Json | null
          primary_fields?: Json
          secondary_fields?: Json
          table_name?: string
          tag_generation_config?: Json | null
          updated_at?: string | null
          validation_rules?: Json
        }
        Relationships: []
      }
      vdb_entries: {
        Row: {
          created_at: string | null
          created_by: string | null
          entry_data: Json
          id: string
          metadata: Json | null
          status: string
          table_name: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          entry_data?: Json
          id?: string
          metadata?: Json | null
          status?: string
          table_name: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          entry_data?: Json
          id?: string
          metadata?: Json | null
          status?: string
          table_name?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      vdb_schema_versions: {
        Row: {
          applied_at: string | null
          changes: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          version_number: number
        }
        Insert: {
          applied_at?: string | null
          changes: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          version_number: number
        }
        Update: {
          applied_at?: string | null
          changes?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          version_number?: number
        }
        Relationships: []
      }
      vdb_sessions: {
        Row: {
          column_mappings: Json | null
          completed_at: string | null
          created_at: string | null
          error_count: number | null
          file_name: string
          id: string
          original_data: Json | null
          processed_count: number | null
          processed_data: Json | null
          row_count: number | null
          status: string
          target_table: string
          user_id: string | null
          validation_errors: Json[] | null
        }
        Insert: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name: string
          id?: string
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Update: {
          column_mappings?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_count?: number | null
          file_name?: string
          id?: string
          original_data?: Json | null
          processed_count?: number | null
          processed_data?: Json | null
          row_count?: number | null
          status?: string
          target_table?: string
          user_id?: string | null
          validation_errors?: Json[] | null
        }
        Relationships: []
      }
      vdb_template_layouts: {
        Row: {
          created_at: string | null
          field_config: Json
          id: string
          layout_data: Json
          preview_config: Json | null
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          field_config?: Json
          id?: string
          layout_data?: Json
          preview_config?: Json | null
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          field_config?: Json
          id?: string
          layout_data?: Json
          preview_config?: Json | null
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vdb_template_layouts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "vdb_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      vdb_template_library: {
        Row: {
          content: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          tags: string[] | null
          template_type: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          tags?: string[] | null
          template_type: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          tags?: string[] | null
          template_type?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      vdb_templates: {
        Row: {
          column_mappings: Json
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          target_table: string
          updated_at: string | null
          validation_rules: Json | null
        }
        Insert: {
          column_mappings: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          target_table: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Update: {
          column_mappings?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          target_table?: string
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Relationships: []
      }
      vdb_visual_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          field_config: Json
          id: string
          is_active: boolean | null
          layout_config: Json
          name: string
          updated_at: string | null
          validation_rules: Json
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_config?: Json
          id?: string
          is_active?: boolean | null
          layout_config?: Json
          name: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          field_config?: Json
          id?: string
          is_active?: boolean | null
          layout_config?: Json
          name?: string
          updated_at?: string | null
          validation_rules?: Json
        }
        Relationships: []
      }
      visual_data_featured_images: {
        Row: {
          content_type: string
          created_at: string | null
          file_path: string
          file_size: number
          id: string
          session_id: string | null
        }
        Insert: {
          content_type: string
          created_at?: string | null
          file_path: string
          file_size: number
          id?: string
          session_id?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          file_path?: string
          file_size?: number
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visual_data_featured_images_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visual_data_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      visual_data_sessions: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          metadata: Json | null
          preview_data: Json | null
          session_type: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          metadata?: Json | null
          preview_data?: Json | null
          session_type: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          metadata?: Json | null
          preview_data?: Json | null
          session_type?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      visual_editor_presets: {
        Row: {
          allows_children: boolean | null
          category: string
          content: Json
          created_at: string | null
          id: string
          max_nesting_level: number | null
          name: string
          preset_type: string
          updated_at: string | null
        }
        Insert: {
          allows_children?: boolean | null
          category: string
          content: Json
          created_at?: string | null
          id?: string
          max_nesting_level?: number | null
          name: string
          preset_type: string
          updated_at?: string | null
        }
        Update: {
          allows_children?: boolean | null
          category?: string
          content?: Json
          created_at?: string | null
          id?: string
          max_nesting_level?: number | null
          name?: string
          preset_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      visual_tooltips: {
        Row: {
          created_at: string | null
          field_name: string
          id: string
          table_name: string
          tooltip_content: string
          tooltip_type: string | null
          updated_at: string | null
          visual_config: Json | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          id?: string
          table_name: string
          tooltip_content: string
          tooltip_type?: string | null
          updated_at?: string | null
          visual_config?: Json | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          id?: string
          table_name?: string
          tooltip_content?: string
          tooltip_type?: string | null
          updated_at?: string | null
          visual_config?: Json | null
        }
        Relationships: []
      }
      wishlist_embeds: {
        Row: {
          appearance_config: Json | null
          created_at: string | null
          embed_key: string
          id: string
          last_viewed_at: string | null
          views_count: number | null
          wishlist_id: string | null
        }
        Insert: {
          appearance_config?: Json | null
          created_at?: string | null
          embed_key: string
          id?: string
          last_viewed_at?: string | null
          views_count?: number | null
          wishlist_id?: string | null
        }
        Update: {
          appearance_config?: Json | null
          created_at?: string | null
          embed_key?: string
          id?: string
          last_viewed_at?: string | null
          views_count?: number | null
          wishlist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_embeds_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          added_at: string | null
          component_id: string
          component_type: string
          id: string
          notify_on_price_drop: boolean | null
          notify_on_stock: boolean | null
          price_at_add: number | null
          target_price: number | null
          wishlist_id: string
        }
        Insert: {
          added_at?: string | null
          component_id: string
          component_type: string
          id?: string
          notify_on_price_drop?: boolean | null
          notify_on_stock?: boolean | null
          price_at_add?: number | null
          target_price?: number | null
          wishlist_id: string
        }
        Update: {
          added_at?: string | null
          component_id?: string
          component_type?: string
          id?: string
          notify_on_price_drop?: boolean | null
          notify_on_stock?: boolean | null
          price_at_add?: number | null
          target_price?: number | null
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      wizard_help_content: {
        Row: {
          content: string
          created_at: string | null
          id: string
          order_index: number
          step_key: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          order_index: number
          step_key: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          order_index?: number
          step_key?: string
          title?: string
        }
        Relationships: []
      }
      workflow_analytics: {
        Row: {
          average_completion_time: unknown | null
          completed_instances: number | null
          created_at: string | null
          id: string
          success_rate: number | null
          total_instances: number | null
          updated_at: string | null
          workflow_id: string | null
        }
        Insert: {
          average_completion_time?: unknown | null
          completed_instances?: number | null
          created_at?: string | null
          id?: string
          success_rate?: number | null
          total_instances?: number | null
          updated_at?: string | null
          workflow_id?: string | null
        }
        Update: {
          average_completion_time?: unknown | null
          completed_instances?: number | null
          created_at?: string | null
          id?: string
          success_rate?: number | null
          total_instances?: number | null
          updated_at?: string | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_analytics_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_instance_steps: {
        Row: {
          assigned_to: string | null
          comments: string[] | null
          completed_at: string | null
          id: string
          input_data: Json | null
          instance_id: string | null
          output_data: Json | null
          started_at: string | null
          status: string
          step_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          comments?: string[] | null
          completed_at?: string | null
          id?: string
          input_data?: Json | null
          instance_id?: string | null
          output_data?: Json | null
          started_at?: string | null
          status?: string
          step_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          comments?: string[] | null
          completed_at?: string | null
          id?: string
          input_data?: Json | null
          instance_id?: string | null
          output_data?: Json | null
          started_at?: string | null
          status?: string
          step_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_instance_steps_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instance_steps_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instance_steps_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "workflow_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instance_steps_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_step_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_instances: {
        Row: {
          completed_at: string | null
          created_by: string | null
          current_step: string | null
          data: Json | null
          id: string
          metadata: Json | null
          started_at: string | null
          status: string | null
          workflow_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_by?: string | null
          current_step?: string | null
          data?: Json | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_by?: string | null
          current_step?: string | null
          data?: Json | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_instances_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instances_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instances_current_step_fkey"
            columns: ["current_step"]
            isOneToOne: false
            referencedRelation: "workflow_step_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instances_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_step_definitions: {
        Row: {
          config: Json
          created_at: string | null
          description: string | null
          id: string
          name: string
          position: number | null
          required: boolean | null
          step_type: Database["public"]["Enums"]["workflow_step_type"]
          validation_rules: Json | null
          workflow_id: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          position?: number | null
          required?: boolean | null
          step_type: Database["public"]["Enums"]["workflow_step_type"]
          validation_rules?: Json | null
          workflow_id?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          position?: number | null
          required?: boolean | null
          step_type?: Database["public"]["Enums"]["workflow_step_type"]
          validation_rules?: Json | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_step_definitions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_step_logs: {
        Row: {
          completed_at: string | null
          data: Json | null
          id: string
          instance_id: string | null
          performed_by: string | null
          started_at: string | null
          status: string
          step_id: string | null
        }
        Insert: {
          completed_at?: string | null
          data?: Json | null
          id?: string
          instance_id?: string | null
          performed_by?: string | null
          started_at?: string | null
          status: string
          step_id?: string | null
        }
        Update: {
          completed_at?: string | null
          data?: Json | null
          id?: string
          instance_id?: string | null
          performed_by?: string | null
          started_at?: string | null
          status?: string
          step_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_step_logs_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "workflow_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_step_logs_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_step_logs_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_step_logs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_step_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_step_types: {
        Row: {
          configuration_schema: Json | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          configuration_schema?: Json | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          configuration_schema?: Json | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      workflow_steps: {
        Row: {
          comparison_config: Json | null
          component_filters: Json | null
          created_at: string | null
          description: string | null
          diagram_config: Json | null
          id: string
          is_required: boolean | null
          name: string
          step_type: string
          ui_schema: Json | null
          updated_at: string | null
          validation_rules: Json | null
          workflow_id: string | null
        }
        Insert: {
          comparison_config?: Json | null
          component_filters?: Json | null
          created_at?: string | null
          description?: string | null
          diagram_config?: Json | null
          id?: string
          is_required?: boolean | null
          name: string
          step_type: string
          ui_schema?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          workflow_id?: string | null
        }
        Update: {
          comparison_config?: Json | null
          component_filters?: Json | null
          created_at?: string | null
          description?: string | null
          diagram_config?: Json | null
          id?: string
          is_required?: boolean | null
          name?: string
          step_type?: string
          ui_schema?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_steps_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "build_submission_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          category: string | null
          complexity_level: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_duration: unknown | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          success_rate: number | null
          tags: string[] | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          category?: string | null
          complexity_level?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_duration?: unknown | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          category?: string | null
          complexity_level?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_duration?: unknown | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      build_gallery_view: {
        Row: {
          belt_details: Json[] | null
          build_type: string | null
          build_volume: Json | null
          builder_display_name: string | null
          builder_name: string | null
          building_experience: string | null
          compatibility_summary: string | null
          created_at: string | null
          description: string | null
          difficulty:
            | Database["public"]["Enums"]["build_difficulty_type"]
            | null
          enclosure_details: string | null
          expansion_cards: Json[] | null
          extruder_id: string | null
          extrusion_details: Json[] | null
          featured_rotation_count: number | null
          heatbed_id: string | null
          hotend_id: string | null
          id: string | null
          images: string[] | null
          is_public: boolean | null
          issues_faced: string | null
          kinematics: Database["public"]["Enums"]["kinematics_type"] | null
          likes_count: number | null
          mcu_id: string | null
          motion_system: Json | null
          popularity_score: number | null
          power_supply_details: Json | null
          printer_name: string | null
          required_fields_complete: boolean | null
          sbc_details: Json | null
          sort_score: number | null
          tags: string[] | null
          technical_specs: Json | null
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "printer_builds_extruder_id_fkey"
            columns: ["extruder_id"]
            isOneToOne: false
            referencedRelation: "extruders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_heatbed_id_fkey"
            columns: ["heatbed_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_hotend_id_fkey"
            columns: ["hotend_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_mcu_id_fkey"
            columns: ["mcu_id"]
            isOneToOne: false
            referencedRelation: "base_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      user_leaderboard: {
        Row: {
          achievements_count: number | null
          avatar_url: string | null
          completed_achievements: number | null
          current_level: number | null
          display_name: string | null
          id: string | null
          rank: number | null
          total_builds: number | null
          total_points: number | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_string_transformation: {
        Args: {
          p_input: Json
          p_config: Json
        }
        Returns: Json
      }
      apply_transformation: {
        Args: {
          p_input: Json
          p_type: string
          p_config: Json
        }
        Returns: Json
      }
      associate_with_data_maestro: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_user_level: {
        Args: {
          user_points: number
        }
        Returns: {
          level_number: number
          title: string
          next_level_points: number
        }[]
      }
      calculate_user_points: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      check_2fa_attempts: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
      check_and_award_achievements: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      check_auth_rate_limit: {
        Args: {
          p_user_id: string
          p_ip_address: string
          p_attempt_type: string
          p_time_window?: unknown
          p_max_attempts?: number
        }
        Returns: boolean
      }
      check_component_compatibility: {
        Args: {
          component_ids: string[]
        }
        Returns: {
          is_compatible: boolean
          incompatible_pairs: Json
        }[]
      }
      check_component_duplicate: {
        Args: {
          p_name: string
          p_manufacturer: string
          p_component_type: string
        }
        Returns: {
          is_duplicate: boolean
          existing_component_id: string
        }[]
      }
      check_components_compatibility: {
        Args: {
          component_id: string
          other_component_id: string
        }
        Returns: boolean
      }
      check_price_alerts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_rate_limit: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_max_count: number
          p_time_window: unknown
        }
        Returns: boolean
      }
      check_rule_conflicts: {
        Args: {
          p_template_id: string
          p_rule_name: string
          p_rule_type: Database["public"]["Enums"]["validation_rule_type"]
          p_configuration: Json
        }
        Returns: {
          has_conflict: boolean
          conflict_details: string
        }[]
      }
      check_table_name_unique: {
        Args: {
          p_table_name: string
        }
        Returns: boolean
      }
      check_validation_rule_dependencies: {
        Args: {
          rule_id: string
          dependencies: Json
        }
        Returns: boolean
      }
      cleanup_expired_imports: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_rollbacks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      debug_gamification_access: {
        Args: {
          p_user_id: string
        }
        Returns: {
          table_name: string
          can_select: boolean
          can_insert: boolean
          error_message: string
        }[]
      }
      detect_circular_relationship: {
        Args: {
          p_source_table: string
          p_target_table: string
        }
        Returns: boolean
      }
      execute_transformation: {
        Args: {
          p_transformation_id: string
          p_input_value: Json
        }
        Returns: Json
      }
      generate_api_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_available_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
      get_enhanced_schema_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          columns: Json
          foreign_keys: Json
          primary_keys: Json
        }[]
      }
      get_schema_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          columns: Json
          foreign_keys: Json
        }[]
      }
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["user_role_type"]
      }
      has_admin_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["admin_role_type"]
        }
        Returns: boolean
      }
      has_minimum_role: {
        Args: {
          user_id: string
          minimum_role: Database["public"]["Enums"]["user_role_type"]
        }
        Returns: boolean
      }
      initialize_user_gamification: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_user_id: string
          p_activity_type: string
          p_metadata?: Json
        }
        Returns: undefined
      }
      recalculate_user_points: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      record_security_event: {
        Args: {
          p_user_id: string
          p_event_type: string
          p_severity: string
          p_metadata?: Json
        }
        Returns: string
      }
      reset_daily_points: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      select_featured_builds: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          score: number
          last_featured: string
        }[]
      }
      validate_component_data: {
        Args: {
          p_table_name: string
          p_data: Json
        }
        Returns: {
          is_valid: boolean
          errors: Json
        }[]
      }
      validate_component_import: {
        Args: {
          p_table_name: string
          p_data: Json
        }
        Returns: {
          is_valid: boolean
          errors: Json
        }[]
      }
      validate_import_field_name: {
        Args: {
          p_field_name: string
        }
        Returns: {
          is_valid: boolean
          error_message: string
        }[]
      }
      validate_import_relationship: {
        Args: {
          p_source_table: string
          p_target_table: string
          p_relationship_type: string
        }
        Returns: {
          is_valid: boolean
          error_message: string
        }[]
      }
      validate_import_table_name: {
        Args: {
          p_table_name: string
        }
        Returns: {
          is_valid: boolean
          error_message: string
        }[]
      }
      validate_table_name: {
        Args: {
          p_table_name: string
        }
        Returns: {
          is_valid: boolean
          error_message: string
        }[]
      }
    }
    Enums: {
      achievement_category: "community" | "builder" | "explorer" | "creator"
      admin_role_type:
        | "super_admin"
        | "content_admin"
        | "community_admin"
        | "catalog_admin"
      api_access_level: "read_only" | "developer" | "admin"
      audit_action_type: "role_change" | "status_change"
      build_difficulty: "beginner" | "intermediate" | "advanced" | "expert"
      build_difficulty_type: "beginner" | "intermediate" | "advanced" | "expert"
      build_status: "draft" | "in_progress" | "completed"
      collaboration_role: "viewer" | "editor" | "admin"
      community_support_type: "poor" | "fair" | "good" | "excellent"
      complexity_type: "low" | "medium" | "high" | "very_high"
      delimiter_type: "comma" | "semicolon" | "tab" | "pipe"
      difficulty_type: "beginner" | "intermediate" | "advanced" | "expert"
      documentation_type: "poor" | "fair" | "good" | "excellent"
      file_encoding: "UTF-8" | "ASCII" | "ISO-8859-1" | "UTF-16"
      file_format_type: "csv" | "json" | "xlsx" | "xml"
      flexibility_type: "low" | "medium" | "high" | "very_high"
      import_mode: "single" | "bulk"
      import_status:
        | "pending"
        | "mapping"
        | "validation"
        | "completed"
        | "failed"
      kinematic_type: "cartesian" | "corexy" | "delta" | "polar" | "scara"
      kinematics_type:
        | "cartesian"
        | "corexy"
        | "corexz"
        | "delta"
        | "polar"
        | "scara"
        | "other"
      motion_type: "linear_rail" | "lead_rod" | "belt"
      rating_type: "low" | "medium" | "high"
      rule_type:
        | "required"
        | "min_length"
        | "max_length"
        | "pattern"
        | "allowed_chars"
        | "custom"
      setting_type: "number" | "boolean" | "string" | "json" | "formula"
      step_status: "pending" | "completed" | "skipped"
      strength_type: "low" | "medium" | "high" | "very_high"
      subscription_type: "free" | "basic" | "premium"
      template_status: "draft" | "published" | "archived"
      transformation_type:
        | "string_manipulation"
        | "date_format"
        | "number_format"
        | "conditional"
        | "custom_script"
      trending_type: "down" | "stable" | "up"
      user_role_type:
        | "admin"
        | "editor"
        | "builder"
        | "building"
        | "subscriber"
        | "visitor"
        | "super_admin"
      validation_group_type: "standard" | "custom" | "system"
      validation_rule_type:
        | "required"
        | "min_length"
        | "max_length"
        | "pattern"
        | "allowed_chars"
        | "data_type"
        | "custom"
      value_rating_type: "excellent" | "good" | "fair" | "poor"
      value_type: "poor" | "fair" | "good" | "excellent"
      workflow_step_type:
        | "input"
        | "automated"
        | "approval"
        | "notification"
        | "condition"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
