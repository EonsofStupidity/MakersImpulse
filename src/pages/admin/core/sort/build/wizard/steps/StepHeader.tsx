import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StepHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Build Configuration</h2>
      <Button
        variant="outline"
        className="flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save Progress
      </Button>
    </div>
  );
};