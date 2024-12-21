export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface JsonObject {
  [key: string]: Json;
}

export type JsonValue = string | number | boolean | null | JsonObject | Json[];