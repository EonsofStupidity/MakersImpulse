import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface EntryListProps {
  entries: any[];
  selectedEntry: string | null;
  onSelectEntry: (id: string) => void;
}

export const EntryList = ({ entries, selectedEntry, onSelectEntry }: EntryListProps) => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-2">
        {entries.map((entry) => (
          <Button
            key={entry.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left h-auto py-3",
              selectedEntry === entry.id && "bg-muted"
            )}
            onClick={() => onSelectEntry(entry.id)}
          >
            <div className="space-y-1">
              <div className="font-medium">{entry.table_name}</div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};