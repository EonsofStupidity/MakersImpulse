export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: { [key: string]: Json };
        Insert: { [key: string]: Json };
        Update: { [key: string]: Json };
      };
    };
  };
}