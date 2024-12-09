import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { defaultNavItems } from './defaultNavItems';
import type { NavItemType } from './NavItem';

export interface AdminNavItemsProps {
  isIconOnly?: boolean;
  draggedItem?: NavItemType | null;
  setDraggedItem?: (item: NavItemType | null) => void;
  className?: string;
}

export const AdminNavItems = ({ 
  isIconOnly = false, 
  draggedItem, 
  setDraggedItem,
  className 
}: AdminNavItemsProps) => {
  return (
    <motion.div 
      className={cn(
        "flex items-center",
        "min-h-[2.5rem]",
        className
      )}
      layout
    >
      {defaultNavItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg",
            "text-white/80 hover:text-neon-cyan",
            "transition-all duration-300",
            "hover:bg-white/5",
            "relative group",
            isIconOnly ? "w-10" : "min-w-[100px]"
          )}
        >
          <item.icon className="w-5 h-5" />
          {!isIconOnly && (
            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
          )}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(45deg, rgba(65, 240, 219, 0.1), rgba(255, 10, 190, 0.1))',
            }}
            layoutId={`highlight-${item.id}`}
          />
        </Link>
      ))}
    </motion.div>
  );
};