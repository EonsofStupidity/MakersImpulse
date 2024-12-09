import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AdminNavItems } from './AdminNavItems';
import { IconToggle } from './IconToggle';
import { useNavigationStore } from '@/components/shared/ui/navigation/NavigationState';
import { toast } from 'sonner';

export const AdminTopNav = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIconOnly, setIsIconOnly] = useState(false);
  const { mousePosition } = useNavigationStore();

  useEffect(() => {
    // Simulate dashboard loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast.success('Admin dashboard loaded', {
        description: 'Full navigation menu is now available'
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 z-40 h-12"
      initial={false}
    >
      {/* Gradient Tab */}
      <motion.div
        className={cn(
          "absolute top-0 right-4 h-full",
          "bg-black/20 backdrop-blur-lg border border-white/10 rounded-b-xl",
          "overflow-hidden transition-all duration-500",
          isLoaded ? "w-full max-w-[calc(100%-2rem)]" : "w-12"
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
              className="flex items-center justify-between px-4 h-full"
            >
              <AdminNavItems isIconOnly={isIconOnly} />
              <IconToggle isIconOnly={isIconOnly} onToggle={() => setIsIconOnly(!isIconOnly)} />
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