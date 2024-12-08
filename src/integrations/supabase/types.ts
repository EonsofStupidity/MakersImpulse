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
        Relationships: [
          {
            foreignKeyName: "active_2fa_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
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
          author_id?: string | null
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
          author_id?: string | null
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
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_components: {
        Row: {
          component_type: string
          created_by: string | null
          default_props: Json | null
          description: string | null
          id: string
          name: string
          props_schema: Json | null
          updated_at: string | null
        }
        Insert: {
          component_type: string
          created_by?: string | null
          default_props?: Json | null
          description?: string | null
          id?: string
          name: string
          props_schema?: Json | null
          updated_at?: string | null
        }
        Update: {
          component_type?: string
          created_by?: string | null
          default_props?: Json | null
          description?: string | null
          id?: string
          name?: string
          props_schema?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_components_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
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
          created_by?: string | null
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
          created_by?: string | null
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
        Relationships: [
          {
            foreignKeyName: "cms_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      cms_workflows: {
        Row: {
          created_by: string | null
          description: string | null
          id: string
          name: string
          steps: Json
          triggers: Json | null
          updated_at: string | null
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          steps: Json
          triggers?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          steps?: Json
          triggers?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maker_projects: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          estimated_time: string | null
          id: string
          likes_count: number | null
          parts_count: number | null
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
          estimated_time?: string | null
          id?: string
          likes_count?: number | null
          parts_count?: number | null
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
          estimated_time?: string | null
          id?: string
          likes_count?: number | null
          parts_count?: number | null
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
          created_at: string
          id: string
          name: string
          size: number | null
          type: string | null
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          name: string
          size?: number | null
          type?: string | null
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          name?: string
          size?: number | null
          type?: string | null
          updated_at?: string
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
      profiles: {
        Row: {
          avatar_url: string | null
          ban_reason: string | null
          banned_at: string | null
          banned_by: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          gamification_enabled: boolean | null
          id: string
          is_banned: boolean | null
          last_seen: string | null
          location: string | null
          onboarding_completed: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          banned_by?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          gamification_enabled?: boolean | null
          id: string
          is_banned?: boolean | null
          last_seen?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          banned_by?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          gamification_enabled?: boolean | null
          id?: string
          is_banned?: boolean | null
          last_seen?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_banned_by_fkey"
            columns: ["banned_by"]
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
        Relationships: [
          {
            foreignKeyName: "recovery_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          accent_color: string | null
          border_radius: string | null
          favicon_url: string | null
          font_family_body: string
          font_family_heading: string
          font_size_base: string
          font_weight_bold: string
          font_weight_normal: string
          hover_scale: string | null
          id: string
          letter_spacing: string
          line_height_base: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          shadow_color: string | null
          site_title: string
          spacing_unit: string | null
          tagline: string | null
          text_heading_color: string | null
          text_link_color: string | null
          text_primary_color: string | null
          text_secondary_color: string | null
          theme_mode: Database["public"]["Enums"]["theme_mode"] | null
          transition_duration: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          accent_color?: string | null
          border_radius?: string | null
          favicon_url?: string | null
          font_family_body?: string
          font_family_heading?: string
          font_size_base?: string
          font_weight_bold?: string
          font_weight_normal?: string
          hover_scale?: string | null
          id?: string
          letter_spacing?: string
          line_height_base?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          shadow_color?: string | null
          site_title?: string
          spacing_unit?: string | null
          tagline?: string | null
          text_heading_color?: string | null
          text_link_color?: string | null
          text_primary_color?: string | null
          text_secondary_color?: string | null
          theme_mode?: Database["public"]["Enums"]["theme_mode"] | null
          transition_duration?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          accent_color?: string | null
          border_radius?: string | null
          favicon_url?: string | null
          font_family_body?: string
          font_family_heading?: string
          font_size_base?: string
          font_weight_bold?: string
          font_weight_normal?: string
          hover_scale?: string | null
          id?: string
          letter_spacing?: string
          line_height_base?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          shadow_color?: string | null
          site_title?: string
          spacing_unit?: string | null
          tagline?: string | null
          text_heading_color?: string | null
          text_link_color?: string | null
          text_primary_color?: string | null
          text_secondary_color?: string | null
          theme_mode?: Database["public"]["Enums"]["theme_mode"] | null
          transition_duration?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "trusted_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string | null
          details: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
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
          user_id: string
          reason: string
          admin_id: string
        }
        Returns: undefined
      }
      record_user_activity: {
        Args: {
          p_user_id: string
          p_activity_type: string
          p_details: string
          p_metadata?: Json
        }
        Returns: string
      }
      update_site_settings:
        | {
            Args: {
              p_font_family_heading?: string
              p_font_family_body?: string
              p_font_size_base?: string
              p_font_weight_normal?: string
              p_font_weight_bold?: string
              p_line_height_base?: string
              p_letter_spacing?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_site_title?: string
              p_tagline?: string
              p_primary_color?: string
              p_secondary_color?: string
              p_accent_color?: string
              p_logo_url?: string
              p_favicon_url?: string
              p_theme_mode?: Database["public"]["Enums"]["theme_mode"]
            }
            Returns: Json
          }
        | {
            Args: {
              p_site_title?: string
              p_tagline?: string
              p_primary_color?: string
              p_secondary_color?: string
              p_accent_color?: string
              p_logo_url?: string
              p_favicon_url?: string
              p_theme_mode?: Database["public"]["Enums"]["theme_mode"]
              p_text_primary_color?: string
              p_text_secondary_color?: string
              p_text_link_color?: string
              p_text_heading_color?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_site_title?: string
              p_tagline?: string
              p_primary_color?: string
              p_secondary_color?: string
              p_accent_color?: string
              p_logo_url?: string
              p_favicon_url?: string
              p_theme_mode?: Database["public"]["Enums"]["theme_mode"]
              p_text_primary_color?: string
              p_text_secondary_color?: string
              p_text_link_color?: string
              p_text_heading_color?: string
              p_neon_cyan?: string
              p_neon_pink?: string
              p_neon_purple?: string
              p_border_radius?: string
              p_spacing_unit?: string
              p_transition_duration?: string
              p_shadow_color?: string
              p_hover_scale?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_site_title?: string
              p_tagline?: string
              p_primary_color?: string
              p_secondary_color?: string
              p_accent_color?: string
              p_logo_url?: string
              p_favicon_url?: string
              p_theme_mode?: Database["public"]["Enums"]["theme_mode"]
              p_text_primary_color?: string
              p_text_secondary_color?: string
              p_text_link_color?: string
              p_text_heading_color?: string
              p_neon_cyan?: string
              p_neon_pink?: string
              p_neon_purple?: string
              p_border_radius?: string
              p_spacing_unit?: string
              p_transition_duration?: string
              p_shadow_color?: string
              p_hover_scale?: string
              p_font_family_heading?: string
              p_font_family_body?: string
              p_font_size_base?: string
              p_font_weight_normal?: string
              p_font_weight_bold?: string
              p_line_height_base?: string
              p_letter_spacing?: string
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
      theme_mode: "light" | "dark" | "system"
      user_role: "subscriber" | "maker" | "admin" | "super_admin"
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
