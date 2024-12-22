export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, never>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
    CompositeTypes: Record<string, never>;
  };
};

export type TableDefinition<T> = {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
};