// Basic JSON value types
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };

// Combined JSON type
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Helper type for database operations
export type DbJson = Json | Record<string, unknown>;