import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/components/auth/SessionContext";
import { Shield, Home, Wrench, BookOpen, Mail, UserCircle, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
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
  const navigate = useNavigate();
  const { session } = useSession();

  const handleNavigation = (to: string) => {
    console.log('Mobile nav: Navigating to:', to);
    onClose();
    navigate(to);
    toast.success(`Navigating to ${to.replace('/', '').toUpperCase()}`);
  };

  // Base menu items
  const menuItems: MenuItem[] = [
    { to: "/maker-space", label: "Maker Space", icon: Home },
    { to: "/maker-space/builds", label: "Builds", icon: Wrench },
    { to: "/maker-space/guides", label: "Guides", icon: BookOpen },
    { to: "/maker-space/parts", label: "Parts", icon: Wrench },
    { to: "/blog", label: "Blog", icon: Mail },
  ];

  // Auth-related items
  const authItems: MenuItem[] = session ? [
    { to: "/profile", label: "Profile", icon: UserCircle }
  ] : [
    { to: "/login", label: "Sign In", icon: LogIn },
    { to: "/register", label: "Sign Up", icon: UserPlus }
  ];

  // Admin items if user has admin role
  const adminItems: MenuItem[] = session?.user?.role === 'admin' ? [
    { to: "/admin", label: "Admin Dashboard", icon: Shield }
  ] : [];

  // Combine all menu items
  const allMenuItems = [...authItems, ...menuItems, ...adminItems];

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
        {allMenuItems.map((item) => (
          <motion.div key={item.to} variants={menuItemVariants}>
            <div
              onClick={() => handleNavigation(item.to)}
              className="flex items-center w-full px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors duration-200 hover:bg-white/10 hover:text-[#41f0db] relative group cursor-pointer"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                layoutId={`highlight-${item.to}`}
              />
            </div>
          </motion.div>
        ))}
      </motion.nav>
    </motion.div>
  );
};