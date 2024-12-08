import { Button } from "@/components/ui/button";
import { Save, X, Check } from "lucide-react";

interface ImportHeaderProps {
  onSaveProgress: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ImportHeader = ({ onSaveProgress, onCancel, onConfirm }: ImportHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Data Import</h2>
      <div className="space-x-2">
        <Button variant="outline" onClick={onSaveProgress}>
          <Save className="w-4 h-4 mr-2" />
          Save Progress
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          <Check className="w-4 h-4 mr-2" />
          Confirm Import
        </Button>
      </div>
    </div>
  );
};