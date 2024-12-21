import { create } from 'zustand';
import { ThemeBase, DatabaseThemeRow } from '@/types/theme';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ThemeStore {
  theme: ThemeBase | null;
  isLoading: boolean;
  error: Error | null;
  fetchTheme: () => Promise<void>;
  updateTheme: (updates: Partial<ThemeBase>) => Promise<void>;
  resetTheme: () => Promise<void>;
}

const DEFAULT_THEME: ThemeBase = {
  site_title: "MakersImpulse",
  tagline: "Create, Share, Inspire",
  primary_color: "#7FFFD4",
  secondary_color: "#FFB6C1",
  accent_color: "#E6E6FA",
  text_primary_color: "#FFFFFF",
  text_secondary_color: "#A1A1AA",
  text_link_color: "#3B82F6",
  text_heading_color: "#FFFFFF",
  neon_cyan: "#41f0db",
  neon_pink: "#ff0abe",
  neon_purple: "#8000ff",
  font_family_heading: "Inter",
  font_family_body: "Inter",
  font_size_base: "16px",
  font_weight_normal: "400",
  font_weight_bold: "700",
  line_height_base: "1.5",
  letter_spacing: "normal",
  border_radius: "0.5rem",
  spacing_unit: "1rem",
  transition_duration: "0.3s",
  shadow_color: "#000000",
  hover_scale: "1.05",
  box_shadow: "none",
  backdrop_blur: "0",
  theme_mode: "dark",
  transition_type: "fade",
  real_time_toggle: true,
  animations_enabled: true,
  default_animation_duration: 300,
  preview_preferences: {
    real_time_updates: true,
    animation_enabled: true,
    glass_effect_level: "medium",
    update_debounce_ms: 100
  },
  inheritance_strategy: "merge",
  inherited_settings: {}
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  isLoading: false,
  error: null,

  fetchTheme: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('theme_configuration')
        .select('*')
        .single();

      if (error) throw error;

      const themeData = data ? {
        ...DEFAULT_THEME,
        ...data,
        preview_preferences: typeof data.preview_preferences === 'string' 
          ? JSON.parse(data.preview_preferences)
          : data.preview_preferences || DEFAULT_THEME.preview_preferences,
        inherited_settings: typeof data.inherited_settings === 'string'
          ? JSON.parse(data.inherited_settings)
          : data.inherited_settings || {}
      } : DEFAULT_THEME;

      set({ theme: themeData as ThemeBase });
      console.log('Theme fetched:', themeData);
    } catch (error) {
      console.error('Error fetching theme:', error);
      set({ error: error as Error });
      toast.error('Failed to load theme settings');
    } finally {
      set({ isLoading: false });
    }
  },

  updateTheme: async (updates) => {
    try {
      const { data, error } = await supabase
        .from('theme_configuration')
        .update({
          ...updates,
          preview_preferences: JSON.stringify(updates.preview_preferences),
          inherited_settings: JSON.stringify(updates.inherited_settings)
        })
        .eq('id', updates.id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        theme: state.theme ? { 
          ...state.theme,
          ...data,
          preview_preferences: typeof data.preview_preferences === 'string'
            ? JSON.parse(data.preview_preferences)
            : data.preview_preferences,
          inherited_settings: typeof data.inherited_settings === 'string'
            ? JSON.parse(data.inherited_settings)
            : data.inherited_settings
        } : null
      }));
      
      console.log('Theme updated:', data);
      toast.success('Theme settings updated');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme settings');
    }
  },

  resetTheme: async () => {
    try {
      const { error } = await supabase
        .from('theme_configuration')
        .update(DEFAULT_THEME)
        .eq('id', useThemeStore.getState().theme?.id);

      if (error) throw error;

      set({ theme: DEFAULT_THEME });
      toast.success('Theme reset to defaults');
    } catch (error) {
      console.error('Error resetting theme:', error);
      toast.error('Failed to reset theme');
    }
  }
}));