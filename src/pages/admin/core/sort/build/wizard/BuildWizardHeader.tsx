import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AutosaveIndicator } from "@/components/builder/AutosaveIndicator";

interface BuildWizardHeaderProps {
  buildName: string;
  onBuildNameChange: (name: string) => void;
  onSave: () => void;
  saving: boolean;
  lastSaved?: Date;
}

export const BuildWizardHeader = ({
  buildName,
  onBuildNameChange,
  onSave,
  saving,
  lastSaved
}: BuildWizardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Build Your 3D Printer</h1>
        <Input
          placeholder="Name your build..."
          value={buildName}
          onChange={(e) => onBuildNameChange(e.target.value)}
          className="text-lg max-w-md"
        />
      </div>
      <div className="flex items-center gap-4">
        <AutosaveIndicator saving={saving} lastSaved={lastSaved} />
        <Button onClick={onSave}>Save Progress</Button>
      </div>
    </div>
  );
};