import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewCellProps {
  value: string;
  isValid: boolean;
  hasError: boolean;
  isEditing: boolean;
  onEdit: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const PreviewCell = ({
  value,
  isValid,
  hasError,
  isEditing,
  onEdit,
  onFocus,
  onBlur
}: PreviewCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "w-full transition-all",
          !isValid ? "border-red-500" : "",
          hasError ? "border-red-500" : "",
          isEditing ? "ring-2 ring-primary" : ""
        )}
      />
      <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};