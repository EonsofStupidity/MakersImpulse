import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn, ThemeBase } from "@/types";
import { ParentThemeSelect } from "./theme-inheritance/ParentThemeSelect";
import { InheritanceStrategySelect } from "./theme-inheritance/InheritanceStrategySelect";
import { InheritanceStatus } from "./theme-inheritance/InheritanceStatus";
import { useParentTheme } from "./theme-inheritance/useParentTheme";

interface ThemeInheritanceSectionProps {
  form: UseFormReturn<ThemeBase>;
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
        <div className="p-4 space-y-4 bg-gray-800/50 border border-white/10">
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
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};