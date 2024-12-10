import { 
  LayoutDashboard, Users, Settings, FileText, 
  Layers, GitBranch, Image as ImageIcon, 
  Database, FileSpreadsheet, BookOpen, 
  Activity, BarChart3 
} from "lucide-react";
import type { NavItemType } from "./NavItem";
import { adminRoutes } from "@/config/navigation";

export const defaultNavItems: NavItemType[] = [
  { id: "dashboard", to: adminRoutes.dashboard, icon: LayoutDashboard, label: "Dashboard" },
  { id: "data-maestro", to: adminRoutes.dataMaestro, icon: Database, label: "Data Maestro" },
  { id: "csv-operations", to: `${adminRoutes.dataMaestro}/csv-operations`, icon: FileSpreadsheet, label: "CSV Operations" },
  { id: "users", to: adminRoutes.users, icon: Users, label: "Users" },
  { id: "posts", to: adminRoutes.posts, icon: FileText, label: "Posts" },
  { id: "categories", to: adminRoutes.categories, icon: Layers, label: "Categories" },
  { id: "workflows", to: adminRoutes.workflows, icon: GitBranch, label: "Workflows" },
  { id: "media", to: adminRoutes.media, icon: ImageIcon, label: "Media" },
  { id: "templates", to: adminRoutes.templates, icon: BookOpen, label: "Templates" },
  { id: "activity", to: adminRoutes.activityLogs, icon: Activity, label: "Activity" },
  { id: "analytics", to: adminRoutes.analytics, icon: BarChart3, label: "Analytics" },
  { id: "settings", to: adminRoutes.settings, icon: Settings, label: "Settings" }
];