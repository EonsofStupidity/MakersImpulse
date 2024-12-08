import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

interface PreviewFiltersProps {
  headers: string[];
  filterValues: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  onSort: (field: string) => void;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
}

export const PreviewFilters = ({
  headers,
  filterValues,
  onFilterChange,
  onSort,
  sortField,
  sortDirection
}: PreviewFiltersProps) => {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
      {headers.map(header => (
        <div key={header} className="space-y-2">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onSort(header)}
          >
            {header}
            <ArrowUpDown className="h-4 w-4" />
          </div>
          <Input
            placeholder={`Filter ${header}...`}
            value={filterValues[header] || ''}
            onChange={(e) => onFilterChange(header, e.target.value)}
            className="h-8"
          />
        </div>
      ))}
    </div>
  );
};