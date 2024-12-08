import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Tag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TagConfigurationStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TagConfigurationStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: TagConfigurationStepProps) => {
  const updateTagConfig = (key: string, value: any) => {
    onUpdate({
      ...config,
      tagConfig: {
        ...config.tagConfig,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Generate Tags</Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate tags based on field values
              </p>
            </div>
            <Switch
              checked={config.tagConfig.autoGenerate}
              onCheckedChange={(checked) => updateTagConfig("autoGenerate", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Prevent Duplicate Tags</Label>
              <p className="text-sm text-muted-foreground">
                Merge similar tags to prevent duplicates
              </p>
            </div>
            <Switch
              checked={config.tagConfig.preventDuplicates}
              onCheckedChange={(checked) => updateTagConfig("preventDuplicates", checked)}
            />
          </div>

          {config.tagConfig.autoGenerate && (
            <Alert>
              <Tag className="h-4 w-4" />
              <AlertTitle>Auto-Generation Enabled</AlertTitle>
              <AlertDescription>
                Tags will be automatically generated from field values during import
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Review
        </Button>
      </div>
    </div>
  );
};