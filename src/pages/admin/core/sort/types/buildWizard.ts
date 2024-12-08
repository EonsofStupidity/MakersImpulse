import type { Json } from "@/integrations/supabase/types";
import type { BuildConfig, BuildVolume, ComponentData } from "./build";

export type BuildWizardState = {
  currentStep: number;
  saving: boolean;
  lastSaved?: Date;
  buildConfig: BuildConfig;
};

export type BuildWizardStatus = "draft" | "in_progress" | "completed";

export interface BuildWizardConfig {
  id?: string;
  user_id: string;
  name: string | null;
  status: BuildWizardStatus;
  kinematic_type: BuildConfig["kinematic_type"];
  build_volume: BuildVolume;
  core_components: Record<string, ComponentData | null>;
  addons: ComponentData[];
  estimated_cost: number;
  last_step_completed: number;
  created_at?: string;
  updated_at?: string;
  completed_at?: string;
  metadata: Record<string, any>;
}