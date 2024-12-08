import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ErrorSummaryProps {
  errors: Array<{
    row: number;
    field: string;
    message: string;
    suggestion?: string;
  }>;
  totalRows: number;
  processedRows: number;
}

export const ErrorSummary = ({
  errors,
  totalRows,
  processedRows,
}: ErrorSummaryProps) => {
  const progress = (processedRows / totalRows) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Import Progress</span>
          <span className="text-sm text-muted-foreground">
            {processedRows} / {totalRows} rows
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {errors.length > 0 ? (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Import Errors Found</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="text-sm">
                  Row {error.row} - {error.field}: {error.message}
                  {error.suggestion && (
                    <div className="mt-1 text-xs">
                      Suggestion: {error.suggestion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      ) : processedRows === totalRows ? (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Validation Complete</AlertTitle>
          <AlertDescription>
            All rows have been processed successfully.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};