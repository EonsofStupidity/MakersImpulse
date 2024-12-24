export interface Database {
  public: {
    Tables: Record<string, any>;
    Views: Record<string, never>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
}