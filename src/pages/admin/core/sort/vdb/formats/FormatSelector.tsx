import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormatSelector = ({ value, onChange }: FormatSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>File Format</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
          <SelectItem value="xml">XML</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};