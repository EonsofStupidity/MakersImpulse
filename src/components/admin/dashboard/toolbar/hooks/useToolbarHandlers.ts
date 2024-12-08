import { useState, useCallback } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ToolbarItem } from "../types";

interface UseToolbarHandlersProps {
  items: ToolbarItem[];
  onItemsChange: (items: ToolbarItem[]) => void;
  isLocked?: boolean;
}

export const useToolbarHandlers = ({
  items,
  onItemsChange,
  isLocked = false,
}: UseToolbarHandlersProps) => {
  const [draggedItem, setDraggedItem] = useState<ToolbarItem | null>(null);

  const handleDragStart = useCallback((item: ToolbarItem) => {
    setDraggedItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const handleDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;

      const updatedItems = items.map((item) =>
        item.id === targetId ? { ...draggedItem, id: targetId } : item
      );

      onItemsChange(updatedItems);
      setDraggedItem(null);

      toast.success("Shortcut added to toolbar", {
        description: `${draggedItem.label} has been added`,
        icon: () => <CheckCircle2 className="h-4 w-4 text-green-500" />, // Function wrapping JSX
      });
    },
    [draggedItem, items, onItemsChange]
  );

  const handleItemClick = useCallback(
    (itemId: string) => {
      if (isLocked) {
        toast.error("Toolbar is locked. Unlock to modify.");
        return;
      }
      toast.info(`Item ${itemId} clicked`);
    },
    [isLocked]
  );

  return {
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleItemClick,
  };
};
