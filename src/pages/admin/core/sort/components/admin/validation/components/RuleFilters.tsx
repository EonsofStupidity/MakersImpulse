import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RuleFiltersProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export const RuleFilters = ({ filter, onFilterChange }: RuleFiltersProps) => {
  return (
    <div className="space-y-2">
      <Label>Search Rules</Label>
      <Input
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by name or description..."
      />
    </div>
  );
};