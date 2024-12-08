export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard'
  },
  {
    id: 'content',
    label: 'Content',
    path: '/admin/content'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/admin/settings'
  }
];