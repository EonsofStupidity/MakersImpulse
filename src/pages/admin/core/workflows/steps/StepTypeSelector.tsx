import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeyRound, Bell, CheckSquare, GitBranch } from "lucide-react";

const STEP_TYPES = [
  { id: 'user_input', name: 'User Input', icon: KeyRound },
  { id: 'approval', name: 'Approval Request', icon: CheckSquare },
  { id: 'notification', name: 'Send Notification', icon: Bell },
  { id: 'condition', name: 'Condition', icon: GitBranch },
];

interface StepTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const StepTypeSelector = ({ value, onChange }: StepTypeSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select step type" />
      </SelectTrigger>
      <SelectContent>
        {STEP_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <SelectItem key={type.id} value={type.id}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{type.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};