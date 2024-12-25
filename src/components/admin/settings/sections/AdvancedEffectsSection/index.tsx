import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ColorPicker } from "../../components/ColorPicker";
import { UseFormReturn, ThemeBase } from "@/types";
import { CSSEffectsControl } from "../../components/CSSEffectsControl";

interface AdvancedEffectsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const AdvancedEffectsSection: React.FC<AdvancedEffectsSectionProps> = ({ form }) => {
  const handleValueChange = (value: string | number) => {
    return value.toString();
  };

  return (
    <AccordionItem value="advanced-css">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Advanced CSS Settings
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="grid gap-4">
          <CSSEffectsControl
            label="Border Radius"
            type="input"
            value={form.watch("border_radius")}
            onChange={(value) => form.setValue("border_radius", handleValueChange(value))}
            description="Border radius for UI elements (e.g., 0.5rem)"
          />
          
          <CSSEffectsControl
            label="Spacing Unit"
            type="input"
            value={form.watch("spacing_unit")}
            onChange={(value) => form.setValue("spacing_unit", handleValueChange(value))}
            description="Base spacing unit for layout (e.g., 1rem)"
          />
          
          <CSSEffectsControl
            label="Transition Duration"
            type="slider"
            value={parseFloat(form.watch("transition_duration"))}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(value) => form.setValue("transition_duration", handleValueChange(value))}
            description="Duration for animations (in seconds)"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};