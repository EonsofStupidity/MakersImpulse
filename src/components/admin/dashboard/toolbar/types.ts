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