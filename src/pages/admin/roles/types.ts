export type AdminRole = "super_admin" | "content_admin" | "community_admin" | "catalog_admin" | "custom_admin";

export interface AdminRoleConfig {
  value: AdminRole;
  label: string;
  description: string;
}

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export type JsonPermission = {
  [key: string]: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
};

export interface AdminRoleAssignment {
  id: string;
  user: {
    id: string;
    username: string | null;
    display_name: string | null;
  };
  role: AdminRole;
  assigned_by_user: {
    username: string | null;
  } | null;
  assigned_at: string;
  permissions: JsonPermission;
  application_required?: boolean;
  auto_approve?: boolean;
  created_at?: string;
  description?: string;
  features?: Record<string, any>;
  updated_at?: string;
  deletion_protected?: boolean;
  custom_role_name?: string;
  custom_role_description?: string;
}

export type DbRoleApplication = {
  id?: string;
  user_id: string;
  role: AdminRole;
  status?: string;
  reason?: string;
  submitted_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  metadata?: Record<string, any>;
};

export type DbAdminRoleAssignment = {
  id?: string;
  user_id?: string;
  role: AdminRole;
  assigned_by?: string;
  assigned_at?: string;
  permissions?: JsonPermission;
  description?: string;
  created_at?: string;
  updated_at?: string;
  features?: Record<string, any>;
  application_required?: boolean;
  auto_approve?: boolean;
  deletion_protected?: boolean;
  custom_role_name?: string;
  custom_role_description?: string;
};