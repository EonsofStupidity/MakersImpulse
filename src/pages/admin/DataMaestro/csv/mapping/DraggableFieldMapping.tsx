import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Grab, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldMappingItem {
  id: string;
  sourceField: string;
  targetField: string;
  hasError?: boolean;
  errorMessage?: string;
}

interface DraggableFieldMappingProps {
  items: FieldMappingItem[];
  onReorder: (items: FieldMappingItem[]) => void;
}

export const DraggableFieldMapping = ({ items, onReorder }: DraggableFieldMappingProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Reorder.Group 
      axis="y" 
      values={items} 
      onReorder={onReorder}
      className="space-y-2"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          className="cursor-grab active:cursor-grabbing"
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedId(item.id)}
          >
            <Card className={cn(
              "p-4 flex items-center gap-4",
              item.hasError && "border-destructive",
              selectedId === item.id && "ring-2 ring-primary"
            )}>
              <Grab className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.sourceField}</span>
                  <span className="text-muted-foreground">→</span>
                  <span>{item.targetField}</span>
                </div>
                {item.hasError && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{item.errorMessage}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};