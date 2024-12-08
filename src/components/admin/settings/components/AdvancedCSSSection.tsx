import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "./ColorPicker";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "../types";

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
          <div>
            <label className="text-sm font-medium text-white">Border Radius</label>
            <Input
              {...form.register("border_radius")}
              placeholder="0.5rem"
              className="mt-1 bg-gray-700/50 border-gray-600"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white">Spacing Unit</label>
            <Input
              {...form.register("spacing_unit")}
              placeholder="1rem"
              className="mt-1 bg-gray-700/50 border-gray-600"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white">Transition Duration</label>
            <Input
              {...form.register("transition_duration")}
              placeholder="0.3s"
              className="mt-1 bg-gray-700/50 border-gray-600"
            />
          </div>
          <ColorPicker
            label="Shadow Color"
            cssVar="--shadow"
            value={form.watch("shadow_color") || "#000000"}
            onChange={(color) => form.setValue("shadow_color", color)}
          />
          <div>
            <label className="text-sm font-medium text-white">Hover Scale</label>
            <Input
              {...form.register("hover_scale")}
              placeholder="1.05"
              className="mt-1 bg-gray-700/50 border-gray-600"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};