import React from "react";
import { motion } from "framer-motion";
import { ToolbarItem } from "./ToolbarItem";
import { ToolbarDropIndicator } from "./ToolbarDropIndicator";
import { ToolbarItemType } from "./types";

interface ToolbarItemListProps {
  items: ToolbarItemType[];
  isIconOnly: boolean;
  orientation: 'horizontal' | 'vertical';
  dropTarget: number | null;
  isLocked: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const ToolbarItemList = ({
  items,
  isIconOnly,
  orientation,
  dropTarget,
  isLocked,
  onDragOver,
  onDrop,
  onReorder
}: ToolbarItemListProps) => {
  return (
    <motion.div 
      className={`relative flex gap-2 p-2 ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      layout
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <ToolbarDropIndicator
            orientation={orientation}
            isActive={dropTarget === index}
            index={index}
            itemCount={items.length}
          />
          <ToolbarItem
            item={item}
            index={index}
            isIconOnly={isIconOnly}
            isLocked={isLocked}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={(e) => onDrop(e, index)}
            onReorder={onReorder}
          />
        </React.Fragment>
      ))}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-white/50 text-sm px-4 py-2"
        >
          Drag items here to create shortcuts
        </motion.div>
      )}
    </motion.div>
  );
};