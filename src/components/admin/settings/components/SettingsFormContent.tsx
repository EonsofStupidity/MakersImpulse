import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Accordion } from "@/components/ui/accordion";
import { ThemeBase } from "@/types";
import { SavingIndicator } from "./SavingIndicator";

import { ColorSection } from "../sections/ColorSection";
import { TextStylesSection } from "../sections/TextStylesSection";
import { LayoutSection } from "../sections/LayoutSection";
import { TransitionConfigSection } from "../sections/TransitionConfigSection";
import { AnimationsSection } from "../sections/AnimationsSection";
import { AdvancedEffectsSection } from "../sections/AdvancedEffectsSection";
import { ThemeImportSection } from "../sections/ThemeImportSection";
import { ThemeInheritanceSection } from "./ThemeInheritanceSection";

interface SettingsFormContentProps {
  form: UseFormReturn<ThemeBase>;
  isSaving: boolean;
}

export const SettingsFormContent: React.FC<SettingsFormContentProps> = ({
  form,
  isSaving
}) => {
  return (
    <form className="space-y-6">
      <SavingIndicator isSaving={isSaving} />
      <Accordion type="single" collapsible className="space-y-4">
        <ThemeInheritanceSection form={form} />
        <ThemeImportSection form={form} />
        <ColorSection form={form} />
        <TextStylesSection form={form} />
        <LayoutSection form={form} />
        <TransitionConfigSection form={form} />
        <AnimationsSection form={form} />
        <AdvancedEffectsSection form={form} />
      </Accordion>
    </form>
  );
};
