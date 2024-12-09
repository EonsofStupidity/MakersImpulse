import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminToolbar } from "../AdminToolbar";
import { AdminNavItems } from "./AdminNavItems";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
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
  const [draggedItem, setDraggedItem] = useState<NavItemType | null>(null);

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
    <nav className="relative z-20">
      <div className="glass-nav mb-8 p-4 transition-all duration-300 ml-[80px]">
        <AdminNavItems 
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          className="relative z-10"
        />
      </div>
    </nav>
  );
};