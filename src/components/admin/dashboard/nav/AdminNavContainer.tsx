import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminToolbar } from "../AdminToolbar";
import { AdminNavItems } from "./AdminNavItems";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import type { NavItemType } from "./NavItem";

interface AdminNavContainerProps {
  routes: {
    [key: string]: string;
  };
}

export const AdminNavContainer: React.FC<AdminNavContainerProps> = ({ routes }) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [draggedItem, setDraggedItem] = useState<NavItemType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        if (!session?.user?.id) {
          console.log('No session found, redirecting to login');
          toast.error('Please login to access admin dashboard');
          navigate('/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          throw new Error('Error verifying admin access');
        }

        if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
          console.error('User is not an admin:', profile?.role);
          throw new Error('Admin access required');
        }

        console.log('Admin access confirmed for role:', profile.role);
        toast.success(`Welcome back, ${profile.display_name || profile.username || 'Admin'}`);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in admin access check:', error);
        toast.error(error instanceof Error ? error.message : 'Error verifying admin access');
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-neon-cyan" />
      </div>
    );
  }

  return (
    <nav className="fixed top-16 left-0 right-0 z-30">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          y: isLoaded ? 0 : -50 
        }}
        transition={{ 
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-glass backdrop-blur-xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
              background: "linear-gradient(135deg, rgba(65,240,219,0.1), rgba(255,10,190,0.1), rgba(128,0,255,0.1))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-pink/10 to-neon-purple/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent opacity-50" />
          </div>
        </div>
        <div className="relative z-10">
          <AdminNavItems 
            draggedItem={draggedItem}
            setDraggedItem={setDraggedItem}
            className="relative z-10"
          />
          <AdminToolbar />
        </div>
      </motion.div>
    </nav>
  );
};