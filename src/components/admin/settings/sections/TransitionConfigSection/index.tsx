import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme";
import { CSSEffectsControl } from "../../components/CSSEffectsControl";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface TransitionConfigSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const TransitionConfigSection: React.FC<TransitionConfigSectionProps> = ({ form }) => {
  const [previewKey, setPreviewKey] = React.useState(0);

  const handleTransitionChange = (value: string | number) => {
    setPreviewKey(prev => prev + 1);
    toast.success("Transition updated", {
      description: "Your changes have been applied"
    });
  };

  const getFormValue = (field: keyof SettingsFormData): string | number => {
    const value = form.watch(field);
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    return value as string | number;
  };

  return (
    <AccordionItem value="transition-config">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Transition Configuration
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Global Transitions</h3>
            <CSSEffectsControl
              label="Default Transition Type"
              type="select"
              value={getFormValue("transition_type")}
              options={[
                { label: "Fade", value: "fade" },
                { label: "Slide", value: "slide" },
                { label: "Scale", value: "scale" },
                { label: "Blur", value: "blur" }
              ]}
              onChange={(value) => {
                form.setValue("transition_type", value as any);
                handleTransitionChange(value);
              }}
              description="Select the default transition style for page changes"
            />
            <CSSEffectsControl
              label="Transition Duration"
              type="slider"
              value={getFormValue("transition_duration")}
              min={0.1}
              max={1}
              step={0.1}
              onChange={(value) => {
                form.setValue("transition_duration", String(value));
                handleTransitionChange(value);
              }}
              description="Adjust the duration of transitions in seconds"
            />
          </div>

          <Card className="p-4 bg-gray-800/50 border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Preview</h3>
            <div className="grid gap-4">
              <motion.div
                key={`preview-${previewKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: Number(form.watch("transition_duration")),
                  ease: "easeOut"
                }}
                className="bg-primary/10 p-4 rounded-lg"
              >
                <p className="text-primary">Transition Preview</p>
              </motion.div>
            </div>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};