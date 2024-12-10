import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Database, FileSpreadsheet, 
  Users, FileText, Layers, GitBranch, 
  Image, Activity, Settings 
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'content', label: 'Content' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' }
];

const menuItems = {
  dashboard: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: Activity, path: '/admin/analytics' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro' }
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
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

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
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      } as React.CSSProperties}
    >
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors",
              "hover:text-[#26c766] focus:outline-none",
              activeTab === tab.id 
                ? "text-[#c726b2] bg-white/5" 
                : "text-white/60"
            )}
          >
            {tab.label}
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
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg",
                "text-white/70 hover:text-white",
                "hover:bg-white/5 transition-colors duration-200",
                "group relative overflow-hidden"
              )}
            >
              <Icon className="w-5 h-5 text-[#26c766] group-hover:text-[#c726b2] transition-colors" />
              <span className="text-glow">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#26c766]/10 to-[#c726b2]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};