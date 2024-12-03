import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vcmnomcwbmwqylwnomta.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbW5vbWN3Ym13cXlsd25vbXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzY5NjEsImV4cCI6MjA0ODc1Mjk2MX0.Mb40Iuj_tybvZ6pVnwkopomnAsduP6zke5BZUztcLQw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadMedia = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('media')
    .upload(`uploads/${Date.now()}-${file.name}`, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(data.path);

  return publicUrl;
};