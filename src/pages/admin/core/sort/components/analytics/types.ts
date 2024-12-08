export interface DateRange {
  from: Date;
  to: Date;
}

export interface AnalyticsProps {
  dateRange: DateRange;
  isAdmin: boolean;
}

export interface BuildMetric {
  build_type: string;
  completion_rate: number;
  created_at: string;
}

export interface PopularComponent {
  component_id: string;
  component_name: string;
  usage_count: number;
  avg_cost: number;
  unique_users: number;
}

export interface BuilderRecommendation {
  id: string;
  component_type: string;
  reason: string;
  score: number;
}