import { useState } from 'react';
import { ThemeBase } from '@/types';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransitionType } from '@/types';

interface AnimationsSectionProps {
  theme: ThemeBase;
  onChange: (key: string, value: any) => void;
}

export const AnimationsSection = ({ theme, onChange }: AnimationsSectionProps) => {
  const [isEnabled, setIsEnabled] = useState(theme.animations_enabled || false);

  const handleAnimationToggle = (checked: boolean) => {
    setIsEnabled(checked);
    onChange('animations_enabled', checked);
  };

  const handleDurationChange = (value: number[]) => {
    onChange('default_animation_duration', value[0]);
  };

  const handleTransitionTypeChange = (value: TransitionType) => {
    onChange('transition_type', value);
  };

  return (
    <Card className="p-6 space-y-6 bg-black/20 backdrop-blur-sm border-white/10">
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
              defaultValue={[theme.default_animation_duration || 300]}
              max={1000}
              step={50}
              onValueChange={handleDurationChange}
            />
          </div>

          <div className="space-y-4">
            <Label>Transition Type</Label>
            <Select
              value={theme.transition_type}
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
    </Card>
  );
};

export default AnimationsSection;