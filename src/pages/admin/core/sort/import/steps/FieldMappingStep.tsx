import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FieldMappingStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FieldMappingStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: FieldMappingStepProps) => {
  const addField = (type: 'primary' | 'secondary') => {
    const newField = {
      name: '',
      type: 'string',
    };
    
    onUpdate({
      ...config,
      [`${type}_fields`]: [...config[`${type}_fields`], newField]
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Primary Fields</h3>
          <p className="text-sm text-muted-foreground">Define the main fields for your import</p>
        </div>
        
        {config.primary_fields.map((field: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input
              value={field.name}
              onChange={(e) => {
                const newFields = [...config.primary_fields];
                newFields[index].name = e.target.value;
                onUpdate({ ...config, primary_fields: newFields });
              }}
              placeholder="Field name"
            />
            <Select
              value={field.type}
              onValueChange={(value) => {
                const newFields = [...config.primary_fields];
                newFields[index].type = value;
                onUpdate({ ...config, primary_fields: newFields });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={() => addField('primary')}
          className="w-full"
        >
          Add Primary Field
        </Button>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};