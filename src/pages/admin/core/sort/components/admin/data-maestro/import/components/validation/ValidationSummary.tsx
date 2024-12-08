import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from "lucide-react";
import { ValidationSummaryProps } from "../../types/parsing";

export const ValidationSummary = ({ errors, progress, totalRows }: ValidationSummaryProps) => {
  const errorCount = Object.keys(errors).length;

  return (
    <div className="space-y-4">
      <Progress value={progress} className="w-full" />
      {errorCount > 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors Found</AlertTitle>
          <AlertDescription>
            {errorCount} rows contain errors. Please fix them before proceeding.
          </AlertDescription>
        </Alert>
      ) : progress === 100 ? (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Validation Complete</AlertTitle>
          <AlertDescription>
            {totalRows ? `All ${totalRows} rows have been validated successfully.` : 'All data has been validated successfully.'}
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};