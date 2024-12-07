import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  UserCog, 
  Cog,
  MessageSquare, 
  Layers, 
  FileType, 
  GitBranch, 
  Image,
  Settings,
  GripVertical
} from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { AdminToolbar } from "./AdminToolbar";
import { toast } from "sonner";

interface NavItem {
  id: string;
  to: string;
  icon: React.ElementType;
  label: string;
}

export const AdminNav = () => {
  const [items, setItems] = useState<NavItem[]>([
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

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: NavItem) => {
    try {
      console.log('Drag start event:', { item });
      
      // Get the icon component name
      const iconComponent = item.icon as any;
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
        <Reorder.Group 
          as="ul" 
          axis="y" 
          values={items} 
          onReorder={setItems}
          className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
        >
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              as="div"
              className="group/menu-item relative"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
            >
              <Link 
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 opacity-0 group-hover/menu-item:opacity-50 transition-opacity cursor-grab active:cursor-grabbing" />
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </Link>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </nav>
      <AdminToolbar />
    </>
  );
};