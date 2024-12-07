import React from "react";
import { Reorder } from "framer-motion";
import { NavItem, NavItemType } from "./NavItem";

interface NavItemListProps {
  items: NavItemType[];
  onReorder: (items: NavItemType[]) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, item: NavItemType) => void;
}

export const NavItemList = ({ items, onReorder, onDragStart }: NavItemListProps) => {
  return (
    <Reorder.Group 
      as="div" 
      axis="y" 
      values={items} 
      onReorder={onReorder}
      className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
    >
      {items.map((item) => (
        <NavItem 
          key={item.id}
          item={item}
          onDragStart={onDragStart}
        />
      ))}
    </Reorder.Group>
  );
};