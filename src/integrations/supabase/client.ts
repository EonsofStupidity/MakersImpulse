import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vvtfumqyznrtzhhqzvgu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dGZ1bXF5em5ydHpoaHF6dmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDA0NTcsImV4cCI6MjA0OTYxNjQ1N30.M1CxmjKZZAusFRQqy7qT2NIKxOmOdrsuGvZd5CaWhc8";

// Create Supabase client with configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Utility function for media uploads
export const uploadMedia = async (file: File): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('media')
      .upload(`uploads/${Date.now()}-${file.name}`, file);

    if (error) {
      console.error('Media upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadMedia:', error);
    throw error;
  }
};

// Utility function for retrying operations
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

// Helper function to update site settings
export const updateSiteSettings = async (settings: Record<string, any>) => {
  const { data, error } = await supabase.rpc('update_site_settings', {
    p_site_title: settings.site_title || '',
    p_tagline: settings.tagline || '',
    p_primary_color: settings.primary_color || '',
    p_secondary_color: settings.secondary_color || '',
    p_accent_color: settings.accent_color || '',
    p_text_primary_color: settings.text_primary_color || '',
    p_text_secondary_color: settings.text_secondary_color || '',
    p_text_link_color: settings.text_link_color || '',
    p_text_heading_color: settings.text_heading_color || '',
    p_neon_cyan: settings.neon_cyan || '',
    p_neon_pink: settings.neon_pink || '',
    p_neon_purple: settings.neon_purple || '',
    p_border_radius: settings.border_radius || '',
    p_spacing_unit: settings.spacing_unit || '',
    p_transition_duration: settings.transition_duration || '',
    p_shadow_color: settings.shadow_color || '',
    p_hover_scale: settings.hover_scale || '',
    p_font_family_heading: settings.font_family_heading || '',
    p_font_family_body: settings.font_family_body || '',
    p_font_size_base: settings.font_size_base || '',
    p_font_weight_normal: settings.font_weight_normal || '',
    p_font_weight_bold: settings.font_weight_bold || '',
    p_line_height_base: settings.line_height_base || '',
    p_letter_spacing: settings.letter_spacing || ''
  });

  if (error) throw error;
  return data;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};