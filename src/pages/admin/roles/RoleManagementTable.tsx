import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AdminRoleAssignment } from "./types";
import { format } from "date-fns";
import { useState } from "react";
import { ConfirmActionDialog } from "./components/ConfirmActionDialog";
import { Shield, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RoleManagementTableProps {
  adminRoles: AdminRoleAssignment[] | undefined;
  onRemoveRole: (roleId: string) => void;
  onEditRole: (role: AdminRoleAssignment) => void;
  isAdmin: boolean;
}

export const RoleManagementTable = ({
  adminRoles,
  onRemoveRole,
  onEditRole,
  isAdmin,
}: RoleManagementTableProps) => {
  const [roleToDelete, setRoleToDelete] = useState<AdminRoleAssignment | null>(null);
  const { toast } = useToast();

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;

    try {
      await onRemoveRole(roleToDelete.id);
      toast({
        title: "Role Deleted",
        description: "The role has been successfully deleted.",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Cannot delete protected role")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "This role is protected and cannot be deleted.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete role. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>Assigned At</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminRoles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.user.display_name || role.user.username}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {role.role}
                </div>
              </TableCell>
              <TableCell>{role.assigned_by_user?.username || "-"}</TableCell>
              <TableCell>{format(new Date(role.assigned_at), "PPp")}</TableCell>
              {isAdmin && (
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditRole(role)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setRoleToDelete(role)}
                      disabled={role.deletion_protected}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
          {!adminRoles?.length && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No admin roles found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmActionDialog
        isOpen={!!roleToDelete}
        onOpenChange={(open) => !open && setRoleToDelete(null)}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to remove the ${roleToDelete?.role} role from ${
          roleToDelete?.user.display_name || roleToDelete?.user.username
        }? This action cannot be undone.`}
        confirmText="Delete Role"
        variant="destructive"
      />
    </>
  );
};