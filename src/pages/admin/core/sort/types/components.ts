export type ComponentType = 
  | "base_product" 
  | "bearings" 
  | "extruders" 
  | "addons"
  | "blog"  
  | "printer_build";

export type ValueRating = "poor" | "fair" | "good" | "excellent";
export type TrendingType = "rising" | "falling" | "stable";
export type InstallationComplexity = "high" | "low" | "medium";
export type DurabilityRating = "high" | "low" | "medium";

export interface BaseComponentData {
  name: string;
  manufacturer: string;
  cost_usd: string;
  summary: string;
  image_url?: string;
  value_rating: ValueRating;
  today_trending: TrendingType;
}

export interface ComponentFormData extends BaseComponentData {
  bearing_type?: string;
  addon_type?: string;
  extruder_type?: string;
  compatibility?: string[];
}