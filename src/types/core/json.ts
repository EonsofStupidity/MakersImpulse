export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type JsonObject = { [key: string]: Json };

export interface JsonArray extends Array<Json> {}