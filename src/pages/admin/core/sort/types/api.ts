export type ApiAccessLevel = "read_only" | "developer" | "admin";

export interface ApiCredential {
  id: string;
  name: string;
  api_key: string;
  api_secret: string;
  access_level: ApiAccessLevel;
  enabled: boolean;
  created_at: string;
  metadata?: {
    created_via?: string;
    user_agent?: string;
  };
}