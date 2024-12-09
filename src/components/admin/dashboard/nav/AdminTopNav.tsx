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
      const [usersResponse, sessionsResponse, contentResponse] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('active_2fa_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('cms_content').select('*', { count: 'exact', head: true })
      ]);
      
      return {
        users: usersResponse.count || 0,
        sessions: sessionsResponse.count || 0,
        content: contentResponse.count || 0
      };
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast.success('Admin dashboard loaded');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleIconToggle = () => {
    setIsIconOnly(!isIconOnly);
    toast.success(`Switched to ${isIconOnly ? 'full' : 'icon-only'} view`);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      <div className="relative w-full max-w-[1400px] mx-auto px-4">
        <motion.div
          className={cn(
            "relative h-12 bg-black/20 backdrop-blur-lg",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon.cyan/10 before:to-neon.pink/10",
            "after:absolute after:inset-0 after:bg-white/5",
            "overflow-hidden transition-all duration-500"
          )}
          style={{
            clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <AnimatePresence mode="wait">
            {isLoaded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between w-full px-6 h-full"
              >
                <AdminNavItems 
                  isIconOnly={isIconOnly} 
                  className="flex-grow gap-6"
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
      </div>
    </div>
  );
};