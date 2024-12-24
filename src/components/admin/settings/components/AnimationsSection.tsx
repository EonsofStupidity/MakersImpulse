import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface AnimationsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const AnimationsSection: React.FC<AnimationsSectionProps> = ({ form }) => {
  const handleToggleChange = (field: keyof ThemeBase['animations'], value: boolean) => {
    form.setValue(`animations.${field}`, value);
    toast.success(`${field === "enabled" ? "Animations" : "Real-time updates"} ${value ? "enabled" : "disabled"}`);
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
              <Label htmlFor="animations-enabled" className="text-sm font-medium text-white">
                Enable Animations
              </Label>
              <Switch
                id="animations-enabled"
                checked={form.watch("animations_enabled")}
                onCheckedChange={(checked) => handleToggleChange("enabled", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Animation Settings</h3>
            <CSSEffectsControl
              label="Default Animation Duration (ms)"
              type="slider"
              value={form.watch("default_animation_duration")}
              min={100}
              max={1000}
              step={50}
              onChange={(value) => form.setValue("default_animation_duration", value)}
              description="Set the default duration for all animations"
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