import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Settings, FileText, Shield } from "lucide-react";
import { RoleAssignmentDialog } from "./RoleAssignmentDialog";
import { RoleManagementTable } from "./RoleManagementTable";
import { RoleManagementMatrix } from "./RoleManagementMatrix";
import { RoleApplicationList } from "./RoleApplicationList";
import { RoleSettingsDialog } from "./RoleSettingsDialog";
import { RoleApplicationDialog } from "./RoleApplicationDialog";
import { AdminRoleAssignment } from "./types";
import { useRoleManagement } from "./hooks/useRoleManagement";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

const RoleManagement = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRoleAssignment | null>(null);

  const {
    adminRoles,
    users,
    isLoading,
    assignRole,
    updateRole,
    removeRole,
    updatePermissions,
  } = useRoleManagement();

  const isAdmin = adminRoles?.some(role => 
    role.user.id === session?.user?.id && role.role === "super_admin"
  );

  const handleRemoveRole = async (roleId: string) => {
    try {
      await removeRole.mutateAsync(roleId);
      toast({
        title: "Role Removed",
        description: "The role has been successfully removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove role",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin">
          <Shield className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Roles</h2>
        <div className="flex gap-2">
          {isAdmin ? (
            <>
              <Button onClick={() => setIsAssignDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Assign Role
              </Button>
              <Button variant="outline" onClick={() => setIsSettingsDialogOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Role Settings
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsApplicationDialogOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Apply for Role
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="roles">
          <Card className="p-6">
            <RoleManagementTable
              adminRoles={adminRoles}
              onRemoveRole={handleRemoveRole}
              onEditRole={(role) => {
                setSelectedRole(role);
                setIsSettingsDialogOpen(true);
              }}
              isAdmin={isAdmin}
            />
          </Card>
        </TabsContent>

        {isAdmin && (
          <>
            <TabsContent value="permissions">
              <Card className="p-6">
                <RoleManagementMatrix
                  roles={adminRoles || []}
                  onPermissionChange={(roleId, permission) => {
                    const role = adminRoles?.find(r => r.id === roleId);
                    if (!role) return;

                    const updatedPermissions = {
                      ...role.permissions,
                      [permission.feature]: {
                        view: permission.view,
                        create: permission.create,
                        edit: permission.edit,
                        delete: permission.delete,
                      },
                    };

                    updatePermissions.mutate({ roleId, permissions: updatedPermissions });
                  }}
                />
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card className="p-6">
                <RoleApplicationList />
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>

      <RoleAssignmentDialog
        users={users || []}
        onAssignRole={(userId, role) => assignRole.mutate({ userId, role })}
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
      />

      <RoleSettingsDialog
        role={selectedRole}
        isOpen={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
        onUpdate={(roleData) => updateRole.mutate(roleData)}
      />

      <RoleApplicationDialog
        isOpen={isApplicationDialogOpen}
        onOpenChange={setIsApplicationDialogOpen}
      />
    </div>
  );
};

export default RoleManagement;