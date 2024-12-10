import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Settings, User, Activity, BookOpen, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";
import { motion } from "framer-motion";

interface UserMenuProps {
  onClose?: () => void;
}

export const UserMenu = memo(({ onClose }: UserMenuProps) => {
  const navigate = useNavigate();
  const { session, user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
      onClose?.();
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleNavigation = (path: string, label: string) => {
    navigate(path);
    toast.success(`Navigating to ${label}`);
    onClose?.();
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        duration: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
    >
      <div className="bg-black/90 border border-[#41f0db]/30 backdrop-blur-xl p-2 space-y-1">
        {isAdmin && (
          <motion.button
            custom={0}
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigation('/admin/dashboard', 'Admin Dashboard')}
            className="w-full flex items-center px-4 py-3 text-white hover:text-[#41f0db] rounded-lg transition-colors duration-300 group relative overflow-hidden"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span className="font-medium">Admin Dashboard</span>
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10" />
              <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
            </div>
          </motion.button>
        )}

        <motion.button
          custom={1}
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/maker-space', 'Maker Space')}
          className="w-full flex items-center px-4 py-3 text-white hover:text-[#41f0db] rounded-lg transition-colors duration-300 group relative overflow-hidden"
        >
          <Wrench className="mr-3 h-5 w-5" />
          <span className="font-medium">Maker Space</span>
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10" />
            <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
          </div>
        </motion.button>

        <motion.button
          custom={2}
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/guides', 'Guides')}
          className="w-full flex items-center px-4 py-3 text-white hover:text-[#41f0db] rounded-lg transition-colors duration-300 group relative overflow-hidden"
        >
          <BookOpen className="mr-3 h-5 w-5" />
          <span className="font-medium">Guides</span>
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10" />
            <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
          </div>
        </motion.button>

        <motion.button
          custom={3}
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/activity', 'Activity')}
          className="w-full flex items-center px-4 py-3 text-white hover:text-[#41f0db] rounded-lg transition-colors duration-300 group relative overflow-hidden"
        >
          <Activity className="mr-3 h-5 w-5" />
          <span className="font-medium">Activity</span>
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10" />
            <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
          </div>
        </motion.button>

        <motion.button
          custom={4}
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/settings', 'Settings')}
          className="w-full flex items-center px-4 py-3 text-white hover:text-[#41f0db] rounded-lg transition-colors duration-300 group relative overflow-hidden"
        >
          <Settings className="mr-3 h-5 w-5" />
          <span className="font-medium">Settings</span>
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10" />
            <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
          </div>
        </motion.button>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />

        <motion.button
          custom={5}
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="w-full flex items-center px-4 py-3 text-white hover:text-[#ff0abe] rounded-lg transition-colors duration-300 group relative overflow-hidden"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Sign Out</span>
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff0abe]/10 to-[#8000ff]/10" />
            <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
});

UserMenu.displayName = 'UserMenu';