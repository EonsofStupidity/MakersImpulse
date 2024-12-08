import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ValidationSummaryProps {
  errors: Record<number, string[]>;
  progress: number;
  totalRows: number;
}

export const ValidationSummary = ({ errors, progress, totalRows }: ValidationSummaryProps) => {
  const errorCount = Object.keys(errors).length;
  const errorPercentage = (errorCount / totalRows) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Validation Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {errorCount > 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors Found</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>{errorCount} rows contain errors ({errorPercentage.toFixed(1)}% error rate)</p>
            <ul className="list-disc pl-4 space-y-1">
              {Object.entries(errors).slice(0, 3).map(([rowIndex, rowErrors]) => (
                <li key={rowIndex} className="text-sm">
                  Row {parseInt(rowIndex) + 1}: {rowErrors.join(", ")}
                </li>
              ))}
              {errorCount > 3 && (
                <li className="text-sm">
                  And {errorCount - 3} more rows with errors...
                </li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      ) : progress === 100 ? (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Validation Complete</AlertTitle>
          <AlertDescription>
            All {totalRows} rows have passed validation successfully.
          </AlertDescription>
        </Alert>
      ) : null}
    </motion.div>
  );
};