import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AdvancedFilter, { FilterPreferences } from "./AdvancedFilter";

interface ComponentFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  type: string;
  onFilterChange: (filters: FilterPreferences) => void;
  compatibleWith?: string[];
  currentFilters: FilterPreferences;
}

const ComponentFilter = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  type,
  onFilterChange,
  compatibleWith,
  currentFilters
}: ComponentFilterProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search {type}</Label>
          <Input
            id="search"
            type="search"
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="w-full sm:w-48">
          <Label htmlFor="sort">Sort by</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger id="sort" className="mt-1">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="cost">Price: Low to High</SelectItem>
              <SelectItem value="cost-desc">Price: High to Low</SelectItem>
              <SelectItem value="manufacturer">Manufacturer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto flex items-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <AdvancedFilter
                  type={type}
                  onFilterChange={onFilterChange}
                  compatibleWith={compatibleWith}
                  initialFilters={currentFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ComponentFilter;