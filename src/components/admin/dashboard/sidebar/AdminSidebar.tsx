import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './AdminSidebarContext';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Database, Users, 
  Zap, Cpu, Radio, MessageSquare,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';

const tabs = {
  main: [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin/dashboard', color: 'text-[#41f0db]' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users', color: 'text-[#b0e653]' },
    { id: 'data', label: 'Data Maestro', icon: Database, path: '/admin/data-maestro', color: 'text-[#4d00b3]' },
    { id: 'monitoring', label: 'System Monitor', icon: Radio, path: '/admin/monitoring', color: 'text-[#b0e653]' },
    { id: 'forum', label: 'Forum Management', icon: MessageSquare, path: '/admin/forum', color: 'text-[#41f0db]' }
  ]
};

export const AdminSidebar = () => {
  const { isOpen, setIsOpen } = useAdminSidebar();
  const [isIconOnly, setIsIconOnly] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      className={`admin-sidebar ${isIconOnly ? 'admin-sidebar-collapsed' : 'admin-sidebar-expanded'}`}
      onMouseMove={handleMouseMove}
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                className="admin-sidebar-item"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', item.id);
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`admin-sidebar-item-icon ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                {!isIconOnly && (
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};