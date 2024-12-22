import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ThemeFormHeaderProps {
  onResetClick: () => void;
  isSaving: boolean;
}

export const ThemeFormHeader: React.FC<ThemeFormHeaderProps> = ({
  onResetClick,
  isSaving
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">Theme Settings</h2>
      <div className="flex items-center gap-4">
        {isSaving && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving changes...
          </div>
        )}
        <Button
          variant="outline"
          onClick={onResetClick}
          className="bg-gray-700/50 border-gray-600 hover:bg-gray-600/50"
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
};