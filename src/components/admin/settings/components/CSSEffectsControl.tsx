import { ThemeBase } from '@/types';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CSSEffectsControlProps {
  theme: ThemeBase;
  onChange: (key: keyof ThemeBase['effects'], value: string) => void;
  className?: string;
}

export const CSSEffectsControl = ({ theme, onChange, className }: CSSEffectsControlProps) => {
  const handleSliderChange = (key: keyof ThemeBase['effects'], value: number[]) => {
    onChange(key, `${value[0]}px`);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Label>Border Radius</Label>
        <Slider
          defaultValue={[parseInt(theme.effects?.borderRadius || '0')]}
          max={20}
          step={1}
          onValueChange={(value) => handleSliderChange('borderRadius', value)}
        />
        <Input
          type="text"
          value={theme.effects?.borderRadius}
          onChange={(e) => onChange('borderRadius', e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label>Spacing Unit</Label>
        <Input
          type="text"
          value={theme.effects?.spacingUnit}
          onChange={(e) => onChange('spacingUnit', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Transition Duration</Label>
        <Input
          type="text"
          value={theme.effects?.transitionDuration}
          onChange={(e) => onChange('transitionDuration', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Shadow Color</Label>
        <Input
          type="color"
          value={theme.effects?.shadowColor}
          onChange={(e) => onChange('shadowColor', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Hover Scale</Label>
        <Slider
          defaultValue={[parseFloat(theme.effects?.hoverScale || '1') * 100]}
          max={150}
          step={1}
          onValueChange={(value) => onChange('hoverScale', (value[0] / 100).toString())}
        />
        <Input
          type="text"
          value={theme.effects?.hoverScale}
          onChange={(e) => onChange('hoverScale', e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label>Box Shadow</Label>
        <Input
          type="text"
          value={theme.effects?.boxShadow}
          onChange={(e) => onChange('boxShadow', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Backdrop Blur</Label>
        <Slider
          defaultValue={[parseInt(theme.effects?.backdropBlur || '0')]}
          max={20}
          step={1}
          onValueChange={(value) => handleSliderChange('backdropBlur', value)}
        />
        <Input
          type="text"
          value={theme.effects?.backdropBlur}
          onChange={(e) => onChange('backdropBlur', e.target.value)}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default CSSEffectsControl;