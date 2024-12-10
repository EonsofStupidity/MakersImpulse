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

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'content', label: 'Content' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' }
];

const menuItems = {
  dashboard: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard', color: 'admin-neon-text-cyan' },
    { id: 'analytics', label: 'Analytics', icon: Activity, path: '/admin/analytics', color: 'admin-neon-text-cyan' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'admin-neon-text-pink' },
    { id: 'performance', label: 'Performance', icon: Zap, path: '/admin/performance', color: 'admin-neon-text-pink' },
    { id: 'system', label: 'System Status', icon: Cpu, path: '/admin/system', color: 'admin-neon-text-cyan' },
    { id: 'monitoring', label: 'Monitoring', icon: Radio, path: '/admin/monitoring', color: 'admin-neon-text-cyan' },
    { id: 'forum', label: 'Forum Management', icon: MessageSquare, path: '/admin/forum', color: 'admin-neon-text-cyan' }
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
      className="admin-sidebar"
      onMouseMove={handleMouseMove}
    >
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors relative z-50",
              "hover:text-[#41f0db] focus:outline-none group",
              activeTab === tab.id 
                ? "admin-neon-text-pink bg-white/5" 
                : "text-white/60"
            )}
          >
            {tab.label}
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#ff0abe]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="p-4 space-y-2">
        {menuItems[activeTab as keyof typeof menuItems].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className="admin-nav-item group"
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                item.color || "text-white/70 group-hover:text-[#41f0db]"
              )} />
              <span className="relative">
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#41f0db] to-[#ff0abe] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>
              <div className="admin-nav-highlight" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
