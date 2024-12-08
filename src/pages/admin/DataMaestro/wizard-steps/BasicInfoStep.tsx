import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const BasicInfoStep = ({ data, onUpdate }: BasicInfoStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Component Name</Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => onUpdate({ ...data, name: e.target.value })}
            placeholder="Enter component name"
          />
        </div>
        <div>
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={data.manufacturer || ""}
            onChange={(e) => onUpdate({ ...data, manufacturer: e.target.value })}
            placeholder="Enter manufacturer name"
          />
        </div>
        <div>
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={data.summary || ""}
            onChange={(e) => onUpdate({ ...data, summary: e.target.value })}
            placeholder="Enter component description"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;