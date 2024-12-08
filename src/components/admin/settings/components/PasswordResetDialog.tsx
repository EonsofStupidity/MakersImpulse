import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export const PasswordResetDialog = ({ open, onOpenChange, userEmail }: PasswordResetDialogProps) => {
  const [isResetting, setIsResetting] = useState(false);

  const handlePasswordReset = async () => {
    try {
      setIsResetting(true);
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Error sending reset email:', error);
        toast.error('Failed to send reset email');
        return;
      }

      toast.success('Password reset email sent successfully');
      onOpenChange(false);
    } catch (error) {
      console.error('Error in password reset:', error);
      toast.error('Failed to process password reset');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-zinc-50">
        <DialogHeader>
          <DialogTitle>Reset User Password</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Send a password reset email to {userEmail}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-zinc-400">
            This will send an email to the user with instructions to reset their password.
            The link will expire in 24 hours.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePasswordReset}
            disabled={isResetting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isResetting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Email'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};