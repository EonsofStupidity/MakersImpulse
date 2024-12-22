import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Accordion } from "@/components/ui/accordion";
import { ThemeBase } from "@/types/theme";
import { ThemeImportSection } from "../sections/ThemeImportSection";
import { SavingIndicator } from "./SavingIndicator";

interface ThemeFormContentProps {
  form: UseFormReturn<ThemeBase>;
  isSaving: boolean;
}

export const ThemeFormContent: React.FC<ThemeFormContentProps> = ({
  form,
  isSaving
}) => {
  return (
    <form className="space-y-6">
      <SavingIndicator isSaving={isSaving} />
      <Accordion type="single" collapsible className="space-y-4">
        <ThemeImportSection form={form} />
      </Accordion>
    </form>
  );
};