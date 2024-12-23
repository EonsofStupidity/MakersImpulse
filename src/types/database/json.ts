// Basic JSON value types
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };

// Combined JSON type
export type Json = JsonPrimitive | JsonObject | JsonArray;

// Type guard for JSON
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