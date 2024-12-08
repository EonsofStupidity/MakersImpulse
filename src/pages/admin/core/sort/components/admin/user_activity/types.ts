export interface GamificationSetting {
  id: string;
  setting_name: string;
  setting_value: string;
  setting_type: "integer" | "float" | "string";
  description: string;
}

export interface SettingFormData {
  setting_name: string;
  setting_value: string;
  setting_type: "integer" | "float" | "string";
  description: string;
}