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
    e.currentTarget.classList.add('bg-[#41f0db]/5');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-[#41f0db]/5');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-[#41f0db]/5');
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
      className="fixed top-[3.7rem] left-0 right-0 h-16 z-40 backdrop-blur-xl border-b border-[#41f0db]/10"
      onMouseMove={handleMouseMove}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.1), rgba(255, 10, 190, 0.1))`,
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/80 hover:text-[#41f0db] transition-all duration-300 relative group"
              >
                {shortcut}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#41f0db]/5" />
              </Link>
              <button
                onClick={() => {
                  removeShortcut(shortcut);
                  toast.success(`Removed ${shortcut} from shortcuts`);
                }}
                className={cn(
                  "absolute -top-2 -right-2 p-1 rounded-full",
                  "bg-black/20 hover:bg-black/40 backdrop-blur-sm",
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