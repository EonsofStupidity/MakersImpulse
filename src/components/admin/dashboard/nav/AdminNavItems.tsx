import React from "react";
import { Navigation } from "lucide-react";
import { toast } from "sonner";
import { NavItemList } from "./NavItemList";
import type { NavItemType } from "./NavItem";
import { defaultNavItems } from "./defaultNavItems";

interface AdminNavItemsProps {
  draggedItem: NavItemType | null;
  setDraggedItem: (item: NavItemType | null) => void;
}

export const AdminNavItems = ({ draggedItem, setDraggedItem }: AdminNavItemsProps) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: NavItemType) => {
    try {
      console.log('Drag start event:', { item });
      setDraggedItem(item);
      
      const iconComponent = item.icon;
      const iconName = iconComponent.displayName || 'UnknownIcon';
      console.log('Icon name:', iconName);

      const itemData = {
        id: item.id,
        icon: iconName,
        label: item.label,
        to: item.to
      };

      console.log('Setting drag data:', itemData);
      event.dataTransfer.setData('application/json', JSON.stringify(itemData));
      event.dataTransfer.effectAllowed = 'move';

      // Create custom drag preview using DOM API
      const dragPreview = document.createElement('div');
      dragPreview.innerHTML = `
        <div style="
          padding: 8px 16px;
          background: rgba(65, 240, 219, 0.2);
          border: 1px solid rgba(65, 240, 219, 0.5);
          border-radius: 8px;
          color: #41f0db;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <span>${item.label}</span>
        </div>
      `;
      document.body.appendChild(dragPreview);
      event.dataTransfer.setDragImage(dragPreview, 0, 0);
      
      // Clean up the preview element after drag starts
      requestAnimationFrame(() => {
        document.body.removeChild(dragPreview);
      });
      
      toast.info('Dragging shortcut...', {
        description: 'Drop in toolbar to place, or outside to delete',
        icon: <Navigation className="h-4 w-4 text-[#41f0db]" />
      });
    } catch (error) {
      console.error('Error in handleDragStart:', error);
      toast.error('Failed to start drag operation');
    }
  };

  const handleDragEnd = () => {
    console.log('Drag operation ended');
    setDraggedItem(null);
  };

  return (
    <NavItemList 
      items={defaultNavItems}
      onReorder={items => {}} // Disabled reordering for now
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};