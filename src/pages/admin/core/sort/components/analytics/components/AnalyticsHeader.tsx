import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DateRange } from "../types";

interface AnalyticsHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  isAdmin: boolean;
}

export const AnalyticsHeader = ({ dateRange, onDateRangeChange, isAdmin }: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">
          {isAdmin ? 'Site Analytics' : 'Builder Analytics'}
        </h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Analytics</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangePicker
                from={dateRange.from}
                to={dateRange.to}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    onDateRangeChange({ from: range.from, to: range.to });
                  }
                }}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};