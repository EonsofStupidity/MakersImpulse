import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types/theme/core/types";
import { Card } from "@/components/ui/card";
import { SettingsFormHeader } from "./SettingsFormHeader";
import { SettingsFormContent } from "./SettingsFormContent";

interface SettingsFormContainerProps {
  form: UseFormReturn<ThemeBase>;
  isSaving: boolean;
  onResetClick: () => void;
}

export const SettingsFormContainer: React.FC<SettingsFormContainerProps> = ({
  form,
  isSaving,
  onResetClick,
}) => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
      <SettingsFormHeader 
        onResetClick={onResetClick}
        isSaving={isSaving}
      />
      <SettingsFormContent 
        form={form} 
        isSaving={isSaving} 
      />
    </Card>
  );
};