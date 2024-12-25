export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}