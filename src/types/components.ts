export interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ComponentType;
  requiresAuth?: boolean;
  children?: NavigationItem[];
}

export interface DataMaestroSettings {
  settings: Record<string, any>;
  onSettingChange: (key: string, value: boolean) => void;
}