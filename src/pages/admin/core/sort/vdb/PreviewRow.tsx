import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Edit2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface PreviewRowProps {
  row: any;
  index: number;
  errors: string[];
  onEdit: (index: number, key: string, value: string) => void;
  selectedRows: number[];
  onRowSelect: (index: number) => void;
  validationRules?: Record<string, any>;
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

  const validateField = (field: string, value: string) => {
    const rules = validationRules?.[field];
    if (!rules) return true;

    if (rules.required && !value) return false;

    for (const rule of rules.rules || []) {
      switch (rule.type) {
        case "minLength":
          if (value.length < rule.value) return false;
          break;
        case "maxLength":
          if (value.length > rule.value) return false;
          break;
        case "pattern":
          if (!new RegExp(rule.value).test(value)) return false;
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
          break;
        case "url":
          try {
            new URL(value);
          } catch {
            return false;
          }
          break;
      }
    }
    return true;
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
          <div className="flex items-center gap-2">
            <Input
              value={value as string}
              onChange={(e) => onEdit(index, key, e.target.value)}
              onFocus={() => setEditingCell(key)}
              onBlur={() => setEditingCell(null)}
              className={cn(
                "w-full transition-all",
                !validateField(key, value as string) ? "border-red-500" : "",
                errors?.includes(key) ? "border-red-500" : "",
                editingCell === key ? "ring-2 ring-primary" : ""
              )}
            />
            <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </TableCell>
      ))}
      <TableCell>
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
      </TableCell>
    </motion.tr>
  );
};