export type UserRole = 'visitor' | 'subscriber' | 'building' | 'builder' | 'editor' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  gamification_enabled: boolean;
  visual_editor_enabled: boolean;
  onboarding_completed: boolean;
  two_factor_enabled: boolean;
  points: number;
  current_level: number;
  total_points: number;
  achievements_count: number;
  next_level_points: number;
  login_streak: number;
  last_login_at: string | null;
}