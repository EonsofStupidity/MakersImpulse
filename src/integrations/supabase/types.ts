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
      active_2fa_sessions: {
        Row: {
          created_at: string | null
          device_name: string
          id: string
          ip_address: string | null
          is_active: boolean | null
          last_activity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_name: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_name?: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_type: string | null
          setting_value: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_toolbar_shortcuts: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          position: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          position?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          position?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_error_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          error_type: string
          id: string
          metadata: Json | null
          stack_trace: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          error_type: string
          id?: string
          metadata?: Json | null
          stack_trace?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          error_type?: string
          id?: string
          metadata?: Json | null
          stack_trace?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          refresh_token: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          refresh_token?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          refresh_token?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          category: Database["public"]["Enums"]["post_category"] | null
          content: string
          excerpt: string | null
          featured_image: string | null
          id: string
          images: string[] | null
          published_at: string | null
          rich_content: Json | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id: string
          category?: Database["public"]["Enums"]["post_category"] | null
          content: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          published_at?: string | null
          rich_content?: Json | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string
          category?: Database["public"]["Enums"]["post_category"] | null
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          published_at?: string | null
          rich_content?: Json | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_profiles_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "cms_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string
          id: string
          metadata: Json | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          updated_at: string | null
          updated_by: string | null
          version: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by: string
          id?: string
          metadata?: Json | null
          slug?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          updated_at?: string | null
          updated_by?: string | null
          version?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string
          id?: string
          metadata?: Json | null
          slug?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["content_type"]
          updated_at?: string | null
          updated_by?: string | null
          version?: number | null
        }
        Relationships: []
      }
      cms_content_relationships: {
        Row: {
          child_id: string | null
          id: string
          order_index: number | null
          parent_id: string | null
          relationship_type: string
        }
        Insert: {
          child_id?: string | null
          id?: string
          order_index?: number | null
          parent_id?: string | null
          relationship_type: string
        }
        Update: {
          child_id?: string | null
          id?: string
          order_index?: number | null
          parent_id?: string | null
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_relationships_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_relationships_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content_revisions: {
        Row: {
          change_summary: string | null
          content: Json
          content_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          metadata: Json | null
          publish_status: string | null
          rollback_from: string | null
          rollback_metadata: Json | null
          scheduled_publish_at: string | null
          version_number: number | null
        }
        Insert: {
          change_summary?: string | null
          content: Json
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          publish_status?: string | null
          rollback_from?: string | null
          rollback_metadata?: Json | null
          scheduled_publish_at?: string | null
          version_number?: number | null
        }
        Update: {
          change_summary?: string | null
          content?: Json
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          publish_status?: string | null
          rollback_from?: string | null
          rollback_metadata?: Json | null
          scheduled_publish_at?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_revisions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_revisions_profiles_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_revisions_rollback_from_fkey"
            columns: ["rollback_from"]
            isOneToOne: false
            referencedRelation: "cms_content_revisions"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_workflows: {
        Row: {
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          stages: Json | null
          steps: Json
          triggers: Json | null
          updated_at: string | null
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          stages?: Json | null
          steps: Json
          triggers?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          stages?: Json | null
          steps?: Json
          triggers?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enhanced_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          error_code: string | null
          error_message: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          new_state: Json | null
          previous_state: Json | null
          request_id: string | null
          resource_id: string | null
          resource_type: string
          role: Database["public"]["Enums"]["user_role"] | null
          session_id: string | null
          severity: string
          stack_trace: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          error_code?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          request_id?: string | null
          resource_id?: string | null
          resource_type: string
          role?: Database["public"]["Enums"]["user_role"] | null
          session_id?: string | null
          severity: string
          stack_trace?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          error_code?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          request_id?: string | null
          resource_id?: string | null
          resource_type?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          session_id?: string | null
          severity?: string
          stack_trace?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      erd_visualizations: {
        Row: {
          created_at: string | null
          created_by: string | null
          data: Json
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data: Json
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data?: Json
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      forum_flags: {
        Row: {
          created_at: string | null
          id: string
          reason: string
          reporter_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          thread_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          thread_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_flags_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
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
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_profiles_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      import_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          file_name: string | null
          file_size: number | null
          id: string
          metadata: Json | null
          name: string | null
          row_count: number | null
          status: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          metadata?: Json | null
          name?: string | null
          row_count?: number | null
          status: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          metadata?: Json | null
          name?: string | null
          row_count?: number | null
          status?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      maker_projects: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          email: string | null
          estimated_time: string | null
          id: string
          likes_count: number | null
          name: string | null
          parts_count: number | null
          role: string | null
          status: string | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          email?: string | null
          estimated_time?: string | null
          id?: string
          likes_count?: number | null
          name?: string | null
          parts_count?: number | null
          role?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          email?: string | null
          estimated_time?: string | null
          id?: string
          likes_count?: number | null
          name?: string | null
          parts_count?: number | null
          role?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      media: {
        Row: {
          blog_post_id: string | null
          created_at: string | null
          id: string
          name: string
          size: number | null
          type: string | null
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          size?: number | null
          type?: string | null
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          size?: number | null
          type?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      mi3dp_attributes: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          name: string
          value_type: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          value_type: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          value_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "mi3dp_attributes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "mi3dp_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      mi3dp_builds: {
        Row: {
          build_volume: Json | null
          created_at: string | null
          description: string | null
          id: string
          images: Json | null
          name: string
          parts: Json | null
          user_id: string
        }
        Insert: {
          build_volume?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          name: string
          parts?: Json | null
          user_id: string
        }
        Update: {
          build_volume?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          name?: string
          parts?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_builds_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mi3dp_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          parent_category: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_category?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mi3dp_categories_parent_category_fkey"
            columns: ["parent_category"]
            isOneToOne: false
            referencedRelation: "mi3dp_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      mi3dp_part_taxonomy: {
        Row: {
          id: string
          part_id: string | null
          taxonomy_id: string | null
        }
        Insert: {
          id?: string
          part_id?: string | null
          taxonomy_id?: string | null
        }
        Update: {
          id?: string
          part_id?: string | null
          taxonomy_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mi3dp_part_taxonomy_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "mi3dp_parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mi3dp_part_taxonomy_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "mi3dp_taxonomies"
            referencedColumns: ["id"]
          },
        ]
      }
      mi3dp_parts: {
        Row: {
          attributes: Json | null
          category: string
          compatibility: Json | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          manufacturer: string | null
          name: string
          price: number | null
          subcategory: string | null
          updated_at: string | null
        }
        Insert: {
          attributes?: Json | null
          category: string
          compatibility?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          name: string
          price?: number | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Update: {
          attributes?: Json | null
          category?: string
          compatibility?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          name?: string
          price?: number | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mi3dp_taxonomies: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      mi3dp_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      navigation_settings: {
        Row: {
          created_at: string | null
          id: string
          menu_type: string
          settings: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_type: string
          settings?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_type?: string
          settings?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          ban_reason: string | null
          banned_at: string | null
          banned_by: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          failed_login_attempts: number | null
          failed_pin_attempts: number | null
          gamification_enabled: boolean | null
          id: string
          is_banned: boolean | null
          last_login_at: string | null
          last_password_login: string | null
          last_seen: string | null
          location: string | null
          lockout_until: string | null
          metadata: Json | null
          name: string | null
          onboarding_completed: boolean | null
          pin_enabled: boolean | null
          pin_hash: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string | null
          username: string | null
          visual_editor_enabled: boolean | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          banned_by?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          failed_pin_attempts?: number | null
          gamification_enabled?: boolean | null
          id: string
          is_banned?: boolean | null
          last_login_at?: string | null
          last_password_login?: string | null
          last_seen?: string | null
          location?: string | null
          lockout_until?: string | null
          metadata?: Json | null
          name?: string | null
          onboarding_completed?: boolean | null
          pin_enabled?: boolean | null
          pin_hash?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          username?: string | null
          visual_editor_enabled?: boolean | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          banned_by?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          failed_pin_attempts?: number | null
          gamification_enabled?: boolean | null
          id?: string
          is_banned?: boolean | null
          last_login_at?: string | null
          last_password_login?: string | null
          last_seen?: string | null
          location?: string | null
          lockout_until?: string | null
          metadata?: Json | null
          name?: string | null
          onboarding_completed?: boolean | null
          pin_enabled?: boolean | null
          pin_hash?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          username?: string | null
          visual_editor_enabled?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      publishing_queue: {
        Row: {
          content_id: string
          created_at: string | null
          created_by: string | null
          id: string
          processed_at: string | null
          revision_id: string
          scheduled_for: string
          status: string | null
        }
        Insert: {
          content_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          processed_at?: string | null
          revision_id: string
          scheduled_for: string
          status?: string | null
        }
        Update: {
          content_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          processed_at?: string | null
          revision_id?: string
          scheduled_for?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_publishing_queue_content"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_publishing_queue_revision"
            columns: ["revision_id"]
            isOneToOne: false
            referencedRelation: "cms_content_revisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publishing_queue_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publishing_queue_revision_id_fkey"
            columns: ["revision_id"]
            isOneToOne: false
            referencedRelation: "cms_content_revisions"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action: string
          count: number | null
          created_at: string | null
          id: string
          last_reset: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          count?: number | null
          created_at?: string | null
          id?: string
          last_reset?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          count?: number | null
          created_at?: string | null
          id?: string
          last_reset?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recovery_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          expires_at: string
          id: string
          used: boolean | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      redis_connection_states: {
        Row: {
          connection_id: string
          created_at: string | null
          id: string
          last_connected: string | null
          last_error: string | null
          metadata: Json | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          connection_id: string
          created_at?: string | null
          id?: string
          last_connected?: string | null
          last_error?: string | null
          metadata?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          connection_id?: string
          created_at?: string | null
          id?: string
          last_connected?: string | null
          last_error?: string | null
          metadata?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redis_connection_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      revision_history: {
        Row: {
          changes: Json
          created_at: string | null
          created_by: string | null
          entity_id: string
          entity_type: string
          id: string
          revision_type: string
        }
        Insert: {
          changes: Json
          created_at?: string | null
          created_by?: string | null
          entity_id: string
          entity_type: string
          id?: string
          revision_type: string
        }
        Update: {
          changes?: Json
          created_at?: string | null
          created_by?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          revision_type?: string
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
      security_configuration: {
        Row: {
          id: string
          security_settings: Json | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          security_settings?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          security_settings?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          severity: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          severity: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          severity?: string
          user_id?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          severity: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_logs_profiles_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      security_settings: {
        Row: {
          id: string
          settings: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          settings?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          settings?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      site_configuration: {
        Row: {
          id: string
          settings: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          settings?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          settings?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          setting_key: string
          setting_type: string | null
          setting_value: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          setting_key: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          setting_key?: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      theme_configuration: {
        Row: {
          accent_color: string | null
          backdrop_blur: string | null
          border_radius: string | null
          box_shadow: string | null
          component_type:
            | Database["public"]["Enums"]["theme_component_type"]
            | null
          favicon_url: string | null
          font_family_body: string
          font_family_heading: string
          font_size_base: string
          font_weight_bold: string
          font_weight_normal: string
          hover_scale: string | null
          id: string
          last_sync: string | null
          letter_spacing: string
          line_height_base: string
          logo_url: string | null
          neon_cyan: string | null
          neon_pink: string | null
          neon_purple: string | null
          primary_color: string | null
          secondary_color: string | null
          shadow_color: string | null
          site_title: string
          spacing_unit: string | null
          state_version: number | null
          tagline: string | null
          text_heading_color: string | null
          text_link_color: string | null
          text_primary_color: string | null
          text_secondary_color: string | null
          theme_mode: string | null
          transition_duration: string | null
          transition_type: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          accent_color?: string | null
          backdrop_blur?: string | null
          border_radius?: string | null
          box_shadow?: string | null
          component_type?:
            | Database["public"]["Enums"]["theme_component_type"]
            | null
          favicon_url?: string | null
          font_family_body: string
          font_family_heading: string
          font_size_base: string
          font_weight_bold: string
          font_weight_normal: string
          hover_scale?: string | null
          id?: string
          last_sync?: string | null
          letter_spacing: string
          line_height_base: string
          logo_url?: string | null
          neon_cyan?: string | null
          neon_pink?: string | null
          neon_purple?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          shadow_color?: string | null
          site_title: string
          spacing_unit?: string | null
          state_version?: number | null
          tagline?: string | null
          text_heading_color?: string | null
          text_link_color?: string | null
          text_primary_color?: string | null
          text_secondary_color?: string | null
          theme_mode?: string | null
          transition_duration?: string | null
          transition_type?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          accent_color?: string | null
          backdrop_blur?: string | null
          border_radius?: string | null
          box_shadow?: string | null
          component_type?:
            | Database["public"]["Enums"]["theme_component_type"]
            | null
          favicon_url?: string | null
          font_family_body?: string
          font_family_heading?: string
          font_size_base?: string
          font_weight_bold?: string
          font_weight_normal?: string
          hover_scale?: string | null
          id?: string
          last_sync?: string | null
          letter_spacing?: string
          line_height_base?: string
          logo_url?: string | null
          neon_cyan?: string | null
          neon_pink?: string | null
          neon_purple?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          shadow_color?: string | null
          site_title?: string
          spacing_unit?: string | null
          state_version?: number | null
          tagline?: string | null
          text_heading_color?: string | null
          text_link_color?: string | null
          text_primary_color?: string | null
          text_secondary_color?: string | null
          theme_mode?: string | null
          transition_duration?: string | null
          transition_type?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      trusted_devices: {
        Row: {
          created_at: string | null
          device_hash: string
          device_name: string
          expires_at: string
          id: string
          last_used: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_hash: string
          device_name: string
          expires_at: string
          id?: string
          last_used?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_hash?: string
          device_name?: string
          expires_at?: string
          id?: string
          last_used?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string | null
          details: string | null
          id: string
          metadata: Json | null
          state_data: Json | null
          sync_status: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          state_data?: Json | null
          sync_status?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          state_data?: Json | null
          sync_status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity_cms: {
        Row: {
          activity_type: string
          content_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_cms_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          stages: Json | null
          steps: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          stages?: Json | null
          steps?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          stages?: Json | null
          steps?: Json
          updated_at?: string | null
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
            foreignKeyName: "workflow_templates_profiles_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_blog_image: {
        Args: {
          post_id: string
          image_url: string
        }
        Returns: undefined
      }
      ban_user: {
        Args: {
          p_user_id: string
          p_reason: string
        }
        Returns: undefined
      }
      check_rate_limit: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_max_count: number
          p_time_window: string
        }
        Returns: boolean
      }
      create_rollback_revision: {
        Args: {
          p_content_id: string
          p_target_version_number: number
          p_current_content: Json
          p_user_id: string
        }
        Returns: undefined
      }
      initialize_user_gamification: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          p_event_type: string
          p_severity: string
          p_user_id: string
          p_resource_type: string
          p_resource_id: string
          p_action: string
          p_previous_state?: Json
          p_new_state?: Json
          p_metadata?: Json
          p_error_code?: string
          p_error_message?: string
          p_stack_trace?: string
        }
        Returns: string
      }
      parse_workflow_stages: {
        Args: {
          data: Json
        }
        Returns: Json
      }
      record_user_activity: {
        Args: {
          p_user_id: string
          p_activity_type: string
          p_details?: string
          p_metadata?: Json
        }
        Returns: string
      }
      resend_2fa_code: {
        Args: {
          p_email: string
        }
        Returns: Json
      }
      setup_pin:
        | {
            Args: {
              p_user_id: string
              p_pin: string
            }
            Returns: boolean
          }
        | {
            Args: {
              p_user_id: string
              p_pin: string
              p_ip_address?: string
              p_user_agent?: string
            }
            Returns: Json
          }
      update_site_settings: {
        Args: {
          p_site_title: string
          p_tagline: string
          p_primary_color: string
          p_secondary_color: string
          p_accent_color: string
          p_text_primary_color: string
          p_text_secondary_color: string
          p_text_link_color: string
          p_text_heading_color: string
          p_neon_cyan: string
          p_neon_pink: string
          p_neon_purple: string
          p_border_radius: string
          p_spacing_unit: string
          p_transition_duration: string
          p_shadow_color: string
          p_hover_scale: string
          p_font_family_heading: string
          p_font_family_body: string
          p_font_size_base: string
          p_font_weight_normal: string
          p_font_weight_bold: string
          p_line_height_base: string
          p_letter_spacing: string
        }
        Returns: {
          accent_color: string | null
          backdrop_blur: string | null
          border_radius: string | null
          box_shadow: string | null
          component_type:
            | Database["public"]["Enums"]["theme_component_type"]
            | null
          favicon_url: string | null
          font_family_body: string
          font_family_heading: string
          font_size_base: string
          font_weight_bold: string
          font_weight_normal: string
          hover_scale: string | null
          id: string
          last_sync: string | null
          letter_spacing: string
          line_height_base: string
          logo_url: string | null
          neon_cyan: string | null
          neon_pink: string | null
          neon_purple: string | null
          primary_color: string | null
          secondary_color: string | null
          shadow_color: string | null
          site_title: string
          spacing_unit: string | null
          state_version: number | null
          tagline: string | null
          text_heading_color: string | null
          text_link_color: string | null
          text_primary_color: string | null
          text_secondary_color: string | null
          theme_mode: string | null
          transition_duration: string | null
          transition_type: string | null
          updated_at: string | null
          updated_by: string | null
        }[]
      }
      verify_2fa_code: {
        Args: {
          p_code: string
          p_email: string
        }
        Returns: Json
      }
      verify_pin_login:
        | {
            Args: {
              p_user_id: string
              p_pin: string
            }
            Returns: boolean
          }
        | {
            Args: {
              p_user_id: string
              p_pin: string
              p_ip_address?: string
              p_user_agent?: string
            }
            Returns: Json
          }
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      content_type: "page" | "component" | "template" | "workflow"
      post_category:
        | "Guides"
        | "Reviews"
        | "Blog"
        | "Site Updates"
        | "Critical"
        | "3D Printer"
        | "3D Printer Hardware"
      setting_value_type: "string" | "number" | "boolean" | "json"
      theme_component_type:
        | "color"
        | "typography"
        | "layout"
        | "animation"
        | "effect"
      theme_mode: "light" | "dark" | "system"
      transition_type: "fade" | "slide" | "scale" | "blur"
      user_role: "subscriber" | "maker" | "admin" | "super_admin"
      workflow_stage_type:
        | "approval"
        | "review"
        | "task"
        | "notification"
        | "conditional"
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
