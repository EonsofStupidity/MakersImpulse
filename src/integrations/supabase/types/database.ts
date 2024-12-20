import type { Json } from './base';

export interface Database {
  public: {
    Tables: {
      mi3dp_builds: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          build_volume: {
            x: number;
            y: number;
            z: number;
            units: 'mm' | 'cm' | 'inches';
          } | null;
          parts: {
            id: string;
            name: string;
            quantity: number;
            notes?: string;
            attributes?: Record<string, string | number | boolean>;
          }[] | null;
          images: {
            url: string;
            alt?: string;
            caption?: string;
          }[] | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['mi3dp_builds']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['mi3dp_builds']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          slug: string;
          published_at: string | null;
          updated_at: string | null;
          status: string | null;
          author_id: string | null;
          featured_image: string | null;
          views_count: number | null;
          rich_content: Json | null;
          images: string[] | null;
          tags: string[] | null;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'published_at' | 'updated_at' | 'views_count'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      maker_projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          difficulty_level: string | null;
          estimated_time: string | null;
          parts_count: number | null;
          created_at: string | null;
          updated_at: string | null;
          status: string | null;
          views_count: number | null;
          likes_count: number | null;
        };
        Insert: Omit<Database['public']['Tables']['maker_projects']['Row'], 'id' | 'created_at' | 'updated_at' | 'views_count' | 'likes_count'>;
        Update: Partial<Database['public']['Tables']['maker_projects']['Insert']>;
      };
      media: {
        Row: {
          id: string;
          name: string;
          url: string;
          type: string | null;
          size: number | null;
          created_at: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['media']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, unknown>;
    Enums: {
      content_status: 'draft' | 'published' | 'archived';
      content_type: 'page' | 'component' | 'template' | 'workflow';
      user_role: 'subscriber' | 'maker' | 'admin' | 'super_admin';
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
