import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import type { ComponentType } from "@/types/components";
import type { FilterPreferences } from "./AdvancedFilter";
import { ComponentCard } from "./components/ComponentCard";
import { ComponentSkeleton } from "./components/ComponentSkeleton";
import ComponentFilter from "./ComponentFilter";
import { useComponentList } from "@/hooks/useComponentList";

export type ComponentData = {
  id: string;
  name: string;
  manufacturer: string;
  cost_usd: number;
  summary: string;
};

interface ComponentSelectorProps {
  type: ComponentType;
  onSelect: (component: ComponentData) => void;
  selectedId?: string;
  compatibleWith?: string[];
}

const ComponentSelector = ({ 
  type, 
  onSelect, 
  selectedId,
  compatibleWith 
}: ComponentSelectorProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterPreferences>({
    priceRange: [0, 1000],
    showCompatibleOnly: false,
    searchQuery: "",
    sortBy: "name"
  });

  // Cast type to the correct table name
  const { components, isLoading, error, totalPages } = useComponentList(
    type as "base_product" | "bearings" | "extruders" | "addons",
    filters,
    compatibleWith,
    currentPage
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load components. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <ComponentFilter
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
        sortBy={filters.sortBy}
        onSortChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
        type={type}
        onFilterChange={setFilters}
        compatibleWith={compatibleWith}
        currentFilters={filters}
      />
      
      <ScrollArea className="h-[400px] pr-4">
        {isLoading ? (
          <ComponentSkeleton count={3} />
        ) : components?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No components found matching your criteria
          </div>
        ) : (
          <RadioGroup
            value={selectedId}
            onValueChange={(value) => {
              const selected = components?.find(c => c.id === value);
              if (selected) onSelect(selected);
            }}
          >
            <div className="space-y-4">
              {components?.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isSelected={selectedId === component.id}
                />
              ))}
            </div>
          </RadioGroup>
        )}
      </ScrollArea>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ComponentSelector;

