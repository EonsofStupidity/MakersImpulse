import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface FormatSettingsProps {
  format: string;
  settings: Record<string, any>;
  onUpdateSettings: (settings: Record<string, any>) => void;
}

export const FormatSettings = ({ format, settings, onUpdateSettings }: FormatSettingsProps) => {
  const handleSettingChange = (key: string, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  if (format === 'csv') {
    return (
      <Card className="p-4 space-y-4">
        <div className="space-y-2">
          <Label>Delimiter</Label>
          <Input 
            value={settings.delimiter || ','} 
            onChange={(e) => handleSettingChange('delimiter', e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.hasHeader || true}
            onCheckedChange={(checked) => handleSettingChange('hasHeader', checked)}
          />
          <Label>Has Header Row</Label>
        </div>
      </Card>
    );
  }

  if (format === 'json') {
    return (
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.isArray || true}
            onCheckedChange={(checked) => handleSettingChange('isArray', checked)}
          />
          <Label>Expect JSON Array</Label>
        </div>
      </Card>
    );
  }

  return null;
};