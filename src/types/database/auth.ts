import { Json } from "./json";

export interface AuthTables {
  auth_error_logs: {
    Row: {
      id: string;
      error_type: string;
      error_message?: string;
      stack_trace?: string;
      metadata?: Json;
      created_at?: string;
    };
  };
  auth_sessions: {
    Row: {
      id: string;
      user_id?: string;
      refresh_token?: string;
      created_at?: string;
      expires_at?: string;
      metadata?: Json;
    };
  };
}