import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminRoleAssignment, JsonPermission } from "../types";
import { Json } from "@/types/builder";

interface RawAdminRole {
  id: string;
  user: {
    id: string;
    username: string | null;
    display_name: string | null;
  };
  role: AdminRoleAssignment['role'];
  assigned_by_user: {
    username: string | null;
  } | null;
  assigned_at: string;
  permissions: Json;
  application_required?: boolean;
  auto_approve?: boolean;
  created_at?: string;
  description?: string;
  features?: Record<string, any>;
  updated_at?: string;
}

export const useRoleQueries = () => {
  const { data: adminRoles, isLoading } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_roles")
        .select(`
          *,
          user:profiles(id, username, display_name),
          assigned_by_user:profiles!admin_roles_assigned_by_fkey(username)
        `)
        .order("assigned_at", { ascending: false });

      if (error) throw error;
      return (data as RawAdminRole[]).map(role => ({
        ...role,
        permissions: role.permissions || {}
      })) as AdminRoleAssignment[];
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name")
        .order("username");

      if (error) throw error;
      return data;
    },
  });

  return { adminRoles, users, isLoading };
};