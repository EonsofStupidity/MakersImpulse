export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

export const mainNavigation: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  {
    id: 'maker-space',
    label: 'Maker Space',
    path: '/maker-space',
    requiresAuth: true
  },
  {
    id: 'schedule',
    label: 'Schedule',
    path: '/content/schedule'
  },
  {
    id: 'queue',
    label: 'Queue',
    path: '/content/queue'
  }
];

export const adminRoutes = {
  dashboard: '/admin/dashboard',
  dataMaestro: '/admin/data-maestro',
  users: '/admin/users',
  monitoring: '/admin/monitoring',
  forum: '/admin/forum',
  settings: '/admin/settings'
};

export const makerSpaceRoutes = {
  index: '/maker-space',
  builds: '/maker-space/builds',
  guides: '/maker-space/guides',
  parts: '/maker-space/parts'
};

export const authRoutes = {
  login: '/login',
  register: '/register',
  profile: '/profile',
  settings: '/settings'
};