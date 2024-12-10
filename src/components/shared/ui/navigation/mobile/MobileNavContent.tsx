import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/lib/auth/AuthContext';
import { Home, Wrench, BookOpen, Mail, UserCircle, LogIn, UserPlus, LayoutDashboard, Settings } from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface MobileNavContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavContent = ({ isOpen, onClose }: MobileNavContentProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  console.log('MobileNavContent: Rendering with user:', user?.email, 'role:', user?.role);

  const handleNavigation = (to: string) => {
    navigate(to);
    onClose(); // Close mobile menu after navigation
    toast.success(`Navigating to ${to.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  // Base menu items - always show these
  const baseItems: MenuItem[] = [
    { to: "/", label: "Home", icon: Home },
    { to: "/maker-space", label: "Maker Space", icon: Wrench },
    { to: "/guides", label: "Guides", icon: BookOpen },
    { to: "/contact", label: "Contact", icon: Mail }
  ];

  // Auth menu items - show different items based on auth status
  const authItems: MenuItem[] = user ? [
    { to: "/profile", label: "Profile", icon: UserCircle }
  ] : [
    { to: "/login", label: "Sign In", icon: LogIn },
    { to: "/register", label: "Sign Up", icon: UserPlus }
  ];

  // Admin menu items - only include if user has admin role
  const adminItems: MenuItem[] = user?.role === 'admin' ? [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/settings", label: "Settings", icon: Settings }
  ] : [];

  // Combine all menu items based on user role
  const menuItems = [...baseItems, ...authItems, ...adminItems];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-x-0 top-[64px] p-4 bg-black/95 backdrop-blur-lg border-b border-white/10"
    >
      <nav className="grid gap-2">
        {menuItems.map((item) => (
          <button
            key={item.to}
            onClick={() => handleNavigation(item.to)}
            className="flex items-center gap-2 w-full p-2 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
        {user && (
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="flex items-center gap-2 w-full p-2 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors mt-4 border-t border-white/10 pt-4"
          >
            <LogIn className="h-5 w-5" />
            Sign Out
          </button>
        )}
      </nav>
    </motion.div>
  );
};