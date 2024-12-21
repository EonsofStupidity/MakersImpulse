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
    <div className="space-y-4">
      <Badge variant="secondary" className="bg-primary/20 text-primary">
        Inheriting from: {parentThemeName}
      </Badge>
      
      <Alert className="bg-primary/10 border-primary/20">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          {inheritanceStrategy === "merge" && (
            "Only modified settings will override the parent theme settings."
          )}
          {inheritanceStrategy === "override" && (
            "Your settings take precedence, falling back to parent theme when unset."
          )}
          {inheritanceStrategy === "replace" && (
            "Parent theme values are completely ignored."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};