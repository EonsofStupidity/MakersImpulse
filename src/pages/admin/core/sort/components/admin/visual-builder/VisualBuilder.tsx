import { UnifiedDataImport } from "./UnifiedDataImport";
import { Card } from "@/components/ui/card";

export const VisualBuilder = () => {
  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <UnifiedDataImport />
      </Card>
    </div>
  );
};

export default VisualBuilder;