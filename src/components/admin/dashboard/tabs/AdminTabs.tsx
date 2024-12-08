import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Database,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminTabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin"
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    path: "/admin/users"
  },
  {
    id: "content",
    label: "Content",
    icon: Database,
    path: "/admin/content-management"
  },
  {
    id: "activity",
    label: "Activity",
    icon: Activity,
    path: "/admin/activity"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings"
  }
];

export const AdminTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative z-50 px-4 pb-4">
      <div className="flex space-x-1 rounded-lg bg-black/20 p-1 backdrop-blur-sm border border-white/10">
        {adminTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={cn(
                "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "text-white" 
                  : "text-white/60 hover:text-white/80"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};