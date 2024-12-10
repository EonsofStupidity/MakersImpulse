import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Database, FileSpreadsheet, 
  Users, FileText, Layers, GitBranch, 
  Image, Activity, Settings, Zap, 
  Cpu, Radio, MessageSquare
} from 'lucide-react';

const tabs = {
  main: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'text-[#b0e653]' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users', color: 'text-[#72228c]' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'text-[#4d00b3]' },
    { id: 'performance', label: 'Performance', icon: Zap, path: '/admin/performance', color: 'text-[#b0e653]' },
    { id: 'system', label: 'System Status', icon: Cpu, path: '/admin/system', color: 'text-[#72228c]' },
    { id: 'monitoring', label: 'Monitoring', icon: Radio, path: '/admin/monitoring', color: 'text-[#4d00b3]' },
    { id: 'forum', label: 'Forum Management', icon: MessageSquare, path: '/admin/forum', color: 'text-[#b0e653]' }
  ],
  content: [
    { id: 'posts', label: 'Posts', icon: FileText, path: '/admin/posts' },
    { id: 'content-management', label: 'Content', icon: Layers, path: '/admin/content-management' },
    { id: 'categories', label: 'Categories', icon: GitBranch, path: '/admin/content-management/categories' },
    { id: 'media', label: 'Media', icon: Image, path: '/admin/content-management/media' },
  ],
  system: [
    { id: 'activity', label: 'Activity', icon: Activity, path: '/admin/settings/activity-logs' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
};

export const AdminSidebar = () => {
  const { isOpen } = useAdminSidebar();
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="admin-sidebar"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(176, 230, 83, 0.05), rgba(77, 0, 179, 0.05))`,
      }}
    >
      <div className="flex border-b border-[#b0e653]/10">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors relative z-50",
              "hover:text-[#b0e653] focus:outline-none group",
              "text-white/60"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <div className="absolute inset-0 bg-gradient-to-r from-[#b0e653]/10 to-[#4d00b3]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="p-4 space-y-2">
        {Object.entries(tabs).map(([section, items]) => (
          <div key={section} className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="admin-nav-item group"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', item.id);
                  }}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    item.color || "text-white/70 group-hover:text-[#b0e653]"
                  )} />
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#b0e653] to-[#4d00b3] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <div className="admin-nav-highlight" />
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};