import React, { useState } from "react";
import { 
  BookOpen, 
  UserCog, 
  Cog,
  MessageSquare, 
  Layers, 
  FileType, 
  GitBranch, 
  Image,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { AdminToolbar } from "./AdminToolbar";
import { NavItemList } from "./nav/NavItemList";
import type { NavItemType } from "./nav/NavItem";

export const AdminNav = () => {
  const [items, setItems] = useState<NavItemType[]>([
    { id: "posts", to: "/admin/posts", icon: BookOpen, label: "Posts" },
    { id: "users", to: "/admin/users", icon: UserCog, label: "Manage Users" },
    { id: "settings", to: "/admin/settings", icon: Cog, label: "Site Settings" },
    { id: "new-post", to: "/admin/content-management/editor", icon: MessageSquare, label: "New Post" },
    { id: "categories", to: "/admin/content-management/categories", icon: Layers, label: "Categories" },
    { id: "templates", to: "/admin/content-management/templates", icon: FileType, label: "Templates" },
    { id: "workflows", to: "/admin/content-management/workflows", icon: GitBranch, label: "Workflows" },
    { id: "media", to: "/admin/media", icon: Image, label: "Media Library" },
    { id: "content-types", to: "/admin/settings/content-types", icon: Settings, label: "Content Types" },
  ]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: NavItemType) => {
    try {
      console.log('Drag start event:', { item });
      
      const iconComponent = item.icon;
      const iconName = iconComponent.name || 'UnknownIcon';
      console.log('Icon name:', iconName);

      const itemData = {
        id: item.id,
        icon: iconName,
        label: item.label
      };

      console.log('Setting drag data:', itemData);
      event.dataTransfer.setData('application/json', JSON.stringify(itemData));
      event.dataTransfer.effectAllowed = 'move';
    } catch (error) {
      console.error('Error in handleDragStart:', error);
      toast.error('Failed to start drag operation');
    }
  };

  return (
    <>
      <nav className="glass mb-8 p-4">
        <NavItemList 
          items={items}
          onReorder={setItems}
          onDragStart={handleDragStart}
        />
      </nav>
      <AdminToolbar />
    </>
  );
};