export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface BuilderElement {
  id: string;
  type: string;
  content: {
    [key: string]: string;
    text?: string;
    url?: string;
    alt?: string;
  };
  styles?: {
    [key: string]: string | number;
  };
  columns?: number;  // Added this property
  position?: {
    x: number;
    y: number;
  };
}

export interface BuilderPageContent {
  [key: string]: Json | BuilderElement[];
  elements: BuilderElement[];
}

export interface BuilderPage {
  id: string;
  title: string;
  content: BuilderPageContent;
  style_config: any;
  template_id: string | null;
  is_published: boolean;
  grid_settings: {
    columns: number;
    show_grid: boolean;
    snap_to_grid: boolean;
  };
  breakpoint_config: {
    mobile: { width: number; columns: number; };
    tablet: { width: number; columns: number; };
    desktop: { width: number; columns: number; };
  };
}