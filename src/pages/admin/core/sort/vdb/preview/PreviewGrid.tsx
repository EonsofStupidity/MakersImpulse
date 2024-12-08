import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PreviewGridProps {
  data: any[];
  errors: Record<number, string[]>;
  onDataChange: (rowIndex: number, field: string, value: string) => void;
  filterValues: Record<string, string>;
}

export const PreviewGrid = ({ data, errors, onDataChange, filterValues }: PreviewGridProps) => {
  if (!data.length) return null;

  const filteredData = data.filter(row => {
    return Object.entries(filterValues).every(([field, value]) => {
      if (!value) return true;
      const cellValue = String(row[field]).toLowerCase();
      return cellValue.includes(value.toLowerCase());
    });
  });

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
                "relative"
              )}
            >
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>
                  <div className="relative">
                    <Input
                      value={value as string}
                      onChange={(e) => onDataChange(rowIndex, key, e.target.value)}
                      className={cn(
                        "w-full",
                        errors[rowIndex]?.includes(key) ? "border-red-500" : ""
                      )}
                    />
                    {errors[rowIndex]?.includes(key) && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2">
                        Error
                      </Badge>
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