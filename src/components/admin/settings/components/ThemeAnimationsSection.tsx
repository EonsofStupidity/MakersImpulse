import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn, ThemeBase, TransitionType } from "@/types";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ThemeAnimationsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const ThemeAnimationsSection: React.FC<ThemeAnimationsSectionProps> = ({ form }) => {
  const handleToggleChange = (field: "real_time_toggle" | "animations_enabled", value: boolean) => {
    form.setValue(field, value);
    toast.success(`${field === "real_time_toggle" ? "Real-time updates" : "Animations"} ${value ? "enabled" : "disabled"}`);
  };

  return (
    <AccordionItem value="animations">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Animations & Real-time Updates
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <Card className="p-4 space-y-6 bg-gray-800/50 border border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="real-time-toggle" className="text-sm font-medium text-white">
                Real-time Updates
              </Label>
              <Switch
                id="real-time-toggle"
                checked={form.watch("real_time_toggle") ?? true}
                onCheckedChange={(checked) => handleToggleChange("real_time_toggle", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations-enabled" className="text-sm font-medium text-white">
                Enable Animations
              </Label>
              <Switch
                id="animations-enabled"
                checked={form.watch("animations_enabled") ?? true}
                onCheckedChange={(checked) => handleToggleChange("animations_enabled", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Animation Settings</h3>
            <CSSEffectsControl
              label="Default Animation Duration (ms)"
              type="slider"
              value={form.watch("default_animation_duration") || 300}
              min={100}
              max={1000}
              step={50}
              onChange={(value) => form.setValue("default_animation_duration", value)}
              description="Set the default duration for all animations"
            />
            <CSSEffectsControl
              label="Transition Type"
              type="select"
              value={form.watch("transition_type") || "fade"}
              options={[
                { label: "Fade", value: "fade" },
                { label: "Slide", value: "slide" },
                { label: "Scale", value: "scale" },
                { label: "Blur", value: "blur" }
              ]}
              onChange={(value) => form.setValue("transition_type", value as TransitionType)}
              description="Select the type of transition between elements"
            />
          </div>

          {form.watch("animations_enabled") && (
            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-white/5">
              <h4 className="text-sm font-medium text-white mb-2">Preview</h4>
              <div className="space-y-4">
                <div
                  className="p-4 bg-primary/10 rounded-lg transition-all"
                  style={{
                    transitionDuration: `${form.watch("default_animation_duration")}ms`,
                  }}
                >
                  <p className="text-primary text-sm">Animation Preview</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};
