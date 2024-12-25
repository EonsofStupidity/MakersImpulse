import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn, ThemeBase, TransitionType } from "@/types";
import { CSSEffectsControl } from "@/components/admin/settings/components/CSSEffectsControl";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface TransitionSettingsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const TransitionSettingsSection: React.FC<TransitionSettingsSectionProps> = ({ form }) => {
  const handleTransitionChange = (value: string | number) => {
    form.setValue("transition_type", value as TransitionType);
    toast.success("Transition type updated");
  };

  const handleDurationChange = (value: string | number) => {
    form.setValue("transition_duration", value.toString());
    toast.success("Transition duration updated");
  };

  return (
    <AccordionItem value="transition-settings">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Transition Settings
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <Card className="p-4 bg-gray-800/50 border border-white/10">
          <h3 className="text-sm font-medium text-white">Transition Configuration</h3>
          <CSSEffectsControl
            label="Default Transition Type"
            type="select"
            value={form.watch("transition_type") || "fade"}
            options={[
              { label: "Fade", value: "fade" },
              { label: "Slide", value: "slide" },
              { label: "Scale", value: "scale" },
              { label: "Blur", value: "blur" }
            ]}
            onChange={handleTransitionChange}
            description="Select the default transition style for page changes"
          />
          <CSSEffectsControl
            label="Transition Duration (ms)"
            type="slider"
            value={parseFloat(form.watch("transition_duration")) || 300}
            min={100}
            max={1000}
            step={50}
            onChange={handleDurationChange}
            description="Adjust the duration of transitions in milliseconds"
          />
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};
