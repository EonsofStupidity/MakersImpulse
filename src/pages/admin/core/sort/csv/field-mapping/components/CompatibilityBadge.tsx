import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CompatibilityStatus } from "../types";

interface CompatibilityBadgeProps {
  status: CompatibilityStatus;
}

export const CompatibilityBadge = ({ status }: CompatibilityBadgeProps) => {
  const getStatusConfig = (status: CompatibilityStatus) => {
    switch (status) {
      case 'compatible':
        return { class: 'bg-green-500/10 text-green-500', text: 'Compatible' };
      case 'needs_conversion':
        return { class: 'bg-yellow-500/10 text-yellow-500', text: 'Needs Conversion' };
      case 'incompatible':
        return { class: 'bg-red-500/10 text-red-500', text: 'Incompatible' };
      default:
        return { class: 'bg-muted text-muted-foreground', text: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={cn("ml-2", config.class)}>
      {config.text}
    </Badge>
  );
};