import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { Home, Wrench, BookOpen, Mail, UserCircle, LogIn, UserPlus, LayoutDashboard, Settings, FileText, Image, Activity } from "lucide-react";
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
  const { user, signOut } = useAuthStore();

  console.log('MobileNavContent: Rendering with user:', user?.email, 'role:', user?.role);

  const handleNavigation = (to: string) => {
    navigate(to);
    onClose();
    toast.success(`Navigating to ${to.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  const baseItems: MenuItem[] = [
    { to: "/", label: "Home", icon: Home },
    { to: "/maker-space", label: "Maker Space", icon: Wrench },
    { to: "/blog", label: "Blog", icon: FileText },
    { to: "/guides", label: "Guides", icon: BookOpen },
    { to: "/contact", label: "Contact", icon: Mail }
  ];

  const authItems: MenuItem[] = user ? [
    { to: "/profile", label: "Profile", icon: UserCircle },
    { to: "/media", label: "Media", icon: Image },
    { to: "/activity", label: "Activity", icon: Activity }
  ] : [
    { to: "/login", label: "Sign In", icon: LogIn },
    { to: "/register", label: "Sign Up", icon: UserPlus }
  ];

  const adminItems: MenuItem[] = user?.role === 'admin' ? [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/settings", label: "Settings", icon: Settings }
  ] : [];

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
            className="flex items-center gap-2 w-full p-2 text-left text-white/80 hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-all duration-300 group relative overflow-hidden"
          >
            <item.icon className="h-5 w-5 transition-colors duration-300 group-hover:text-[#41f0db]" />
            <span className="relative z-10">{item.label}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/5 to-[#8000ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
        {user && (
          <button
            onClick={() => {
              signOut();
              onClose();
              toast.success('Signed out successfully');
            }}
            className="flex items-center gap-2 w-full p-2 text-left text-white/80 hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-all duration-300 group relative overflow-hidden mt-4 border-t border-white/10 pt-4"
          >
            <LogIn className="h-5 w-5 transition-colors duration-300 group-hover:text-[#41f0db]" />
            <span className="relative z-10">Sign Out</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/5 to-[#8000ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        )}
      </nav>
    </motion.div>
  );
};