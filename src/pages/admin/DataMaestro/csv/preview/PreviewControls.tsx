import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PreviewControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDownloadCSV: () => void;
  selectedRows: number[];
}

export const PreviewControls = ({
  searchTerm,
  onSearchChange,
  onDownloadCSV,
  selectedRows
}: PreviewControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onDownloadCSV}
        disabled={selectedRows.length === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export Selected
      </Button>
    </div>
  );
};