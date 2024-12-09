import { 
  BookOpen, 
  UserCog, 
  Cog,
  MessageSquare, 
  Layers, 
  FileType, 
  GitBranch, 
  Image,
  Settings
} from "lucide-react";
import type { NavItemType } from "./NavItem";

export const defaultNavItems: NavItemType[] = [
  { id: "posts", to: "/admin/posts", icon: BookOpen, label: "Posts" },
  { id: "users", to: "/admin/users", icon: UserCog, label: "Manage Users" },
  { id: "settings", to: "/admin/settings", icon: Cog, label: "Site Settings" },
  { id: "new-post", to: "/admin/content-management/editor", icon: MessageSquare, label: "New Post" },
  { id: "categories", to: "/admin/content-management/categories", icon: Layers, label: "Categories" },
  { id: "templates", to: "/admin/content-management/templates", icon: FileType, label: "Templates" },
  { id: "workflows", to: "/admin/content-management/workflows", icon: GitBranch, label: "Workflows" },
  { id: "media", to: "/admin/media", icon: Image, label: "Media Library" },
  { id: "content-types", to: "/admin/settings/content-types", icon: Settings, label: "Content Types" },
];