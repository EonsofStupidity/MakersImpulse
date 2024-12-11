import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";
import { LogIn, UserPlus, Home, Wrench, BookOpen, Mail, UserCircle, Settings, FileText, Image, Activity } from "lucide-react";
import { toast } from "sonner";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleClose = () => {
    console.log('Closing mobile menu');
    setIsOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/maker-space", label: "Maker Space", icon: Wrench },
    { to: "/blog", label: "Blog", icon: FileText },
    { to: "/guides", label: "Guides", icon: BookOpen },
    { to: "/contact", label: "Contact", icon: Mail },
    ...(user ? [
      { to: "/profile", label: "Profile", icon: UserCircle },
      { to: "/media", label: "Media", icon: Image },
      { to: "/activity", label: "Activity", icon: Activity },
      { to: "/settings", label: "Settings", icon: Settings }
    ] : [
      { to: "/login", label: "Sign In", icon: LogIn },
      { to: "/register", label: "Sign Up", icon: UserPlus }
    ])
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-[#41f0db] transition-colors"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-black/95 backdrop-blur-xl z-50 p-4"
            >
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => {
                      handleClose();
                      toast.success(`Navigating to ${item.label}`);
                    }}
                    className="flex items-center space-x-2 w-full p-2 text-white/80 hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                {user && (
                  <button
                    onClick={() => {
                      signOut();
                      handleClose();
                      toast.success('Signed out successfully');
                    }}
                    className="flex items-center space-x-2 w-full p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 mt-4 border-t border-white/10 pt-4"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};