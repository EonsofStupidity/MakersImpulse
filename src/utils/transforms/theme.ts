import { ThemeRow, ThemeConfigurationRow } from '@/types/theme/database/types';
import { ThemeState } from '@/types/theme/state/types';
import { ThemeStyles } from '@/types/theme/styles/types';
import { ThemeAnimation } from '@/types/theme/animations/types';

export const transformDatabaseToState = (row: ThemeRow): ThemeState => {
  return {
    ...row,
    isDirty: false,
    lastSync: row.last_sync ? new Date(row.last_sync) : null,
    syncStatus: 'idle',
    isPreviewMode: false,
    localChanges: {}
  };
};

export const transformStateToStyles = (state: ThemeState): ThemeStyles => {
  return {
    '--primary-color': state.primary_color,
    '--secondary-color': state.secondary_color,
    '--accent-color': state.accent_color,
    '--text-primary-color': state.text_primary_color,
    '--text-secondary-color': state.text_secondary_color,
    '--text-link-color': state.text_link_color,
    '--text-heading-color': state.text_heading_color,
    '--neon-cyan': state.neon_cyan,
    '--neon-pink': state.neon_pink,
    '--neon-purple': state.neon_purple,
    '--font-family-heading': state.font_family_heading,
    '--font-family-body': state.font_family_body,
    '--font-size-base': state.font_size_base as any,
    '--font-weight-normal': state.font_weight_normal,
    '--font-weight-bold': state.font_weight_bold,
    '--line-height-base': state.line_height_base,
    '--letter-spacing': state.letter_spacing,
    '--border-radius': state.border_radius as any,
    '--spacing-unit': state.spacing_unit as any,
    '--transition-duration': state.transition_duration,
    '--shadow-color': state.shadow_color,
    '--hover-scale': state.hover_scale,
    '--box-shadow': state.box_shadow,
    '--backdrop-blur': state.backdrop_blur as any
  };
};

export const transformStateToAnimation = (state: ThemeState): ThemeAnimation => {
  return {
    transitions: {
      fade: `opacity ${state.transition_duration} ${state.transition_type}`,
      slide: `transform ${state.transition_duration} ${state.transition_type}`,
      scale: `transform ${state.transition_duration} ${state.transition_type}`,
      blur: `filter ${state.transition_duration} ${state.transition_type}`
    },
    timing: 'ease-out',
    duration: state.default_animation_duration,
    motionPreferences: {
      reducedMotion: false,
      prefersReducedMotion: false
    }
  };
};

export const validateThemeState = (state: Partial<ThemeState>): boolean => {
  // Add validation logic here
  return true;
};

export const validateThemeStyles = (styles: Partial<ThemeStyles>): boolean => {
  // Add validation logic here
  return true;
};

export const validateThemeAnimation = (animation: Partial<ThemeAnimation>): boolean => {
  // Add validation logic here
  return true;
};