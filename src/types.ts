// Direct 1:1 mapping with database columns
export type ThemeMode = 'light' | 'dark' | 'system'
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur'
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace'

export interface ThemeBase {
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

  // Optional fields from DB
  preview_preferences?: {
    real_time_updates: boolean
    animation_enabled: boolean
    glass_effect_level: 'low' | 'medium' | 'high'
    update_debounce_ms: number
  }
  parent_theme_id?: string | null
  inheritance_strategy?: ThemeInheritanceStrategy
  inherited_settings?: Record<string, unknown>
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
}

export interface BuildImage {
  url: string
  type: string
  alt?: string
  caption?: string
}

export type BuildFormData = Omit<Build, 'id' | 'created_at'>

// Auth types
export interface AuthUser {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  bio?: string
  website?: string
  location?: string
}

// Content types
export interface ContentWithAuthor {
  id: string
  title: string
  content: unknown
  created_by: { display_name: string }
  created_at: string
  updated_at: string
  status: 'draft' | 'published' | 'archived'
  version: number
}