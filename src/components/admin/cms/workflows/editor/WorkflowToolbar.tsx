import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkflowToolbarProps {
  onAddStep: () => void;
  onAddCondition: () => void;
  onSave: () => void;
}

export const WorkflowToolbar = ({ onAddStep, onAddCondition, onSave }: WorkflowToolbarProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onAddStep}>
        <Plus className="w-4 h-4 mr-2" />
        Add Step
      </Button>
      <Button variant="outline" onClick={onAddCondition}>
        <Plus className="w-4 h-4 mr-2" />
        Add Condition
      </Button>
      <Button variant="secondary" onClick={onSave} className="ml-auto">
        Save Workflow
      </Button>
    </div>
  );
};