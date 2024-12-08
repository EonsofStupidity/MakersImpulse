import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";

interface DatabaseSettingsCardProps {
  settings: Record<string, boolean>;
  onSettingChange: (key: string, checked: boolean) => void;
}

export const DatabaseSettingsCard = ({ settings, onSettingChange }: DatabaseSettingsCardProps) => {
  return (
    <Card className="p-6">
      <SettingsCardHeader
        icon={Database}
        title="Database Settings"
        description="Configure database connection and behavior"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-backup">Automatic Backups</Label>
          <Switch
            id="auto-backup"
            checked={settings["auto_backup"] || false}
            onCheckedChange={(checked) => onSettingChange("auto_backup", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="compression">Data Compression</Label>
          <Switch
            id="compression"
            checked={settings["compression"] || false}
            onCheckedChange={(checked) => onSettingChange("compression", checked)}
          />
        </div>
      </div>
    </Card>
  );
};