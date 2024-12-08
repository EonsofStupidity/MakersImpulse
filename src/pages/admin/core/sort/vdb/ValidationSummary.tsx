import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ValidationSummaryProps {
  errorCount: number;
  progress: number;
}

export const ValidationSummary = ({ errorCount, progress }: ValidationSummaryProps) => {
  return (
    <>
      {errorCount > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            {errorCount} rows contain errors. Please fix them before proceeding.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-1">
          Validating rows: {progress}%
        </p>
      </div>
    </>
  );
};