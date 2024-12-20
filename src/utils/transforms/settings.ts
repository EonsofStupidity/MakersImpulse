import type { Settings } from '@/types/theme/settings';
import type { Database } from '@/integrations/supabase/types/database';

type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

export const transformDatabaseSettings = (data: SiteSettings): Settings => {
  return {
    id: data.id,
    site_title: data.site_title,
    tagline: data.tagline || undefined,
    primary_color: data.primary_color || undefined,
    secondary_color: data.secondary_color || undefined,
    accent_color: data.accent_color || undefined,
    text_primary_color: data.text_primary_color || undefined,
    text_secondary_color: data.text_secondary_color || undefined,
    text_link_color: data.text_link_color || undefined,
    text_heading_color: data.text_heading_color || undefined,
    border_radius: data.border_radius || undefined,
    spacing_unit: data.spacing_unit || undefined,
    transition_duration: data.transition_duration || undefined,
    shadow_color: data.shadow_color || undefined,
    hover_scale: data.hover_scale || undefined,
    box_shadow: data.box_shadow || undefined,
    backdrop_blur: data.backdrop_blur || undefined,
    neon_cyan: data.neon_cyan || undefined,
    neon_pink: data.neon_pink || undefined,
    neon_purple: data.neon_purple || undefined,
    updated_at: data.updated_at || undefined,
    updated_by: data.updated_by || undefined,
    state_version: data.state_version || undefined,
    last_sync: data.last_sync || undefined,
    theme_mode: data.theme_mode || undefined,
    component_type: data.component_type || undefined,
  };
};
