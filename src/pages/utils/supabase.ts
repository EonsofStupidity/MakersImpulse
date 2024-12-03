import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://vcmnomcwbmwqylwnomta.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbW5vbWN3Ym13cXlsd25vbXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzY5NjEsImV4cCI6MjA0ODc1Mjk2MX0.Mb40Iuj_tybvZ6pVnwkopomnAsduP6zke5BZUztcLQw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;