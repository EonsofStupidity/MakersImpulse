import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types";
import { Card } from "@/components/ui/card";
import { ThemeFormHeader } from "./ThemeFormHeader";
import { ThemeFormContent } from "./ThemeFormContent";

interface ThemeSettingsFormContainerProps {
  form: UseFormReturn<ThemeBase>;
  isSaving: boolean;
  onResetClick: () => void;
}

export const ThemeSettingsFormContainer: React.FC<ThemeSettingsFormContainerProps> = ({
  form,
  isSaving,
  onResetClick,
}) => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
      <ThemeFormHeader 
        onResetClick={onResetClick}
        isSaving={isSaving}
      />
      <ThemeFormContent 
        form={form} 
        isSaving={isSaving} 
      />
    </Card>
  );
};
