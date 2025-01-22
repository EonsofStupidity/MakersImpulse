import { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string | ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
  children?: NavigationItem[];
}
