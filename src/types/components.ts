export type ComponentType = 'bearings' | 'extruders' | 'addons' | 'other';

export interface BaseComponent {
  id: string;
  name: string;
  manufacturer: string;
  cost_usd: string;
  summary: string;
  image_url?: string;
}

export interface ComponentWithType extends BaseComponent {
  type: ComponentType;
}