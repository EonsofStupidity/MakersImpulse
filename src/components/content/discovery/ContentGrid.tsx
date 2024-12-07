import React from 'react';
import { motion } from 'framer-motion';
import { GridSkeleton } from '@/components/shared/ui/loading/LoadingStates';
import { ErrorState } from '@/components/shared/error-handling/ErrorState';
import BlogPostCard from '@/components/content/blog/BlogPostCard';

interface ContentGridProps {
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  children?: React.ReactNode;
  items?: any[];
  type?: 'blog' | 'default';
}

export const ContentGrid: React.FC<ContentGridProps> = ({ 
  isLoading, 
  error,
  onRetry,
  children,
  items,
  type = 'default'
}) => {
  if (isLoading) {
    return <GridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load content"
        message={error.message}
        onRetry={onRetry}
        className="min-h-[400px] flex items-center justify-center p-4"
      />
    );
  }

  if (type === 'blog' && items) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-8 p-6"
      >
        {items.map((post, index) => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            isFeature={index === 0} // First post is featured (81% larger)
          />
        ))}
      </motion.div>
    );
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