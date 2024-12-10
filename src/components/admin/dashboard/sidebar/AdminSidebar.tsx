import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Users, Settings, FileText, 
  Layers, GitBranch, Image as ImageIcon, 
  ChevronLeft, ChevronRight, Database, 
  FileSpreadsheet, BookOpen, Activity, BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSidebar } from "./AdminSidebarContext";
import { adminRoutes } from "@/config/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: adminRoutes.dashboard },
  { icon: Database, label: 'Data Maestro', path: adminRoutes.dataMaestro },
  { icon: FileSpreadsheet, label: 'CSV Operations', path: `${adminRoutes.dataMaestro}/csv-operations` },
  { icon: Users, label: 'Users', path: adminRoutes.users },
  { icon: FileText, label: 'Posts', path: adminRoutes.posts },
  { icon: Layers, label: 'Categories', path: adminRoutes.categories },
  { icon: GitBranch, label: 'Workflows', path: adminRoutes.workflows },
  { icon: ImageIcon, label: 'Media', path: adminRoutes.media },
  { icon: BookOpen, label: 'Templates', path: adminRoutes.templates },
  { icon: Activity, label: 'Activity', path: adminRoutes.activityLogs },
  { icon: BarChart3, label: 'Analytics', path: adminRoutes.analytics },
  { icon: Settings, label: 'Settings', path: adminRoutes.settings }
];

export const AdminSidebar = () => {
  const { isCollapsed, toggleCollapse } = useAdminSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)]",
        "transition-all duration-300 z-50",
        isCollapsed ? "w-[60px]" : "w-[250px]"
      )}
    >
      <div className="relative h-full">
        {/* Background with curved shape */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(65,240,219,0.1) 0%, rgba(255,10,190,0.1) 50%, rgba(128,0,255,0.1) 100%)",
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255,255,255,0.1)"
          }}
        />
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(65,240,219,0.05) 0%, rgba(255,10,190,0.05) 50%, rgba(128,0,255,0.05) 100%)",
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
            animation: "gradientFlow 15s ease infinite"
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/30 z-50"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-white/80" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-white/80" />
          )}
        </Button>

        <div className="relative z-10 flex flex-col gap-2 p-4 pb-[100px] overflow-hidden">
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
                "flex items-center gap-2 p-2 rounded-lg transition-all duration-300 relative group overflow-hidden",
                location.pathname === item.path 
                  ? "bg-white/10 text-[#41f0db]" 
                  : "text-white/80 hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                location.pathname === item.path && "text-[#41f0db]",
                isHovered === item.path && "text-[#ff0abe]"
              )} />
              
              {!isCollapsed && (
                <span className={cn(
                  "text-sm transition-all duration-300",
                  location.pathname === item.path && "text-[#41f0db]",
                  isHovered === item.path && "text-[#ff0abe]"
                )}>
                  {item.label}
                </span>
              )}

              {/* Hover effect overlay */}
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
      </div>
    </motion.div>
  );
};