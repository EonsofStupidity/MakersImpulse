import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface TableDefinitionFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const TableDefinitionForm = ({ value, onChange }: TableDefinitionFormProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="tableName">Table Name</Label>
          <Input
            id="tableName"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter table name (lowercase, no spaces)"
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Table names must start with a lowercase letter and can only contain lowercase letters, 
            numbers, and underscores.
          </p>
        </div>
      </div>
    </Card>
  );
};