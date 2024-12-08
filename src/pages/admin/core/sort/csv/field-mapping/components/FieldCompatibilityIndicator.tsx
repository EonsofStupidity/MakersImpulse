import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { CompatibilityStatus } from "../types";

interface FieldCompatibilityIndicatorProps {
  status: CompatibilityStatus;
}

export const FieldCompatibilityIndicator = ({ status }: FieldCompatibilityIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'compatible':
        return {
          icon: CheckCircle2,
          variant: 'default' as const,
          message: 'Fields are compatible'
        };
      case 'needs_conversion':
        return {
          icon: AlertTriangle,
          variant: 'secondary' as const,
          message: 'Type conversion required'
        };
      case 'incompatible':
        return {
          icon: AlertCircle,
          variant: 'destructive' as const,
          message: 'Fields are incompatible'
        };
      default:
        return {
          icon: AlertCircle,
          variant: 'secondary' as const,
          message: 'Unknown compatibility'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={config.variant} className="ml-2">
          <Icon className="w-4 h-4 mr-1" />
          {status}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.message}</p>
      </TooltipContent>
    </Tooltip>
  );
};