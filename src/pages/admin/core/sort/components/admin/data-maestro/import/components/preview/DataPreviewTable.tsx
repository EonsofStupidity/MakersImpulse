import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface DataPreviewTableProps {
  data: any[];
  errors: Record<number, string[]>;
  onDataChange: (rowIndex: number, field: string, value: string) => void;
}

export const DataPreviewTable = ({ data, errors, onDataChange }: DataPreviewTableProps) => {
  if (!data.length) return null;

  return (
    <div className="relative w-full h-full overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="sticky left-0 bg-background z-20 w-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              Row
            </TableHead>
            {Object.keys(data[0]).map((header) => (
              <TableHead 
                key={header} 
                className="min-w-[200px] px-4 whitespace-nowrap"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className={errors[index] ? "bg-red-50/10" : ""}
            >
              <TableCell className="sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                {index + 1}
              </TableCell>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key} className="min-w-[200px]">
                  <Input
                    value={value as string || ""}
                    onChange={(e) => onDataChange(index, key, e.target.value)}
                    className={errors[index]?.includes(key) ? "border-red-500" : ""}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};