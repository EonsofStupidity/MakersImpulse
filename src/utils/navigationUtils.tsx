import { mainNavigation } from "@/config/navigation";
import type { Session } from "@supabase/auth-helpers-react";

export const getFilteredNavigation = (session: Session | null) => {
  return mainNavigation.filter(item => !item.requiresAuth || session);
};

export const getNavigationItemIcon = (Icon: any) => {
  return Icon ? <Icon className="w-4 h-4 mr-2" /> : null;
};

export const formatNavigationLabel = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};