import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tag } from "lucide-react";

interface TagGenerationConfigProps {
  config: {
    enabled: boolean;
    minFrequency: number;
    mergeDuplicates: boolean;
  };
  onUpdateConfig: (config: any) => void;
}

export const TagGenerationConfig = ({
  config,
  onUpdateConfig,
}: TagGenerationConfigProps) => {
  const handleConfigChange = (key: string, value: any) => {
    onUpdateConfig({
      ...config,
      [key]: value,
    });
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Auto-Generate Tags</Label>
          <p className="text-sm text-muted-foreground">
            Automatically generate tags from field values
          </p>
        </div>
        <Switch
          checked={config.enabled}
          onCheckedChange={(checked) => handleConfigChange("enabled", checked)}
        />
      </div>

      {config.enabled && (
        <>
          <div className="space-y-2">
            <Label>Minimum Frequency</Label>
            <Input
              type="number"
              min={1}
              value={config.minFrequency}
              onChange={(e) =>
                handleConfigChange("minFrequency", parseInt(e.target.value))
              }
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Minimum number of occurrences required to generate a tag
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.mergeDuplicates}
              onCheckedChange={(checked) =>
                handleConfigChange("mergeDuplicates", checked)
              }
            />
            <Label>Merge Similar Tags</Label>
          </div>

          <Alert>
            <Tag className="h-4 w-4" />
            <AlertDescription>
              Tags will be automatically generated based on field values that appear
              at least {config.minFrequency} times
            </AlertDescription>
          </Alert>
        </>
      )}
    </Card>
  );
};