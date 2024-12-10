import React from 'react';
import { motion } from 'framer-motion';
import { useAdminSidebar } from './sidebar/AdminSidebarContext';
import { cn } from '@/lib/utils';

export const AdminNav = () => {
  const { shortcuts } = useAdminSidebar();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16",
        "bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-emerald-500/10",
        "backdrop-blur-md border-b border-white/10"
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139,92,246,0.15), rgba(236,72,153,0.15), rgba(16,185,129,0.15))`,
      }}
    >
      <div className="h-full flex items-center px-4">
        <div className="flex-1">
          {/* Shortcuts will be rendered here */}
        </div>
      </div>
    </motion.div>
  );
};