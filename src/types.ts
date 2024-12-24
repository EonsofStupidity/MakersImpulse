// Direct 1:1 mapping with database columns
export type ThemeMode = 'light' | 'dark' | 'system'
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur'
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace'
export type ComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect'
export type GlassEffectLevel = 'low' | 'medium' | 'high'
export type UserRole = 'admin' | 'editor' | 'user' | 'subscriber'
export type ContentStatus = 'draft' | 'published' | 'archived'
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | ''
export type CSSValue = `${number}${CSSUnit}` | string
export type SettingType = 'theme' | 'system' | 'user'

export interface ThemeBase {
  id?: string
  // Colors (exactly as in DB)
  primary_color: string
  secondary_color: string
  accent_color: string
  text_primary_color: string
  text_secondary_color: string
  text_link_color: string
  text_heading_color: string
  neon_cyan: string
  neon_pink: string
  neon_purple: string

  // Typography (exactly as in DB)
  font_family_heading: string
  font_family_body: string
  font_size_base: string
  font_weight_normal: string
  font_weight_bold: string
  line_height_base: string
  letter_spacing: string

  // Layout & Effects (exactly as in DB)
  border_radius: string
  spacing_unit: string
  transition_duration: string
  shadow_color: string
  hover_scale: string
  box_shadow: string
  backdrop_blur: string

  // Behavior (exactly as in DB)
  theme_mode: ThemeMode
  transition_type: TransitionType
  animations_enabled: boolean
  default_animation_duration: number
  real_time_toggle?: boolean
  component_type?: ComponentType

  // Optional fields from DB
  preview_preferences?: {
    real_time_updates: boolean
    animation_enabled: boolean
    glass_effect_level: GlassEffectLevel
    update_debounce_ms: number
  }
  parent_theme_id?: string | null
  inheritance_strategy?: ThemeInheritanceStrategy
  inherited_settings?: Json

  // Site Info
  site_title?: string
  tagline?: string
  logo_url?: string
  favicon_url?: string

  // Database fields
  updated_at?: string
  updated_by?: string
}

// Form handling type
export type ThemeFormData = ThemeBase

// Minimal state management type
export interface ThemeState extends ThemeBase {
  isDirty?: boolean
  lastSync?: Date | null
  syncStatus?: 'idle' | 'syncing' | 'error'
  syncError?: string
}

// Theme Lifecycle State
export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating'
  error?: string
}

// Theme Sync State
export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error'
  last_sync: string
  error?: string
}

// Build types
export interface Build {
  id: string
  user_id: string
  name: string
  description?: string
  build_volume: {
    x: number
    y: number
    z: number
    units: string
  }
  parts: BuildPart[]
  images: BuildImage[]
  created_at: string
}

export interface BuildPart {
  id: string
  name: string
  quantity: number
  notes?: string
  attributes?: Record<string, unknown>
}

export interface BuildImage {
  url: string
  type: string
  alt?: string
  caption?: string
}

export interface BuildQueryParams {
  userId?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type BuildFormData = Omit<Build, 'id' | 'created_at'>

// Auth types
export interface AuthUser {
  id: string
  email: string
  displayName?: string
  username?: string
  bio?: string
  website?: string
  location?: string
  createdAt: string
  updatedAt: string
}

// Content types
export interface ContentWithAuthor {
  id: string
  title: string
  content: unknown
  created_by: { display_name: string }
  created_at: string
  updated_at: string
  status: ContentStatus
  version: number
}

// Settings types
export interface ApplicationSettings {
  id: string
  site_title: string
  tagline?: string
  logo_url?: string
  favicon_url?: string
  metadata?: Record<string, unknown>
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}

// Database types
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface BuildRow {
  id: string
  user_id: string
  name: string
  description: string
  build_volume: Json
  parts: Json
  images: Json
  created_at: string
}

// Theme Database Types
export interface ThemeConfiguration {
  id: string
  settings: Json
  updated_at?: string
  updated_by?: string
}

// State Types
export interface ThemeStateData extends ThemeBase {
  state_version: number
  last_sync: string
}

// Style Types
export interface ThemeStyles {
  [key: `--${string}`]: string | number
}

// Animation Types
export interface ThemeAnimation {
  transitions: {
    fade: string
    slide: string
    scale: string
    blur: string
  }
  timing: string
  duration: number
  motionPreferences: {
    reducedMotion: boolean
    prefersReducedMotion: boolean
  }
}

// Settings Types
export interface Settings {
  id: string
  category: SettingType
  key: string
  value: Json
  metadata?: Record<string, unknown>
  is_encrypted?: boolean
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}

// Theme State Types
export interface ThemeStateTypes {
  isDirty: boolean
  lastSync: Date | null
  syncStatus: 'idle' | 'syncing' | 'error'
  syncError?: string
}

// Theme Style Types
export interface ThemeStyleTypes {
  colors: Record<string, string>
  typography: Record<string, string>
  spacing: Record<string, string>
  effects: Record<string, string>
}

// Theme Animation Types
export interface ThemeAnimationTypes {
  transitions: Record<TransitionType, string>
  timing: string
  duration: number
  motionPreferences: {
    reducedMotion: boolean
    prefersReducedMotion: boolean
  }
}