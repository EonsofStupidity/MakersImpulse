import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
  isResetting: boolean;
  resetConfirmation: string;
  onResetConfirmationChange: (value: string) => void;
  confirmCheckbox: boolean;
  onConfirmCheckboxChange: (checked: boolean) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export const ResetDialog: React.FC<ResetDialogProps> = ({
  open,
  onOpenChange,
  onReset,
  isResetting,
  resetConfirmation,
  onResetConfirmationChange,
  confirmCheckbox,
  onConfirmCheckboxChange,
  onKeyPress,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Reset Settings to Default</DialogTitle>
          <DialogDescription className="text-gray-400">
            This action will reset all settings to their default values. Type IMPULSE and check the box to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-confirmation" className="text-white">Type IMPULSE to confirm</Label>
            <Input
              id="reset-confirmation"
              value={resetConfirmation}
              onChange={(e) => onResetConfirmationChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="bg-gray-700/50 border-gray-600"
              placeholder="IMPULSE"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm-reset"
              checked={confirmCheckbox}
              onCheckedChange={(checked) => onConfirmCheckboxChange(checked as boolean)}
            />
            <Label htmlFor="confirm-reset" className="text-white">
              I understand this will reset all settings
            </Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onReset}
              disabled={isResetting}
            >
              {isResetting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Settings"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};