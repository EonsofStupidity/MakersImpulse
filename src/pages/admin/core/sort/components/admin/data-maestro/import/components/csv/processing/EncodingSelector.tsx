import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileEncoding } from "@/components/admin/data-maestro/import/types/parsing";

interface EncodingSelectorProps {
  value: FileEncoding;
  onChange: (value: FileEncoding) => void;
  disabled?: boolean;
}

export const EncodingSelector = ({
  value,
  onChange,
  disabled
}: EncodingSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>File Encoding</Label>
      <Select 
        value={value} 
        onValueChange={(val) => onChange(val as FileEncoding)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UTF-8">UTF-8</SelectItem>
          <SelectItem value="ASCII">ASCII</SelectItem>
          <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
          <SelectItem value="UTF-16">UTF-16</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
