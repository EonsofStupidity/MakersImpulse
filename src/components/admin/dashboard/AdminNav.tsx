import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './sidebar/AdminSidebarContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export const AdminNav = () => {
  const { shortcuts, removeShortcut } = useAdminSidebar();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-16 left-0 right-0 z-40 h-16 bg-admin-dark",
        "border-b border-white/10"
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(38,199,102,0.15), rgba(199,38,178,0.15))`,
      }}
    >
      <div className="h-full flex items-center px-4 max-w-7xl mx-auto relative z-10">
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
                className={cn(
                  "px-4 py-2 rounded-lg text-white/80",
                  "hover:text-admin-pink transition-colors duration-300",
                  "bg-white/5 hover:bg-white/10",
                  "animate-fade-in"
                )}
              >
                {shortcut}
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