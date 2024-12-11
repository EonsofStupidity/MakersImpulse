import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { Menu, LogOut, User, Home, Book, Wrench, Settings } from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  to: string;
  label: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

interface MobileNavContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavContent = ({ isOpen, onClose }: MobileNavContentProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  console.log('MobileNavContent: Rendering with user:', user?.email, 'role:', user?.role);

  const handleNavigation = (to: string) => {
    navigate(to);
    onClose();
    toast.success(`Navigating to ${to.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  const menuItems: MenuItem[] = [
    { to: "/", label: "Home", icon: Home },
    { to: "/maker-space", label: "Maker Space", icon: Wrench, requiresAuth: true },
    { to: "/blog", label: "Blog", icon: Book },
    { to: "/profile", label: "Profile", icon: User, requiresAuth: true },
    { to: "/admin/dashboard", label: "Admin Dashboard", icon: Settings, requiresAuth: true, adminOnly: true },
  ];

  const filteredItems = menuItems.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') return false;
    if (item.requiresAuth && !user) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-2"
    >
      {filteredItems.map((item) => (
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
    </motion.div>
  );
};