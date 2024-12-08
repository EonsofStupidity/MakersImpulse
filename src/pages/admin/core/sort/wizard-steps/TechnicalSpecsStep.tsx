import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TechnicalSpecsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const TechnicalSpecsStep = ({ data, onUpdate }: TechnicalSpecsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Technical Specifications</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cost">Cost (USD)</Label>
          <Input
            id="cost"
            type="number"
            value={data.cost_usd || ""}
            onChange={(e) => onUpdate({ ...data, cost_usd: e.target.value })}
            placeholder="Enter cost in USD"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecsStep;