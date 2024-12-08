import { TableCell, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUnifiedValidation } from "@/hooks/useUnifiedValidation";
import { cn } from "@/lib/utils";
import { PreviewCell } from "./preview/PreviewCell";
import { ValidationStatus } from "./preview/ValidationStatus";

interface PreviewRowProps {
  row: any;
  index: number;
  errors: string[];
  onEdit: (index: number, key: string, value: string) => void;
  selectedRows: number[];
  onRowSelect: (index: number) => void;
  validationRules?: Record<string, any[]>;
}

export const PreviewRow = ({ 
  row, 
  index, 
  errors, 
  onEdit, 
  selectedRows,
  onRowSelect,
  validationRules 
}: PreviewRowProps) => {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const { validateField } = useUnifiedValidation();

  const validateFieldValue = (field: string, value: string): boolean => {
    if (!validationRules?.[field]) return true;
    const { isValid } = validateField(value, validationRules[field]);
    return isValid;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "relative border-b transition-colors hover:bg-muted/50",
        errors ? "bg-red-50/10" : "",
        selectedRows.includes(index) ? "bg-muted" : ""
      )}
      onClick={() => onRowSelect(index)}
    >
      <TableCell>{index + 1}</TableCell>
      {Object.entries(row).map(([key, value]) => (
        <TableCell key={key} className="relative group">
          <PreviewCell
            value={value as string}
            isValid={validateFieldValue(key, value as string)}
            hasError={errors?.includes(key)}
            isEditing={editingCell === key}
            onEdit={(newValue) => onEdit(index, key, newValue)}
            onFocus={() => setEditingCell(key)}
            onBlur={() => setEditingCell(null)}
          />
        </TableCell>
      ))}
      <TableCell>
        <ValidationStatus errors={errors} />
      </TableCell>
    </motion.tr>
  );
};