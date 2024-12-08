import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface TemplatePreviewProps {
  data: Record<string, any>[];
  mappings: Record<string, string>;
  previewLimit?: number;
}

export const TemplatePreview = ({ 
  data, 
  mappings,
  previewLimit = 5
}: TemplatePreviewProps) => {
  const previewData = data.slice(0, previewLimit);
  const mappedFields = Object.values(mappings).filter(Boolean);

  const transformRow = (row: Record<string, any>) => {
    const transformedRow: Record<string, any> = {};
    Object.entries(mappings).forEach(([source, target]) => {
      if (target) {
        transformedRow[target] = row[source];
      }
    });
    return transformedRow;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {mappedFields.map((field) => (
                <TableHead key={field}>{field}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
                className="border-b"
              >
                {mappedFields.map((targetField) => {
                  const sourceField = Object.entries(mappings).find(
                    ([_, target]) => target === targetField
                  )?.[0];
                  return (
                    <TableCell key={targetField}>
                      {sourceField ? row[sourceField] : ""}
                    </TableCell>
                  );
                })}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      {data.length > previewLimit && (
        <p className="text-sm text-muted-foreground mt-2">
          Showing {previewLimit} of {data.length} rows
        </p>
      )}
    </Card>
  );
};