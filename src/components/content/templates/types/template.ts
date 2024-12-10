import { ReactNode } from 'react';

export type TemplateType = 'build' | 'guide' | 'part';

export interface TemplateConfig {
  name: string;
  description: string;
  icon?: ReactNode;
  defaultProps?: Record<string, any>;
  schema?: Record<string, any>;
}

export interface TemplateProps {
  content?: Record<string, any>;
  className?: string;
  children?: ReactNode;
}