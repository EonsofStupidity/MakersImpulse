import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types/theme";
import { Card } from "@/components/ui/card";
import { ThemeFormHeader } from "./ThemeFormHeader";
import { ThemeFormContent } from "./ThemeFormContent";

interface ThemeFormContainerProps {
  form: UseFormReturn<ThemeBase>;
  isSaving: boolean;
  onResetClick: () => void;
}

export const ThemeFormContainer: React.FC<ThemeFormContainerProps> = ({
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