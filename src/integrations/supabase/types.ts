// Define a flexible JSON type
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * Generic table definition type
 * @template RowType - The shape of a table's data.
 */
type TableDefinition<RowType> = {
  Row: Readonly<RowType>; // Immutable rows for safety
  Insert: Partial<RowType> & Required<Pick<RowType, "id">>;
  Update: Partial<RowType>;
  Relationships: Array<{
    foreignKey: string;
    references: string;
  }>;
};

/**
 * Define the main database schema
 */
export type Database = {
  public: {
    Tables: {
      blog_posts: TableDefinition<{
        author_id: string | null;
        content: string;
        excerpt: string | null;
        featured_image: string | null;
        id: string;
        published_at: string | null;
        slug: string;
        status: BlogPostStatus | null;
        title: string;
        updated_at: string | null;
        views_count: number | null;
      }>;
      maker_projects: TableDefinition<{
        category: string;
        created_at: string | null;
        description: string | null;
        difficulty_level: string | null;
        estimated_time: string | null;
        id: string;
        likes_count: number | null;
        parts_count: number | null;
        status: string | null;
        title: string;
        updated_at: string | null;
        views_count: number | null;
      }>;
      media: TableDefinition<{
        created_at: string;
        id: string;
        name: string;
        size: number | null;
        type: string | null;
        updated_at: string;
        url: string;
        user_id: string | null;
      }>;
      profiles: TableDefinition<{
        avatar_url: string | null;
        bio: string | null;
        created_at: string;
        display_name: string | null;
        id: string;
        last_seen: string | null;
        location: string | null;
        role: Database["public"]["Enums"]["user_role"] | null;
        updated_at: string;
        username: string | null;
        website: string | null;
      }>;
    };
    Views: Record<string, never>;
    Functions: {
      get_popular_posts: {
        Args: {
          limit: number;
        };
        Returns: {
          id: string;
          title: string;
          views_count: number;
        }[];
      };
    };
    Enums: {
      user_role: "subscriber" | "maker" | "admin" | "super_admin";
    };
    CompositeTypes: {
      address: {
        street: string;
        city: string;
        state: string;
        zip: string;
      };
    };
  };
};

// Type aliases for stricter usage and readability
type BlogPostStatus = "draft" | "published" | "archived";

// Utility type for accessing table rows
export type Tables<
  Table extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][Table]["Row"];

// Utility type for insertable data in tables
export type TablesInsert<
  Table extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][Table]["Insert"];

// Utility type for updatable data in tables
export type TablesUpdate<
  Table extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][Table]["Update"];

// Utility type for accessing enums dynamically
export type Enums<
  EnumName extends keyof Database["public"]["Enums"]
> = Database["public"]["Enums"][EnumName];

// Utility type for accessing composite types dynamically
export type CompositeTypes<
  CompositeTypeName extends keyof Database["public"]["CompositeTypes"]
> = Database["public"]["CompositeTypes"][CompositeTypeName];

// Utility types for additional common use cases
type PaginatedResult<RowType> = {
  data: RowType[];
  total: number;
  page: number;
  perPage: number;
};

// Example usage for paginated blog posts
type BlogPostsPaginated = PaginatedResult<Tables<"blog_posts">>;
