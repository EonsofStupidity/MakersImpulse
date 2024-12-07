import React from "react";
import { ToolbarItem } from "./ToolbarItem";
import { ToolbarDropIndicator } from "./ToolbarDropIndicator";
import { ToolbarItemType } from "./types";

interface ToolbarItemListProps {
  items: ToolbarItemType[];
  isIconOnly: boolean;
  orientation: 'horizontal' | 'vertical';
  dropTarget: number | null;
  onDragOver: (event: React.DragEvent<HTMLButtonElement>, index: number) => void;
  onDrop: (event: React.DragEvent<HTMLButtonElement>, index: number) => void;
}

export const ToolbarItemList = ({
  items,
  isIconOnly,
  orientation,
  dropTarget,
  onDragOver,
  onDrop
}: ToolbarItemListProps) => {
  return (
    <div className={`relative flex gap-2 p-2 ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
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
            isIconOnly={isIconOnly}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={(e) => onDrop(e, index)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};