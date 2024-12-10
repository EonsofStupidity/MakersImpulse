import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Database, FileSpreadsheet, 
  Users, FileText, Layers, GitBranch, 
  Image, Activity, Settings, Zap, 
  Cpu, Radio, MessageSquare,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';

const tabs = {
  main: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'text-[#41f0db]' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users', color: 'text-[#b0e653]' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'text-[#4d00b3]' },
    { id: 'performance', label: 'Performance', icon: Zap, path: '/admin/performance', color: 'text-[#41f0db]' },
    { id: 'system', label: 'System Status', icon: Cpu, path: '/admin/system', color: 'text-[#b0e653]' },
    { id: 'monitoring', label: 'Monitoring', icon: Radio, path: '/admin/monitoring', color: 'text-[#4d00b3]' },
    { id: 'forum', label: 'Forum Management', icon: MessageSquare, path: '/admin/forum', color: 'text-[#41f0db]' }
  ],
  content: [
    { id: 'posts', label: 'Posts', icon: FileText, path: '/admin/posts' },
    { id: 'content', label: 'Content', icon: Layers, path: '/admin/content-management' },
    { id: 'categories', label: 'Categories', icon: GitBranch, path: '/admin/categories' },
    { id: 'media', label: 'Media', icon: Image, path: '/admin/media' },
  ],
  system: [
    { id: 'activity', label: 'Activity', icon: Activity, path: '/admin/activity' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
};

export const AdminSidebar = () => {
  const { isOpen, setIsOpen } = useAdminSidebar();
  const [isIconOnly, setIsIconOnly] = useState(false);
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
        "fixed left-0 top-0 bottom-0 w-64 z-40",
        "bg-gradient-to-br from-[#4d00b3]/90 via-[#72228c]/90 to-[#b0e653]/90",
        "backdrop-blur-md border-r border-white/10",
        "overflow-hidden transition-all duration-300",
        isIconOnly ? "w-20" : "w-64"
      )}
      onMouseMove={handleMouseMove}
      style={{
        clipPath: "path('M 0 0 L 240 0 Q 260 150, 240 300 L 0 300 Z')",
        backgroundImage: `
          url('/lovable-uploads/c7b8c00f-2fa0-444c-bd32-62f1d4a4cee7.png'),
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(65, 240, 219, 0.15), 
            rgba(77, 0, 179, 0.15),
            rgba(176, 230, 83, 0.15)
          )
        `,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover'
      }}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsIconOnly(!isIconOnly)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <div className="h-full overflow-y-auto custom-scrollbar">
        {Object.entries(tabs).map(([section, items]) => (
          <div key={section} className="p-4 space-y-2">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="group flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-2 rounded-lg transition-colors duration-300",
                    "bg-white/5 group-hover:bg-white/10",
                    item.color || "text-white/70"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                {!isIconOnly && (
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                )}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#41f0db]/5 to-[#b0e653]/5" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};