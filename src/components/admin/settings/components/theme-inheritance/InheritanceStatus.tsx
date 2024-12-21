import React from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface InheritanceStatusProps {
  parentThemeId: string | null;
  inheritanceStrategy: string | null;
  parentThemeName?: string;
}

export const InheritanceStatus: React.FC<InheritanceStatusProps> = ({
  parentThemeId,
  inheritanceStrategy,
  parentThemeName
}) => {
  if (!parentThemeId) return null;

  return (
    <div className="space-y-2">
      <Badge variant="secondary" className="bg-primary/20 text-primary">
        Inheriting from: {parentThemeName}
      </Badge>
      
      {inheritanceStrategy === "merge" && (
        <p className="text-sm text-gray-400">
          Only modified settings will override the parent theme
        </p>
      )}
      {inheritanceStrategy === "override" && (
        <p className="text-sm text-gray-400">
          Your settings take precedence, falling back to parent theme when unset
        </p>
      )}
      {inheritanceStrategy === "replace" && (
        <p className="text-sm text-gray-400">
          Parent theme values are completely ignored
        </p>
      )}
    </div>
  );
};