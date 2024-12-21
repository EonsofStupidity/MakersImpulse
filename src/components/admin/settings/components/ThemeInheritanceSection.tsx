import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { ParentThemeSelect } from "./theme-inheritance/ParentThemeSelect";
import { InheritanceStrategySelect } from "./theme-inheritance/InheritanceStrategySelect";
import { InheritanceStatus } from "./theme-inheritance/InheritanceStatus";
import { useParentTheme } from "./theme-inheritance/useParentTheme";

interface ThemeInheritanceSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const ThemeInheritanceSection: React.FC<ThemeInheritanceSectionProps> = ({ form }) => {
  const parentThemeId = form.watch("parent_theme_id");
  const { parentTheme } = useParentTheme(parentThemeId);

  return (
    <AccordionItem value="theme-inheritance">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Theme Inheritance & Presets
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <Card className="p-4 space-y-4 bg-gray-800/50 border border-white/10">
          <Alert className="bg-primary/10 border-primary/20">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Theme inheritance allows you to build upon existing themes while maintaining the ability to override specific settings.
            </AlertDescription>
          </Alert>

          <ParentThemeSelect form={form} />

          {parentThemeId && (
            <>
              <InheritanceStrategySelect form={form} />
              <InheritanceStatus 
                parentThemeId={parentThemeId}
                inheritanceStrategy={form.watch("inheritance_strategy")}
                parentThemeName={parentTheme?.name}
              />
            </>
          )}
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};