import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorHighlightProps {
  errors: Array<{
    id: string;
    field: string;
    message: string;
    severity: 'error' | 'warning' | 'info';
    row?: number;
  }>;
  onErrorClick?: (errorId: string) => void;
}

export const ErrorHighlight = ({ errors, onErrorClick }: ErrorHighlightProps) => {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  return (
    <AnimatePresence mode="sync">
      <div className="space-y-2">
        {errors.map((error) => (
          <motion.div
            key={error.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={cn(
                "p-4 cursor-pointer hover:bg-accent/5",
                error.severity === 'error' && 'border-destructive'
              )}
              onClick={() => onErrorClick?.(error.id)}
            >
              <div className="flex items-start gap-3">
                {getIcon(error.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{error.field}</span>
                    {error.row && (
                      <Badge variant="outline">Row {error.row}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {error.message}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};