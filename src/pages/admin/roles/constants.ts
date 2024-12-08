import { AdminRoleConfig } from "./types";

export const ADMIN_ROLES: AdminRoleConfig[] = [
  { 
    value: "super_admin", 
    label: "Super Admin",
    description: "Full access to all system features and settings. Can manage other admin roles."
  },
  { 
    value: "content_admin", 
    label: "Content Admin",
    description: "Can manage all content-related features including blog posts, documentation, and media."
  },
  { 
    value: "community_admin", 
    label: "Community Admin",
    description: "Manages forum moderation, user reports, and community engagement features."
  },
  { 
    value: "catalog_admin", 
    label: "Catalog Admin",
    description: "Manages product catalog, categories, and component database entries."
  },
];