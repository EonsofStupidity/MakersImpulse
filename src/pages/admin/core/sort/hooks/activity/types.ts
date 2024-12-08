export interface ActivityData {
  duration: number;
  userId: string;
  path: string;
  currentDailyPoints: number;
  dailyPoints?: {
    points_earned: number;
    consecutive_days: number;
  };
  pointsToAward: number;
  remainingCap: number;
  timestamp: string;
}

export interface ActivityMetrics {
  user_id: string;
  page_path: string;
  visit_started_at: string;
  visit_ended_at: string;
  duration_seconds: number;
}