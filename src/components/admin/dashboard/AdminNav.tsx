import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './sidebar/AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export const AdminNav = () => {
  const { shortcuts, addShortcut, removeShortcut } = useAdminSidebar();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-admin-hover');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-admin-hover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-admin-hover');
    const itemId = e.dataTransfer.getData('text/plain');
    if (!shortcuts.includes(itemId)) {
      addShortcut(itemId);
      toast.success(`Added ${itemId} to shortcuts`);
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="admin-nav"
      onMouseMove={handleMouseMove}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(38,199,102,0.15), rgba(199,38,178,0.15))`,
      }}
    >
      <div className="h-full flex items-center px-4 max-w-7xl mx-auto relative z-50">
        <div className="flex-1 flex items-center gap-4">
          {shortcuts.map((shortcut) => (
            <motion.div
              key={shortcut}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <Link
                to={`/admin/${shortcut.toLowerCase()}`}
                className="admin-nav-item"
              >
                {shortcut}
                <div className="admin-nav-highlight" />
              </Link>
              <button
                onClick={() => {
                  removeShortcut(shortcut);
                  toast.success(`Removed ${shortcut} from shortcuts`);
                }}
                className={cn(
                  "absolute -top-2 -right-2 p-1 rounded-full",
                  "bg-white/10 hover:bg-white/20",
                  "opacity-0 group-hover:opacity-100",
                  "transition-all duration-300"
                )}
              >
                <X className="w-3 h-3 text-white/80" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};