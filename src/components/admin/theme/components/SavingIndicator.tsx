import React from "react";
import { Loader2 } from "lucide-react";

interface SavingIndicatorProps {
  isSaving: boolean;
}

export const SavingIndicator: React.FC<SavingIndicatorProps> = ({ isSaving }) => {
  if (!isSaving) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-primary">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Saving changes...</span>
    </div>
  );
};