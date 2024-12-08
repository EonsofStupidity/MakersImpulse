import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
  requiresAuth?: boolean;
}

export interface NavSectionProps {
  items: NavItem[];
  className?: string;
}