import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './sidebar/AdminSidebarContext';
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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'admin-neon-text-cyan' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users', color: 'admin-neon-text-pink' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'admin-neon-text-pink' },
    { id: 'performance', label: 'Performance', icon: Zap, path: '/admin/performance', color: 'admin-neon-text-pink' },
    { id: 'system', label: 'System Status', icon: Cpu, path: '/admin/system', color: 'admin-neon-text-cyan' },
    { id: 'monitoring', label: 'Monitoring', icon: Radio, path: '/admin/monitoring', color: 'admin-neon-text-cyan' },
    { id: 'forum', label: 'Forum Management', icon: MessageSquare, path: '/admin/forum', color: 'admin-neon-text-cyan' }
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

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 w-64 bg-black/40 backdrop-blur-xl",
        "border-r border-white/10 pt-20 pb-6 px-4",
        "overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      )}
    >
      <nav className="space-y-6">
        <div>
          <h2 className="px-2 text-lg font-semibold text-white mb-2">Main</h2>
          <div className="space-y-1">
            {tabs.main.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  "text-white/70 hover:text-white hover:bg-white/5",
                  "transition-colors duration-200"
                )}
              >
                <tab.icon className={cn("h-5 w-5", tab.color)} />
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="px-2 text-lg font-semibold text-white mb-2">Content</h2>
          <div className="space-y-1">
            {tabs.content.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  "text-white/70 hover:text-white hover:bg-white/5",
                  "transition-colors duration-200"
                )}
              >
                <tab.icon className="h-5 w-5 text-admin-neon-cyan" />
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="px-2 text-lg font-semibold text-white mb-2">System</h2>
          <div className="space-y-1">
            {tabs.system.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  "text-white/70 hover:text-white hover:bg-white/5",
                  "transition-colors duration-200"
                )}
              >
                <tab.icon className="h-5 w-5 text-admin-neon-pink" />
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};