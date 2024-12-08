import { useState, useCallback } from 'react';
import { ToolbarItem, ToolbarItemType } from '../types';

interface UseToolbarHandlersProps {
  items: ToolbarItem[];
  onItemsChange: (items: ToolbarItem[]) => void;
}

export const useToolbarHandlers = ({ items, onItemsChange }: UseToolbarHandlersProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<ToolbarItem | null>(null);

  const handleDragStart = useCallback((item: ToolbarItem) => {
    setDraggedItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const handleDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;

    const updatedItems = items.map(item => {
      if (item.id === targetId) {
        return { ...draggedItem, id: targetId };
      }
      return item;
    });

    onItemsChange(updatedItems);
    setDraggedItem(null);
  }, [draggedItem, items, onItemsChange]);

  const handleItemClick = useCallback((itemId: string) => {
    setActiveItem(itemId === activeItem ? null : itemId);
  }, [activeItem]);

  const handleItemUpdate = useCallback((itemId: string, updates: Partial<ToolbarItem>) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    );
    onItemsChange(updatedItems);
  }, [items, onItemsChange]);

  return {
    activeItem,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleItemClick,
    handleItemUpdate
  };
};