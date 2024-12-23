/**
 * Core JSON type definitions
 * Single source of truth for all JSON types in the application
 */

// Basic JSON value types
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: Json | undefined };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Type guard for JSON validation
export function isJson(value: unknown): value is Json {
  if (value === null) return true;
  if (typeof value === "boolean") return true;
  if (typeof value === "number") return true;
  if (typeof value === "string") return true;
  if (Array.isArray(value)) return value.every(isJson);
  if (typeof value === "object") {
    return Object.values(value as object).every(isJson);
  }
  return false;
}

// Database specific JSON utilities
export type DbJson = Json;
export type DbJsonObject = JsonObject;
export type DbJsonArray = JsonArray;

// Conversion utilities
export function toDbJson<T extends Json>(value: T): DbJson {
  return value;
}

export function fromDbJson<T extends Json>(value: DbJson): T {
  return value as T;
}