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
        "flex items-center gap-4",
        "min-h-[2.5rem]",
        className
      )}
      layout
    >
      {defaultNavItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className="nav-item"
        >
          <item.icon className="w-5 h-5" />
          {!isIconOnly && (
            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
          )}
          <motion.div
            className="nav-item-highlight"
            layoutId={`highlight-${item.id}`}
          />
        </Link>
      ))}
    </motion.div>
  );
};