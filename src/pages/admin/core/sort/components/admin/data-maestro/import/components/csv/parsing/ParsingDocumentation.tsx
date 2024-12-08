import { Card } from "@/components/ui/card";

export const ParsingDocumentation = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-2">CSV Parsing Guide</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>• Files should be in CSV format with consistent delimiters</p>
        <p>• The first row should contain column headers</p>
        <p>• Supported encodings: UTF-8, ASCII, ISO-8859-1, UTF-16</p>
        <p>• Maximum file size: 10MB</p>
      </div>
    </Card>
  );
};