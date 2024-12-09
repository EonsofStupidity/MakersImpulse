import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, UserCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthSession } from '@/components/auth/types';
import { useQuery } from "@tanstack/react-query";

interface UserMenuProps {
  session: AuthSession | null;
}

export const UserMenu = ({ session }: UserMenuProps) => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id
  });

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
  console.log('UserMenu - Profile role:', profile?.role, 'Is admin:', isAdmin);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Error logging out");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
          <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
            <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border border-white/10">
        {!session ? (
          <>
            <DropdownMenuItem 
              onClick={() => navigate('/login')}
              className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
            >
              <User className="mr-2 h-4 w-4" />
              Sign In
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              onClick={() => navigate('/profile')}
              className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            {isAdmin && (
              <DropdownMenuItem 
                onClick={() => navigate('/admin')}
                className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Dashboard
              </DropdownMenuItem>
            )}

            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer w-full text-white hover:text-[#41f0db] transition-colors duration-300 font-medium"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};