export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;