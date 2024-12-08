import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface DataPreviewProps {
  originalData: any[];
  transformedData: any[];
}

export const DataPreview = ({ originalData, transformedData }: DataPreviewProps) => {
  const [showOriginal, setShowOriginal] = useState(true);
  const displayData = showOriginal ? originalData : transformedData;

  if (!displayData?.length) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No data to preview</p>
      </Card>
    );
  }

  const columns = Object.keys(displayData[0]);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {showOriginal ? "Original Data" : "Transformed Data"}
        </h3>
        <Button
          variant="outline"
          onClick={() => setShowOriginal(!showOriginal)}
        >
          Show {showOriginal ? "Transformed" : "Original"} Data
        </Button>
      </div>

      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Row</TableHead>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};