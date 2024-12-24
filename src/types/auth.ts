export type UserRole = 'admin' | 'editor' | 'user' | 'subscriber'

export interface AuthUser {
  id: string
  email?: string | null
  displayName?: string | null
  username?: string | null
  bio?: string | null
  website?: string | null
  location?: string | null
  createdAt: string
  updatedAt: string
  role?: UserRole
  avatar_url?: string | null
  last_seen?: string | null
  metadata?: Record<string, unknown>
}

export interface Profile {
  id: string
  username?: string | null
  display_name?: string | null
  avatar_url?: string | null
  bio?: string | null
  website?: string | null
  location?: string | null
  created_at?: string | null
  updated_at?: string | null
  role?: UserRole
  last_seen?: string | null
  metadata?: Record<string, unknown>
}