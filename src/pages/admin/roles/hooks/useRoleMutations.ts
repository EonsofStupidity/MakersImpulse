import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminRole, AdminRoleAssignment, JsonPermission, DbRoleApplication, DbAdminRoleAssignment } from "../types";
import { useToast } from "@/components/ui/use-toast";

export const useRoleMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const assignRole = useMutation({
    mutationFn: async ({ 
      userId, 
      role, 
      customRoleName, 
      customRoleDescription 
    }: { 
      userId: string; 
      role: AdminRole; 
      customRoleName?: string;
      customRoleDescription?: string;
    }) => {
      const roleData: DbAdminRoleAssignment = {
        user_id: userId,
        role,
        custom_role_name: customRoleName,
        custom_role_description: customRoleDescription,
        assigned_by: (await supabase.auth.getUser()).data.user?.id,
      };

      const { error } = await supabase
        .from("admin_roles")
        .insert(roleData as any); // Type assertion needed due to Supabase typing limitations
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast({
        title: "Role Assigned",
        description: "The admin role has been assigned successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to assign role. Please try again.",
      });
    },
  });

  const updateRole = useMutation({
    mutationFn: async (roleData: Partial<AdminRoleAssignment>) => {
      const dbRoleData: Partial<DbAdminRoleAssignment> = {
        ...roleData,
        role: roleData.role,
        permissions: roleData.permissions as JsonPermission,
      };

      const { error } = await supabase
        .from("admin_roles")
        .update(dbRoleData as any) // Type assertion needed due to Supabase typing limitations
        .eq("id", roleData.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast({
        title: "Role Updated",
        description: "The role has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update role. Please try again.",
      });
    },
  });

  const removeRole = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from("admin_roles")
        .delete()
        .eq("id", roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast({
        title: "Role Removed",
        description: "The admin role has been removed successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to remove role. Please try again.",
      });
    },
  });

  const updatePermissions = useMutation({
    mutationFn: async ({ roleId, permissions }: { roleId: string; permissions: JsonPermission }) => {
      const { error } = await supabase
        .from("admin_roles")
        .update({ permissions })
        .eq("id", roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast({
        title: "Permissions Updated",
        description: "The role permissions have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update permissions. Please try again.",
      });
    },
  });

  return {
    assignRole,
    updateRole,
    removeRole,
    updatePermissions,
  };
};