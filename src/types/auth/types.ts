export interface AuthUser {
  id: string
  email?: string
  displayName?: string
  avatarUrl?: string
  role?: string
  bio?: string
  website?: string
  location?: string
  lastSeen?: Date
  createdAt?: Date
  updatedAt?: Date
  metadata?: Record<string, any>
}