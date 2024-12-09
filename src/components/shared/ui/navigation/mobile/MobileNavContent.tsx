import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSession } from "@/components/auth/SessionContext";
import { Shield, Home, Wrench, BookOpen, Mail, UserCircle, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  to: string;
  label: string;
  icon: LucideIcon;
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
  const { session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user?.id) {
        console.log('Checking admin status for user:', session.user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        const hasAdminRole = profile?.role === 'admin' || profile?.role === 'super_admin';
        console.log('User role:', profile?.role, 'Is admin:', hasAdminRole);
        setIsAdmin(hasAdminRole);
      }
    };

    checkAdminStatus();
  }, [session]);

  // Auth-related items - always show these at the top for easy access
  const authItems: MenuItem[] = session ? [
    { to: "/profile", label: "Profile", icon: UserCircle }
  ] : [
    { to: "/login", label: "Sign In", icon: LogIn },
    { to: "/register", label: "Sign Up", icon: UserPlus }
  ];

  // Base menu items
  const baseMenuItems: MenuItem[] = [
    { to: "/maker-space", label: "Maker Space", icon: Home },
    { to: "/maker-space/builds", label: "Builds", icon: Wrench },
    { to: "/maker-space/guides", label: "Guides", icon: BookOpen },
    { to: "/maker-space/parts", label: "Parts", icon: Wrench },
    { to: "/blog", label: "Blog", icon: Mail },
  ];

  // Admin items
  const adminItems: MenuItem[] = isAdmin ? [
    { to: "/admin", label: "Admin Dashboard", icon: Shield }
  ] : [];

  // Combine all menu items - put auth items first for better visibility
  const menuItems = [...authItems, ...baseMenuItems, ...adminItems];

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { 
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        closed: { 
          x: "100%",
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
      }}
      className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl shadow-lg z-50 md:hidden"
    >
      <motion.nav
        variants={menuVariants}
        className="flex flex-col gap-2 p-6 pt-24"
      >
        {menuItems.map((item) => (
          <motion.div key={item.to} variants={menuItemVariants}>
            <Link
              to={item.to}
              onClick={onClose}
              className="flex items-center w-full px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors duration-200 hover:bg-white/10 hover:text-[#41f0db] relative group"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                layoutId={`highlight-${item.to}`}
              />
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </motion.div>
  );
};