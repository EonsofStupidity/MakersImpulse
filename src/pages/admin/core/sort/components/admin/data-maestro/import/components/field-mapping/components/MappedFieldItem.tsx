import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MappedFieldItemProps {
  sourceField: string;
  targetField: string;
  targetFields: string[];
  onTargetFieldSelect: (sourceField: string, targetField: string) => void;
  gridPosition: { column: number; row: number; span: number; };
  cellSize: number;
  gap: number;
}

export const MappedFieldItem = ({
  sourceField,
  targetField,
  targetFields,
  onTargetFieldSelect,
  gridPosition,
  cellSize,
  gap
}: MappedFieldItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        left: (gridPosition.column - 1) * (cellSize + gap),
        top: (gridPosition.row - 1) * (cellSize + gap),
        width: gridPosition.span * cellSize + (gridPosition.span - 1) * gap
      }}
      className="p-3 bg-card border rounded-md"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{sourceField}</span>
        <span className="text-muted-foreground mx-2">→</span>
        <Select
          value={targetField}
          onValueChange={(value) => onTargetFieldSelect(sourceField, value)}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select target field" />
          </SelectTrigger>
          <SelectContent>
            {targetFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};