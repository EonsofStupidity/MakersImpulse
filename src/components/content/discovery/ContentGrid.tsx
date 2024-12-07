import React from 'react';
import { motion } from 'framer-motion';
import { GridSkeleton } from '@/components/shared/ui/loading/LoadingStates';

interface ContentGridProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return <GridSkeleton />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {children}
    </motion.div>
  );
};

export default ContentGrid;