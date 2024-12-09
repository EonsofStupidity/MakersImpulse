import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Layers,
  GitBranch,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Database,
  FileSpreadsheet,
  BookOpen,
  Activity,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSidebar } from "./AdminSidebarContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SidebarContainer } from "./styles/SidebarContainer";
import { SidebarItem } from "./components/SidebarItem";

export const AdminSidebar = () => {
  const { isCollapsed, toggleCollapse } = useAdminSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      description: 'Overview and analytics'
    },
    { 
      icon: Database, 
      label: 'Data Maestro', 
      path: '/admin/data-maestro',
      description: 'Database management'
    },
    { 
      icon: FileSpreadsheet, 
      label: 'CSV Operations', 
      path: '/admin/data-maestro/csv-operations',
      description: 'Import/Export data'
    },
    { 
      icon: Users, 
      label: 'Users', 
      path: '/admin/users',
      description: 'User management'
    },
    { 
      icon: FileText, 
      label: 'Posts', 
      path: '/admin/posts',
      description: 'Content management'
    },
    { 
      icon: Layers, 
      label: 'Categories', 
      path: '/admin/content-management/categories',
      description: 'Content organization'
    },
    { 
      icon: GitBranch, 
      label: 'Workflows', 
      path: '/admin/content-management/workflows',
      description: 'Process automation'
    },
    { 
      icon: ImageIcon, 
      label: 'Media', 
      path: '/admin/media',
      description: 'Media library'
    },
    { 
      icon: BookOpen, 
      label: 'Templates', 
      path: '/admin/content-management/templates',
      description: 'Content templates'
    },
    { 
      icon: Activity, 
      label: 'Activity', 
      path: '/admin/activity-logs',
      description: 'User activity tracking'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/admin/analytics',
      description: 'Site analytics'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/admin/settings',
      description: 'System configuration'
    }
  ];

  return (
    <SidebarContainer
      isCollapsed={isCollapsed}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full"
        onClick={toggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-white/80" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-white/80" />
        )}
      </Button>

      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            isCollapsed={isCollapsed}
            isHovered={isHovered}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </SidebarContainer>
  );
};
