import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DelimiterType } from "@/components/admin/data-maestro/import/types/parsing";

interface DelimiterSelectorProps {
  value: DelimiterType;
  onChange: (value: DelimiterType) => void;
  disabled?: boolean;
}

export const DelimiterSelector = ({
  value,
  onChange,
  disabled
}: DelimiterSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Delimiter</Label>
      <Select 
        value={value} 
        onValueChange={(val) => onChange(val as DelimiterType)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="comma">Comma (,)</SelectItem>
          <SelectItem value="semicolon">Semicolon (;)</SelectItem>
          <SelectItem value="tab">Tab</SelectItem>
          <SelectItem value="pipe">Pipe (|)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
