import { ThemeRow } from './database';
import { ThemeState } from './state';
import { ThemeStyles } from './style';
import { ThemeAnimation } from './animation';

export const transformRowToState = (row: ThemeRow): ThemeState => ({
  ...row,
  isDirty: false,
  lastSync: new Date(),
  syncStatus: 'idle',
  isPreviewMode: false,
  localChanges: {}
});

export const transformStateToStyles = (state: ThemeState): ThemeStyles => ({
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
});

export const transformStateToAnimation = (state: ThemeState): ThemeAnimation => ({
  transitions: {
    fade: `opacity ${state.transition_duration} ease-in-out`,
    slide: `transform ${state.transition_duration} ease-in-out`,
    scale: `transform ${state.transition_duration} ease-in-out`,
    blur: `filter ${state.transition_duration} ease-in-out`
  },
  timing: 'ease-out',
  duration: state.default_animation_duration,
  motionPreferences: {
    reducedMotion: false,
    prefersReducedMotion: false
  }
});