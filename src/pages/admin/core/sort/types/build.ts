export interface BuildConfig {
  name: string;
  kinematic_type?: "cartesian" | "corexy" | "delta" | "polar" | "scara";
  movement_system?: "belt" | "screw";
  motion_ratio?: number;
  build_volume?: BuildVolume;
  core_components?: {
    mcu?: ComponentData;
    thermistor?: ComponentData;
    belts?: ComponentData[];
    heatbed?: ComponentData;
    hotend?: ComponentData;
    extruder?: ComponentData;
    endstops?: ComponentData[];
    power_supply?: ComponentData;
    sbc?: ComponentData;
    stepper_drivers?: ComponentData[];
    expansion_cards?: ComponentData[];
    fans?: ComponentData[];
  };
  components: Record<string, ComponentData | null>;
  addons?: ComponentData[];
  estimated_cost: number;
  status?: "draft" | "in_progress" | "completed";
}

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
}

export interface ComponentData {
  id: string;
  name: string;
  manufacturer: string;
  cost_usd: number;
  summary: string;
}

export type CoreComponentType = 
  | "mcu"
  | "thermistor"
  | "belts"
  | "heatbed"
  | "hotend"
  | "extruder"
  | "endstops"
  | "power_supply"
  | "sbc"
  | "stepper_drivers"
  | "expansion_cards"
  | "fans";

export type BuildStatus = "draft" | "in_progress" | "completed";

export interface BuildWizardConfig {
  name: string | null;
  status: BuildStatus;
  kinematic_type: "cartesian" | "corexy" | "delta" | "polar" | "scara" | null;
  build_volume: BuildVolume | null;
  core_components: Record<string, ComponentData | null>;
  addons: ComponentData[];
  estimated_cost: number;
  last_step_completed: number;
  user_id: string;
}
