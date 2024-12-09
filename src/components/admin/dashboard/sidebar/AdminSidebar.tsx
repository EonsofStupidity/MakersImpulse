import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Cog,
  BookOpen,
  Activity,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSidebar } from "./AdminSidebarContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NEON_COLORS = ['#4efc03', '#ebfc03', '#03fcf8', '#d10fcb'];

export const AdminSidebar = () => {
  const { isCollapsed, toggleCollapse } = useAdminSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeColor, setActiveColor] = useState(NEON_COLORS[0]);

  // Fetch actual metrics for the menu items
  const { data: metrics } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async () => {
      const [usersCount, contentCount, activityCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('cms_content').select('*', { count: 'exact', head: true }),
        supabase.from('user_activity').select('*', { count: 'exact', head: true })
      ]);
      
      return {
        users: usersCount.count || 0,
        content: contentCount.count || 0,
        activity: activityCount.count || 0
      };
    }
  });

  // Rotate neon colors
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColor(prev => {
        const currentIndex = NEON_COLORS.indexOf(prev);
        return NEON_COLORS[(currentIndex + 1) % NEON_COLORS.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const handleNavigation = (path: string, label: string) => {
    navigate(path);
    toast.success(`Navigating to ${label}`);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black/20 backdrop-blur-xl border-r border-white/10 z-50",
        "transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(${parseInt(activeColor.slice(1,3), 16)},${parseInt(activeColor.slice(3,5), 16)},${parseInt(activeColor.slice(5,7), 16)},0.1) 100%)`
      }}
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
          <motion.div
            key={item.path}
            className="relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-white/5",
                "transition-all duration-300 relative overflow-hidden",
                isCollapsed && "justify-center p-2",
                location.pathname === item.path && "bg-white/10 text-neon-cyan"
              )}
              onClick={() => handleNavigation(item.path, item.label)}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0",
                "transition-all duration-300",
                isCollapsed ? "mr-0" : "mr-2"
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#ff0abe]/10 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
                }}
              />
            </Button>
            {isCollapsed && (isHovered || location.pathname === item.path) && (
              <div className="absolute left-full top-0 ml-2 p-2 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                <div className="text-sm font-medium text-white whitespace-nowrap">{item.label}</div>
                <div className="text-xs text-white/60">{item.description}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};