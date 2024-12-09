import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AdminNavItems } from './AdminNavItems';
import { IconToggle } from './IconToggle';
import { useNavigationStore } from '@/components/shared/ui/navigation/NavigationState';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const AdminTopNav = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIconOnly, setIsIconOnly] = useState(false);
  const { mousePosition } = useNavigationStore();

  const { data: adminMetrics } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async () => {
      const [usersResponse, postsResponse, contentResponse] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('cms_content').select('*', { count: 'exact', head: true })
      ]);
      
      return {
        users: usersResponse.count || 0,
        posts: postsResponse.count || 0,
        content: contentResponse.count || 0
      };
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast.success('Admin dashboard loaded', {
        description: 'Full navigation menu is now available'
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleIconToggle = () => {
    setIsIconOnly(!isIconOnly);
    toast.success(`Switched to ${isIconOnly ? 'full' : 'icon-only'} view`);
  };

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 z-40 h-12"
      initial={false}
    >
      <motion.div
        className={cn(
          "absolute top-0 right-4 h-full",
          "bg-black/20 backdrop-blur-lg border border-white/10 rounded-b-xl",
          "overflow-hidden transition-all duration-500",
          isLoaded ? "w-full max-w-[calc(100%-2rem)]" : "w-12",
          "flex items-center justify-between"
        )}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65, 240, 219, 0.15), rgba(255, 10, 190, 0.15))`,
          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
        }}
      >
        <AnimatePresence mode="wait">
          {isLoaded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full px-4 h-full"
            >
              <AdminNavItems 
                isIconOnly={isIconOnly} 
                className="flex-grow"
              />
              <IconToggle 
                isIconOnly={isIconOnly} 
                onToggle={handleIconToggle}
              />
            </motion.div>
          ) : (
            <motion.div
              className="h-full w-full animate-gradient"
              style={{
                background: 'linear-gradient(-45deg, rgba(65, 240, 219, 0.3), rgba(255, 10, 190, 0.3), rgba(128, 0, 255, 0.3))',
                backgroundSize: '200% 200%'
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};