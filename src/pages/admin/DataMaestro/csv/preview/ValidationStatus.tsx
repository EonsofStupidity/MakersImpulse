import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ValidationStatusProps {
  errors: string[];
}

export const ValidationStatus = ({ errors }: ValidationStatusProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {errors ? (
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-500">
              <Check className="w-4 h-4 mr-1" />
              Valid
            </Badge>
          )}
        </TooltipTrigger>
        {errors && (
          <TooltipContent>
            <ul className="list-disc pl-4">
              {errors.map((error, i) => (
                <li key={i} className="text-sm">{error}</li>
              ))}
            </ul>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};