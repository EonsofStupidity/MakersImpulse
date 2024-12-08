import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Navigation,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import { AdminToolbar } from "./AdminToolbar";
import { NavItemList } from "./nav/NavItemList";
import type { NavItemType } from "./nav/NavItem";
import { useSession } from "@/components/auth/SessionContext";
import { supabase } from "@/integrations/supabase/client";

export const AdminNav = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [draggedItem, setDraggedItem] = useState<NavItemType | null>(null);
  const [items] = useState<NavItemType[]>([
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

  React.useEffect(() => {
    const checkAdminAccess = async () => {
      if (!session?.user?.id) {
        console.log('No session found, redirecting to login');
        toast.error('Please login to access admin dashboard');
        navigate('/login');
        return;
      }

      try {
        console.log('Checking admin access for user:', session.user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        console.log('Profile check result:', { profile, error });

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Error verifying admin access');
          navigate('/');
          return;
        }

        if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
          console.log('User is not an admin:', profile?.role);
          toast.error('Admin access required');
          navigate('/');
          return;
        }

        console.log('Admin access confirmed for role:', profile.role);
      } catch (error) {
        console.error('Error in admin access check:', error);
        toast.error('Error verifying admin access');
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [session, navigate]);

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

      // Create custom drag image using DOM API
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
    <>
      <nav className={`glass mb-8 p-4 transition-all duration-300 ${draggedItem ? 'opacity-75' : ''}`}>
        <NavItemList 
          items={items}
          onReorder={items => {}} // Disabled reordering for now
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </nav>
      <AdminToolbar />
    </>
  );
};