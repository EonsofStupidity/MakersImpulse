export type SettingType = 'theme' | 'system' | 'user'

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