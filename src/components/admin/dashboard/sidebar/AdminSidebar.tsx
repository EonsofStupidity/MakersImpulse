import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Database, FileSpreadsheet, 
  Users, FileText, Layers, GitBranch, 
  Image, Activity, Settings, Zap, 
  Cpu, Radio
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'content', label: 'Content' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' }
];

const menuItems = {
  dashboard: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard', color: 'cyber-yellow' },
    { id: 'analytics', label: 'Analytics', icon: Activity, path: '/admin/analytics', color: 'cyber-green' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'cyber-pink' },
    { id: 'performance', label: 'Performance', icon: Zap, path: '/admin/performance', color: 'cyber-purple' },
    { id: 'system', label: 'System Status', icon: Cpu, path: '/admin/system', color: 'cyber-neon' },
    { id: 'monitoring', label: 'Monitoring', icon: Radio, path: '/admin/monitoring', color: 'cyber-yellow' }
  ],
  content: [
    { id: 'posts', label: 'Posts', icon: FileText, path: '/admin/posts' },
    { id: 'media', label: 'Media', icon: Image, path: '/admin/media' },
    { id: 'categories', label: 'Categories', icon: Layers, path: '/admin/content-management/categories' }
  ],
  users: [
    { id: 'management', label: 'Management', icon: Users, path: '/admin/users' },
    { id: 'roles', label: 'Roles', icon: GitBranch, path: '/admin/settings/roles' },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, path: '/admin/reports' }
  ],
  settings: [
    { id: 'general', label: 'General', icon: Settings, path: '/admin/settings' },
    { id: 'security', label: 'Security', icon: Settings, path: '/admin/settings/security' }
  ]
};

export const AdminSidebar = () => {
  const { isOpen, activeTab, setActiveTab } = useAdminSidebar();
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
      className={cn(
        "fixed left-0 top-16 bottom-0 w-64 z-40",
        "bg-gradient-to-b from-admin-dark via-admin-medium to-admin-light",
        "border-r border-white/10 backdrop-blur-xl",
        "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-5",
        "after:content-[''] after:absolute after:inset-0 after:bg-scratch-overlay after:opacity-[0.02]"
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(135deg, 
          rgba(21,26,36,0.95), 
          rgba(55,56,64,0.95), 
          rgba(92,89,108,0.95)
        )`,
      }}
    >
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors relative z-50",
              "hover:text-cyber-neon focus:outline-none group",
              activeTab === tab.id 
                ? "text-cyber-pink bg-white/5" 
                : "text-white/60"
            )}
          >
            {tab.label}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-yellow/10 to-cyber-pink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="p-4 space-y-2 relative z-50">
        {menuItems[activeTab as keyof typeof menuItems].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg",
                "text-white/70 hover:text-white",
                "hover:bg-white/5 transition-colors duration-200",
                "group relative overflow-hidden"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                `text-${item.color} group-hover:text-cyber-pink`
              )} />
              <span className="relative">
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyber-yellow to-cyber-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-yellow/10 to-cyber-pink/10 opacity-0 group-hover:opacity-100 transition-opacity animate-menu-wave" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
