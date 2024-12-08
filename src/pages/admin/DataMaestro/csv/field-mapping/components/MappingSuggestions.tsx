import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MappingSuggestionsProps {
  sourceField: string;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const MappingSuggestions = ({ sourceField, suggestions, onSelect }: MappingSuggestionsProps) => {
  if (!suggestions?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2"
    >
      <Card className="p-3 bg-muted/50">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">Suggestions</Badge>
          <span className="text-sm text-muted-foreground">for {sourceField}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => onSelect(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};