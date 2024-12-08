import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface MappingHistoryProps {
  history: Array<{
    sourceField: string;
    targetField: string;
    timestamp: string;
  }>;
  onRestoreMapping: (sourceField: string, targetField: string) => void;
}

export const MappingHistory = ({ history, onRestoreMapping }: MappingHistoryProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4" />
        <h3 className="font-medium">Mapping History</h3>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {history.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{entry.sourceField}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-sm">{entry.targetField}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </Badge>
                <button
                  onClick={() => onRestoreMapping(entry.sourceField, entry.targetField)}
                  className="text-xs text-primary hover:underline"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};