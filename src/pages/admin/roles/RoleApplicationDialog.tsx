import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ADMIN_ROLES } from "./constants";
import { supabase } from "@/integrations/supabase/client";
import { AdminRole, DbRoleApplication } from "./types";

interface RoleApplicationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoleApplicationDialog = ({ isOpen, onOpenChange }: RoleApplicationDialogProps) => {
  const session = useSession();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<AdminRole | "">("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user?.id || !selectedRole || !reason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData: DbRoleApplication = {
        user_id: session.user.id,
        role: selectedRole,
        reason: reason.trim(),
      };

      const { error } = await supabase
        .from("role_applications")
        .insert(applicationData as any); // Type assertion needed due to Supabase typing limitations

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your role application has been submitted successfully.",
      });
      onOpenChange(false);
      setSelectedRole("");
      setReason("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Admin Role</DialogTitle>
          <DialogDescription>
            Submit your application for an admin role. Please provide a detailed reason for your request.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as AdminRole)}
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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for Application</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you would be a good fit for this role..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !selectedRole || !reason.trim()}
          >
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};