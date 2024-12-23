import { DbJson, DbJsonObject, DbJsonArray } from '../core/json';

export interface TableDefinition<T> {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
}

export interface Database {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, never>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
    CompositeTypes: Record<string, never>;
  };
}

// Common database column types
export type DbColumn<T> = T | null;
export type DbJsonColumn = DbColumn<DbJson>;
export type DbJsonObjectColumn = DbColumn<DbJsonObject>;
export type DbJsonArrayColumn = DbColumn<DbJsonArray>;