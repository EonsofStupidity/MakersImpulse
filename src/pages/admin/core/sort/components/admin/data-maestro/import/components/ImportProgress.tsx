import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ImportProgressProps {
  status: string;
  progress: number;
  onRollback?: () => void;
}

export const ImportProgress = ({ status, progress, onRollback }: ImportProgressProps) => {
  if (status === 'processing') {
    return (
      <Alert className="mb-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Processing Import</AlertTitle>
        <AlertDescription>
          Progress: {progress}%
          <Progress value={progress} className="mt-2" />
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Import Failed</AlertTitle>
        <AlertDescription>
          There was an error processing your import.
          {onRollback && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRollback}
              className="mt-2"
            >
              Rollback Import
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};