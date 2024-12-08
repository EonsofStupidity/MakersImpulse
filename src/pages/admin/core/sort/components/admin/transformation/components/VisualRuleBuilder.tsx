import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VisualRuleBuilderProps {
  type: string;
  configuration: any;
  onChange: (configuration: any) => void;
}

export const VisualRuleBuilder = ({
  type,
  configuration,
  onChange,
}: VisualRuleBuilderProps) => {
  const renderStringManipulation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Operation</Label>
        <Select
          value={configuration.operation || "uppercase"}
          onValueChange={(value) => onChange({ ...configuration, operation: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">Convert to Uppercase</SelectItem>
            <SelectItem value="lowercase">Convert to Lowercase</SelectItem>
            <SelectItem value="capitalize">Capitalize</SelectItem>
            <SelectItem value="trim">Trim Whitespace</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderDateFormat = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Format</Label>
        <Select
          value={configuration.format || "ISO"}
          onValueChange={(value) => onChange({ ...configuration, format: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ISO">ISO Format</SelectItem>
            <SelectItem value="short">Short Date</SelectItem>
            <SelectItem value="long">Long Date</SelectItem>
            <SelectItem value="custom">Custom Format</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {configuration.format === "custom" && (
        <div className="space-y-2">
          <Label>Custom Format Pattern</Label>
          <Input
            value={configuration.pattern || ""}
            onChange={(e) =>
              onChange({ ...configuration, pattern: e.target.value })
            }
            placeholder="YYYY-MM-DD"
          />
        </div>
      )}
    </div>
  );

  const renderNumberFormat = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Decimal Places</Label>
        <Input
          type="number"
          value={configuration.decimals || 0}
          onChange={(e) =>
            onChange({ ...configuration, decimals: parseInt(e.target.value) })
          }
          min={0}
          max={10}
        />
      </div>

      <div className="space-y-2">
        <Label>Thousands Separator</Label>
        <Select
          value={configuration.thousands_separator ? "true" : "false"}
          onValueChange={(value) =>
            onChange({
              ...configuration,
              thousands_separator: value === "true",
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card className="p-4">
      {type === "string_manipulation" && renderStringManipulation()}
      {type === "date_format" && renderDateFormat()}
      {type === "number_format" && renderNumberFormat()}
    </Card>
  );
};