import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  error?: string;
  totalRows: number;
  processedRows: number;
}

export const ProcessingStatus = ({
  isProcessing,
  progress,
  error,
  totalRows,
  processedRows
}: ProcessingStatusProps) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Processing Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isProcessing) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Processing file...</span>
          <span>{processedRows} of {totalRows} rows</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  }

  if (processedRows === totalRows && totalRows > 0) {
    return (
      <Alert className="bg-green-500/10 border-green-500/20">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Processing Complete</AlertTitle>
        <AlertDescription>
          Successfully processed {processedRows} rows
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};