import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon, GripVertical } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { toast } from "sonner";

export interface NavItemType {
  id: string;
  to: string;
  icon: LucideIcon;
  label: string;
}

interface NavItemProps {
  item: NavItemType;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, item: NavItemType) => void;
}

export const NavItem = ({ item, onDragStart }: NavItemProps) => {
  const dragControls = useDragControls();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    try {
      console.log('NavItem drag start:', { item });
      onDragStart(event, item);
    } catch (error) {
      console.error('Error in NavItem drag start:', error);
      toast.error('Failed to start drag operation');
    }
  };

  return (
    <Reorder.Item
      key={item.id}
      value={item}
      dragListener={false}
      dragControls={dragControls}
      className="group/menu-item relative"
    >
      <div 
        draggable="true"
        onDragStart={handleDragStart}
      >
        <Link 
          to={item.to}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <GripVertical 
              className="w-4 h-4 opacity-0 group-hover/menu-item:opacity-50 transition-opacity cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            />
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </div>
        </Link>
      </div>
    </Reorder.Item>
  );
};