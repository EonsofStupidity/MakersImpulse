import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RuleBasicInfoProps {
  name: string;
  description?: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (desc: string) => void;
}

export const RuleBasicInfo = ({ 
  name, 
  description, 
  onNameChange, 
  onDescriptionChange 
}: RuleBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Rule Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter rule name"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter rule description"
        />
      </div>
    </div>
  );
};