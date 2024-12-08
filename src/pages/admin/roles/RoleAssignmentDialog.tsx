import { useState } from "react";
import { Shield, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ADMIN_ROLES } from "./constants";
import { AdminRole } from "./types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface RoleAssignmentDialogProps {
  users: Array<{ id: string; username: string; display_name: string | null }>;
  onAssignRole: (userId: string, role: AdminRole, customName?: string, customDescription?: string) => void;
  onCreateRole?: (name: string, description: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoleAssignmentDialog = ({
  users,
  onAssignRole,
  onCreateRole,
  isOpen,
  onOpenChange,
}: RoleAssignmentDialogProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);
  const [customRoleName, setCustomRoleName] = useState("");
  const [customRoleDescription, setCustomRoleDescription] = useState("");
  const { toast } = useToast();

  const handleAssignRole = () => {
    if (!selectedUser || !selectedRole) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both a user and a role.",
      });
      return;
    }

    if (selectedRole === "custom_admin" && (!customRoleName || !customRoleDescription)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both a name and description for the custom role.",
      });
      return;
    }

    onAssignRole(
      selectedUser, 
      selectedRole,
      selectedRole === "custom_admin" ? customRoleName : undefined,
      selectedRole === "custom_admin" ? customRoleDescription : undefined
    );
    
    setSelectedUser(null);
    setSelectedRole(null);
    setCustomRoleName("");
    setCustomRoleDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Manage Roles
          </DialogTitle>
        </DialogHeader>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select User</label>
            <Select
              value={selectedUser || ""}
              onValueChange={setSelectedUser}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.display_name || user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Role</label>
            <Select
              value={selectedRole || ""}
              onValueChange={(role) => setSelectedRole(role as AdminRole)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom_admin">Custom Role</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRole === "custom_admin" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  value={customRoleName}
                  onChange={(e) => setCustomRoleName(e.target.value)}
                  placeholder="Enter custom role name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Description</label>
                <Textarea
                  value={customRoleDescription}
                  onChange={(e) => setCustomRoleDescription(e.target.value)}
                  placeholder="Enter role description"
                  rows={3}
                />
              </div>
            </div>
          )}

          {selectedRole && selectedRole !== "custom_admin" && (
            <p className="text-sm text-muted-foreground mt-2">
              {ADMIN_ROLES.find(r => r.value === selectedRole)?.description}
            </p>
          )}
        </Card>
        
        <Button 
          className="w-full mt-4" 
          onClick={handleAssignRole}
          disabled={!selectedUser || !selectedRole || (selectedRole === "custom_admin" && (!customRoleName || !customRoleDescription))}
        >
          <Shield className="h-4 w-4 mr-2" />
          {selectedRole === "custom_admin" ? "Create & Assign Custom Role" : "Assign Role"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};