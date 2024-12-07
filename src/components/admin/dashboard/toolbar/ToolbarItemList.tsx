import React from "react";
import { motion } from "framer-motion";
import { ToolbarItem } from "./ToolbarItem";
import { ToolbarDropIndicator } from "./ToolbarDropIndicator";
import { ToolbarItemType, DragEventHandlers } from "./types";

interface ToolbarItemListProps extends DragEventHandlers {
  items: ToolbarItemType[];
  isIconOnly: boolean;
  orientation: 'horizontal' | 'vertical';
  dropTarget: number | null;
  isLocked: boolean;
}

export const ToolbarItemList = ({
  items,
  isIconOnly,
  orientation,
  dropTarget,
  isLocked,
  onDragOver,
  onDragLeave,
  onDrop,
  onReorder
}: ToolbarItemListProps) => {
  return (
    <motion.div 
      className={`relative flex gap-2 p-2 ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      layout
    >
      {items.length > 0 ? (
        items.map((item, index) => (
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
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, index)}
              onReorder={onReorder}
            />
          </React.Fragment>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-50 min-w-[200px] min-h-[100px] flex items-center justify-center"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.background = 'rgba(65, 240, 219, 0.1)';
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.background = '';
          }}
          onDrop={(e) => onDrop(e, 0)}
        >
          <div className="text-white/50 text-sm px-4 py-2 pointer-events-none">
            Drag items here to create shortcuts
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};