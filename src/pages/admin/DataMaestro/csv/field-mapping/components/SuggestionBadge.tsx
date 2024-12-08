import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SuggestionBadgeProps {
  suggestions: string[];
}

export const SuggestionBadge = ({ suggestions }: SuggestionBadgeProps) => {
  if (!suggestions?.length) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className="ml-auto cursor-help">
          {suggestions.length} suggestions
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-medium">Suggested mappings:</p>
          {suggestions.map((suggestion, index) => (
            <p key={index} className="text-sm">{suggestion}</p>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};