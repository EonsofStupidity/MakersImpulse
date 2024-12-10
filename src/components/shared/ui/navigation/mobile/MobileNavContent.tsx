import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/auth/AuthProvider';
import { Shield, Home, Wrench, BookOpen, Mail, UserCircle, LogIn, UserPlus, LayoutDashboard, Settings, Users, Activity } from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  to: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

interface MobileNavContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavContent = ({ isOpen, onClose }: MobileNavContentProps) => {
  const navigate = useNavigate();
  const { session, user } = useAuth();

  console.log('MobileNavContent render:', { 
    isAuthenticated: !!session,
    userRole: user?.role,
    isAdmin: user?.role === 'admin'
  });

  const handleNavigation = (to: string) => {
    console.log('Mobile nav: Navigating to:', to);
    onClose();
    navigate(to);
    toast.success(`Navigating to ${to.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  // Admin menu items
  const adminMenuItems: MenuItem[] = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, adminOnly: true },
    { to: "/admin/users", label: "Users", icon: Users, adminOnly: true },
    { to: "/admin/settings", label: "Settings", icon: Settings, adminOnly: true },
    { to: "/admin/activity", label: "Activity", icon: Activity, adminOnly: true },
  ];

  // Base menu items
  const menuItems: MenuItem[] = [
    { to: "/maker-space", label: "Maker Space", icon: Home },
    { to: "/maker-space/builds", label: "Builds", icon: Wrench },
    { to: "/maker-space/guides", label: "Guides", icon: BookOpen },
    { to: "/blog", label: "Blog", icon: Mail },
  ];

  // Auth-related items
  const authItems: MenuItem[] = session ? [
    { to: "/profile", label: "Profile", icon: UserCircle }
  ] : [
    { to: "/login", label: "Sign In", icon: LogIn },
    { to: "/register", label: "Sign Up", icon: UserPlus }
  ];

  // Combine all menu items based on user role
  const allMenuItems = [
    ...(user?.role === 'admin' ? adminMenuItems : []),
    ...menuItems,
    ...authItems
  ];

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { 
          x: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }
        },
        closed: { 
          x: "100%",
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }
        }
      }}
      className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl shadow-lg z-50 md:hidden"
    >
      <motion.nav
        variants={menuVariants}
        className="flex flex-col gap-2 p-6 pt-24"
      >
        {allMenuItems.map((item) => (
          <motion.div 
            key={item.to} 
            variants={menuItemVariants}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.to)}
              className="flex items-center w-full px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors duration-200 hover:bg-white/10 hover:text-[#41f0db] relative group cursor-pointer"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                layoutId={`highlight-${item.to}`}
              />
            </motion.button>
          </motion.div>
        ))}
      </motion.nav>
    </motion.div>
  );
};