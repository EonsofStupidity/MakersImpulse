import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://sexaafhdokidiblyckas.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGFhZmhkb2tpZGlibHlja2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMDAzNDUsImV4cCI6MjA0Nzg3NjM0NX0.cTZLl15qh9dgaH_LEE2PBxXF8ki1SXSx9pt6d0OmSPU";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);