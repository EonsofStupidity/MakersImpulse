import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PreviewGridProps {
  data: any[];
  errors: Record<number, string[]>;
  onDataChange: (rowIndex: number, field: string, value: string) => void;
  filterValues: Record<string, string>;
  tagVerification: Record<string, boolean>;
  onAddTag: (tagName: string) => void;
}

export const PreviewGrid = ({ 
  data, 
  errors, 
  onDataChange, 
  filterValues,
  tagVerification,
  onAddTag
}: PreviewGridProps) => {
  if (!data.length) return null;

  const filteredData = data.filter(row => {
    return Object.entries(filterValues).every(([field, value]) => {
      if (!value) return true;
      const cellValue = String(row[field]).toLowerCase();
      return cellValue.includes(value.toLowerCase());
    });
  });

  const isFirstRow = (rowIndex: number) => rowIndex === 0;
  const isTagCell = (value: any) => typeof value === 'string' && tagVerification.hasOwnProperty(value);

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map(header => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex}
              className={cn(
                errors[rowIndex] ? "bg-red-50/10" : "",
                isFirstRow(rowIndex) ? "bg-muted/20" : ""
              )}
            >
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key} className="min-w-[200px]">
                  <div className={cn(
                    "relative",
                    isFirstRow(rowIndex) && isTagCell(value) && "p-1 rounded",
                    isFirstRow(rowIndex) && isTagCell(value) && (tagVerification[value as string] 
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20")
                  )}>
                    <Input
                      value={value as string || ""}
                      onChange={(e) => onDataChange(rowIndex, key, e.target.value)}
                      className={cn(
                        errors[rowIndex]?.includes(key) ? "border-red-500" : "",
                        isFirstRow(rowIndex) && isTagCell(value) && "bg-transparent"
                      )}
                    />
                    {isFirstRow(rowIndex) && isTagCell(value) && !tagVerification[value as string] && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onAddTag(value as string)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Tag
                      </Button>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};