/**
 * Core JSON type definitions with strict type safety
 */

// Basic JSON value types
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: Json | undefined };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Database JSON types that match Supabase schema
export type DbJson = Json;
export type DbJsonObject = { [key: string]: DbJson };
export type DbJsonArray = DbJson[];

// Type guards for runtime validation
export function isJson(value: unknown): value is Json {
  if (value === null) return true;
  if (typeof value === "boolean") return true;
  if (typeof value === "number") return true;
  if (typeof value === "string") return true;
  if (Array.isArray(value)) return value.every(isJson);
  if (typeof value === "object") {
    return Object.values(value as object).every((v) => v === undefined || isJson(v));
  }
  return false;
}