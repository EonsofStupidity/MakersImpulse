import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "./ColorPicker";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/settings/types";
import { CSSEffectsControl } from "./CSSEffectsControl";

interface AdvancedCSSSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const AdvancedCSSSection: React.FC<AdvancedCSSSectionProps> = ({ form }) => {
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
            value={form.watch("spacing.borderRadius")}
            onChange={(value) => form.setValue("spacing.borderRadius", value)}
            description="Border radius for UI elements (e.g., 0.5rem)"
          />
          
          <CSSEffectsControl
            label="Spacing Unit"
            type="input"
            value={form.watch("spacing.unit")}
            onChange={(value) => form.setValue("spacing.unit", value)}
            description="Base spacing unit for layout (e.g., 1rem)"
          />
          
          <CSSEffectsControl
            label="Transition Duration"
            type="slider"
            value={parseFloat(form.watch("effects.transition.duration"))}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(value) => form.setValue("effects.transition.duration", value.toString())}
            description="Duration for animations (in seconds)"
          />
          
          <ColorPicker
            label="Shadow Color"
            cssVar="--shadow"
            value={form.watch("effects.shadow.color")}
            onChange={(color) => form.setValue("effects.shadow.color", color)}
          />
          
          <CSSEffectsControl
            label="Hover Scale"
            type="slider"
            value={parseFloat(form.watch("effects.hover.scale"))}
            min={1}
            max={1.2}
            step={0.01}
            onChange={(value) => form.setValue("effects.hover.scale", value.toString())}
            description="Scale factor for hover effects"
          />

          <CSSEffectsControl
            label="Box Shadow"
            type="select"
            value={form.watch("effects.shadow.boxShadow")}
            onChange={(value) => form.setValue("effects.shadow.boxShadow", value)}
            options={[
              { label: "None", value: "none" },
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" }
            ]}
            description="Shadow depth for elements"
          />

          <CSSEffectsControl
            label="Backdrop Blur"
            type="slider"
            value={parseInt(form.watch("effects.backdrop.blur") || "0")}
            min={0}
            max={20}
            step={1}
            onChange={(value) => form.setValue("effects.backdrop.blur", value.toString())}
            description="Blur effect for backdrop elements (in pixels)"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};