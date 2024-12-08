import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyticsLoadingProps {
  title?: string;
  height?: string;
}

export const AnalyticsLoading = ({ title, height = "400px" }: AnalyticsLoadingProps) => {
  return (
    <Card className="p-6">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div 
        className="flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading data...</p>
        </div>
      </div>
    </Card>
  );
};