import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AdminRoleAssignment, Permission } from "../types";
import { PermissionSwitch } from "./PermissionSwitch";

interface MatrixBodyProps {
  roles: AdminRoleAssignment[];
  filteredFeatures: string[];
  onPermissionChange: (
    roleId: string,
    feature: string,
    permType: keyof Permission,
    checked: boolean
  ) => void;
}

export const MatrixBody = ({
  roles,
  filteredFeatures,
  onPermissionChange,
}: MatrixBodyProps) => {
  const isSuperAdmin = (role: AdminRoleAssignment) => role.role === 'super_admin';

  return (
    <TableBody>
      {filteredFeatures.map((feature) => (
        <TableRow key={feature}>
          <TableCell className="font-medium">{feature}</TableCell>
          {roles.map((role) => (
            <TableCell key={`${feature}-${role.id}`}>
              <div className="flex flex-col gap-2">
                {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                  <PermissionSwitch
                    key={permType}
                    checked={role.permissions?.[feature]?.[permType] || false}
                    onCheckedChange={(checked) =>
                      onPermissionChange(role.id, feature, permType, checked)
                    }
                    disabled={isSuperAdmin(role) || (permType !== 'view' && !role.permissions?.[feature]?.view)}
                    label={permType.charAt(0).toUpperCase() + permType.slice(1)}
                  />
                ))}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};