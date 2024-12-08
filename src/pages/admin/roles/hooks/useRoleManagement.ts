import { useRoleQueries } from "./useRoleQueries";
import { useRoleMutations } from "./useRoleMutations";

export const useRoleManagement = () => {
  const { adminRoles, users, isLoading } = useRoleQueries();
  const { assignRole, updateRole, removeRole, updatePermissions } = useRoleMutations();

  return {
    adminRoles,
    users,
    isLoading,
    assignRole,
    updateRole,
    removeRole,
    updatePermissions,
  };
};