import React, { useState } from 'react';
import { ThemeBase } from '@/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransitionType } from '@/types';

interface AnimationsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const AnimationsSection: React.FC<AnimationsSectionProps> = ({ form }) => {
  const [isEnabled, setIsEnabled] = useState(form.watch("animations_enabled") || false);

  const handleAnimationToggle = (checked: boolean) => {
    setIsEnabled(checked);
    form.setValue("animations_enabled", checked);
  };

  const handleDurationChange = (value: number[]) => {
    form.setValue("default_animation_duration", value[0]);
  };

  const handleTransitionTypeChange = (value: TransitionType) => {
    form.setValue("transition_type", value);
  };

  return (
    <AccordionItem value="animations">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Animations & Transitions
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="animations-toggle" className="text-lg font-medium">
            Enable Animations
          </Label>
          <Switch
            id="animations-toggle"
            checked={isEnabled}
            onCheckedChange={handleAnimationToggle}
          />
        </div>

        {isEnabled && (
          <>
            <div className="space-y-4">
              <Label>Animation Duration (ms)</Label>
              <Slider
                defaultValue={[form.watch("default_animation_duration") || 300]}
                max={1000}
                step={50}
                onValueChange={handleDurationChange}
              />
            </div>

            <div className="space-y-4">
              <Label>Transition Type</Label>
              <Select
                value={form.watch("transition_type") || "fade"}
                onValueChange={handleTransitionTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="blur">Blur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AnimationsSection;
