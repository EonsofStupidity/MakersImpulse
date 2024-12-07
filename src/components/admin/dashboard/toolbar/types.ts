import { LucideIcon } from "lucide-react";

export interface ToolbarItemType {
  id: string;
  icon: string | LucideIcon;
  label: string;
}

export interface DraggedItemData {
  id: string;
  icon: string;
  label: string;
}

export interface DragEventHandlers {
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export interface ToolbarItemProps {
  item: ToolbarItemType;
  index: number;
  isIconOnly: boolean;
  isLocked: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}