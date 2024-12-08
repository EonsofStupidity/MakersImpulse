import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AdminRoleAssignment } from "./types";

interface RoleSettingsDialogProps {
  role: AdminRoleAssignment | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (roleData: Partial<AdminRoleAssignment>) => void;
}

export const RoleSettingsDialog = ({
  role,
  isOpen,
  onOpenChange,
  onUpdate,
}: RoleSettingsDialogProps) => {
  const [description, setDescription] = useState("");
  const [applicationRequired, setApplicationRequired] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);

  useEffect(() => {
    if (role) {
      setDescription(role.description || "");
      setApplicationRequired(role.application_required || false);
      setAutoApprove(role.auto_approve || false);
    }
  }, [role]);

  const handleSubmit = () => {
    if (!role) return;

    onUpdate({
      id: role.id,
      description,
      application_required: applicationRequired,
      auto_approve: autoApprove,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Role Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Role Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter role description..."
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Require Application</Label>
            <Switch
              checked={applicationRequired}
              onCheckedChange={setApplicationRequired}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto-approve Applications</Label>
            <Switch
              checked={autoApprove}
              onCheckedChange={setAutoApprove}
              disabled={!applicationRequired}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};