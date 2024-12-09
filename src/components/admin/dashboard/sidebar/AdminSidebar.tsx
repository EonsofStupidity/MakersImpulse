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
import { adminRoutes } from "@/config/navigation";

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: adminRoutes.dashboard,
    description: 'Overview and analytics'
  },
  { 
    icon: Database, 
    label: 'Data Maestro', 
    path: adminRoutes.dataMaestro,
    description: 'Database management'
  },
  { 
    icon: FileSpreadsheet, 
    label: 'CSV Operations', 
    path: `${adminRoutes.dataMaestro}/csv-operations`,
    description: 'Import/Export data'
  },
  { 
    icon: Users, 
    label: 'Users', 
    path: adminRoutes.users,
    description: 'User management'
  },
  { 
    icon: FileText, 
    label: 'Posts', 
    path: adminRoutes.posts,
    description: 'Content management'
  },
  { 
    icon: Layers, 
    label: 'Categories', 
    path: adminRoutes.categories,
    description: 'Content organization'
  },
  { 
    icon: GitBranch, 
    label: 'Workflows', 
    path: adminRoutes.workflows,
    description: 'Process automation'
  },
  { 
    icon: ImageIcon, 
    label: 'Media', 
    path: adminRoutes.media,
    description: 'Media library'
  },
  { 
    icon: BookOpen, 
    label: 'Templates', 
    path: adminRoutes.templates,
    description: 'Content templates'
  },
  { 
    icon: Activity, 
    label: 'Activity', 
    path: adminRoutes.activityLogs,
    description: 'User activity tracking'
  },
  { 
    icon: BarChart3, 
    label: 'Analytics', 
    path: adminRoutes.analytics,
    description: 'Site analytics'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: adminRoutes.settings,
    description: 'System configuration'
  }
];

export const AdminSidebar = () => {
  const { isCollapsed, toggleCollapse } = useAdminSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 250 }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black/20 backdrop-blur-lg border-r border-white/10 transition-all duration-300"
      )}
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

      <div className="flex flex-col gap-2 p-4 pb-[100px]">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
              location.pathname === item.path ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};