import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { defaultNavItems } from './defaultNavItems';

interface AdminNavItemsProps {
  isIconOnly: boolean;
}

export const AdminNavItems = ({ isIconOnly }: AdminNavItemsProps) => {
  return (
    <motion.div 
      className="flex items-center space-x-4"
      layout
    >
      {defaultNavItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={cn(
            "flex items-center px-3 py-1 rounded-lg",
            "text-white/80 hover:text-[#41f0db]",
            "transition-all duration-300",
            "hover:bg-white/5",
            "relative group"
          )}
        >
          <item.icon className="w-4 h-4" />
          {!isIconOnly && (
            <span className="ml-2 text-sm font-medium">{item.label}</span>
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