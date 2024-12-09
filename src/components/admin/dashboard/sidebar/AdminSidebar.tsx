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
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 250 }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)]",
        "bg-gradient-to-b from-black/20 to-black/30",
        "backdrop-blur-xl border-r border-white/10",
        "transition-all duration-300 z-50"
      )}
      style={{
        background: "linear-gradient(135deg, rgba(65,240,219,0.05) 0%, rgba(255,10,190,0.05) 50%, rgba(128,0,255,0.05) 100%)"
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/30"
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
          <motion.button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              toast.success(`Navigating to ${item.label}`);
            }}
            onHoverStart={() => setIsHovered(item.path)}
            onHoverEnd={() => setIsHovered(null)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200 relative group",
              location.pathname === item.path 
                ? "bg-white/10 text-[#41f0db]" 
                : "text-white/80 hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors duration-300",
              location.pathname === item.path && "text-[#41f0db]",
              isHovered === item.path && "text-[#ff0abe]"
            )} />
            
            {!isCollapsed && (
              <span className={cn(
                "text-sm transition-colors duration-300",
                location.pathname === item.path && "text-[#41f0db]",
                isHovered === item.path && "text-[#ff0abe]"
              )}>
                {item.label}
              </span>
            )}

            {(location.pathname === item.path || isHovered === item.path) && (
              <motion.div
                layoutId="sidebar-glow"
                className="absolute inset-0 rounded-lg opacity-20"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{
                  background: "linear-gradient(135deg, #41f0db 0%, #ff0abe 50%, #8000ff 100%)"
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};