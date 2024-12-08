import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomLogicInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomLogicInput = ({ value, onChange }: CustomLogicInputProps) => {
  return (
    <div>
      <Label htmlFor="customLogic">Custom Logic (Optional)</Label>
      <Textarea
        id="customLogic"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter custom logic expression (e.g., condition1 AND (condition2 OR condition3))"
      />
    </div>
  );
};