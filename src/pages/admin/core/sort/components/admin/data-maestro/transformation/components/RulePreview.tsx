import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransformationType } from "@/lib/transformations/types";

interface RulePreviewProps {
  type: TransformationType;
  configuration: {
    conditions: any[];
    actions: any[];
  };
  script?: string;
}

export const RulePreview = ({ type, configuration, script }: RulePreviewProps) => {
  const sampleData = [
    { id: 1, name: "Sample 1", value: "Test Value 1" },
    { id: 2, name: "Sample 2", value: "Test Value 2" },
  ];

  const previewTransformation = (data: any) => {
    try {
      if (type === "custom_script" && script) {
        const transformFn = new Function("data", script);
        return transformFn(data);
      }
      return data;
    } catch (error) {
      console.error("Transformation preview error:", error);
      return data;
    }
  };

  const transformedData = sampleData.map(previewTransformation);

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Transformation Preview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original</TableHead>
              <TableHead>Transformed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((original, index) => (
              <TableRow key={index}>
                <TableCell>
                  <pre className="text-sm">{JSON.stringify(original, null, 2)}</pre>
                </TableCell>
                <TableCell>
                  <pre className="text-sm">{JSON.stringify(transformedData[index], null, 2)}</pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};