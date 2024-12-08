import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";

interface PreviewControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDownloadCSV: () => void;
  selectedRows: number[];
  onBulkEdit?: (field: string, value: string) => void;
}

export const PreviewControls = ({
  searchTerm,
  onSearchChange,
  onDownloadCSV,
  selectedRows,
  onBulkEdit
}: PreviewControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" onClick={onDownloadCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};