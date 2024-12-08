import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MatrixToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  features: string[];
  selectedFeatures: string[];
  onFeatureToggle: (feature: string, checked: boolean) => void;
  onExport: () => void;
}

export const MatrixToolbar = ({
  searchTerm,
  onSearchChange,
  features,
  selectedFeatures,
  onFeatureToggle,
  onExport,
}: MatrixToolbarProps) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-4">
      <div className="relative w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search features..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {features.map((feature) => (
            <DropdownMenuCheckboxItem
              key={feature}
              checked={selectedFeatures.includes(feature)}
              onCheckedChange={(checked) => onFeatureToggle(feature, checked)}
            >
              {feature}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Button onClick={onExport} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      Export Matrix
    </Button>
  </div>
);