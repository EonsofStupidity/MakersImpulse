// Split navigation into separate files to reduce file size
import { mainNavItems } from "./navigation/mainNavItems";
import { footerNavItems } from "./navigation/footerNavItems";

export type NavItem = {
  title: string;
  href: string;
  icon?: any;
  description?: string;
  requiresAuth?: boolean;
  children?: NavItem[];
};

export const mainNavigation = mainNavItems;
export const footerNavigation = footerNavItems;