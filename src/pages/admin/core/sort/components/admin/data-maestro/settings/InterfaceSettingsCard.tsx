import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sliders } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";

interface InterfaceSettingsCardProps {
  settings: Record<string, boolean>;
  onSettingChange: (key: string, checked: boolean) => void;
}

export const InterfaceSettingsCard = ({ settings, onSettingChange }: InterfaceSettingsCardProps) => {
  return (
    <Card className="p-6">
      <SettingsCardHeader
        icon={Sliders}
        title="Interface Settings"
        description="Customize the user interface"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="animations">Enable Animations</Label>
          <Switch
            id="animations"
            checked={settings["enable_animations"] || false}
            onCheckedChange={(checked) => onSettingChange("enable_animations", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={settings["dark_mode"] || false}
            onCheckedChange={(checked) => onSettingChange("dark_mode", checked)}
          />
        </div>
      </div>
    </Card>
  );
};