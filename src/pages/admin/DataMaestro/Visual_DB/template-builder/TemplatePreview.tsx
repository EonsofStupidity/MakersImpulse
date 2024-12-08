import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TemplatePreviewProps {
  sourceData: Record<string, any>[];
  mappings: Record<string, string>;
  validationRules: Record<string, any>;
}

export const TemplatePreview = ({
  sourceData,
  mappings,
  validationRules,
}: TemplatePreviewProps) => {
  const transformedData = sourceData.map(row => {
    const transformed: Record<string, any> = {};
    Object.entries(mappings).forEach(([source, target]) => {
      if (target) {
        transformed[target] = row[source];
      }
    });
    return transformed;
  });

  const targetFields = Array.from(new Set(Object.values(mappings))).filter(Boolean);

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Template Preview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {targetFields.map((field) => (
                <TableHead key={field}>{field}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformedData.map((row, index) => (
              <TableRow key={index}>
                {targetFields.map((field) => (
                  <TableCell key={field}>
                    {row[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};