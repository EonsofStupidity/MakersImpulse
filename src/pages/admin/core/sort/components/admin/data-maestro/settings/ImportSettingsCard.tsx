import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";

interface ImportSettingsCardProps {
  settings: Record<string, boolean>;
  onSettingChange: (key: string, checked: boolean) => void;
}

export const ImportSettingsCard = ({ settings, onSettingChange }: ImportSettingsCardProps) => {
  return (
    <Card className="p-6">
      <SettingsCardHeader
        icon={Settings2}
        title="Import Settings"
        description="Configure import behavior and defaults"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-mapping">Automatic Field Mapping</Label>
          <Switch
            id="auto-mapping"
            checked={settings["auto_mapping"] || false}
            onCheckedChange={(checked) => onSettingChange("auto_mapping", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="validation">Strict Validation</Label>
          <Switch
            id="validation"
            checked={settings["strict_validation"] || false}
            onCheckedChange={(checked) => onSettingChange("strict_validation", checked)}
          />
        </div>
      </div>
    </Card>
  );
};