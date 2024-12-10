import { useNavigate } from "react-router-dom";
import { UserRound, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { memo } from "react";
import { supabase } from "@/integrations/supabase/client";

export const UserMenu = memo(() => {
  const navigate = useNavigate();
  const { session, user, isLoading } = useAuth();

  console.log('UserMenu render - Detailed state:', { 
    session,
    user,
    userRole: user?.role,
    isAdmin: user?.role === 'admin',
    isLoading,
    sessionUser: session?.user,
    sessionRole: session?.user?.role
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out');
    }
  };

  const handleNavigation = (path: string) => {
    console.log('UserMenu: Navigating to:', path);
    navigate(path);
    toast.success(`Navigating to ${path.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
        <Avatar className="h-8 w-8 border-2 border-white/20">
          <AvatarFallback className="bg-transparent">
            <UserRound className="h-4 w-4 animate-pulse" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (!session) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleNavigation('/login')}
        className="relative group hover:bg-transparent z-50"
      >
        <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
          <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
            <UserRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const userInitial = session.user.email?.[0]?.toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative group hover:bg-transparent z-50 cursor-pointer"
        >
          <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
            <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-black/95 backdrop-blur-xl border border-white/10 mt-2"
      >
        {user?.role === 'admin' && (
          <DropdownMenuItem 
            onClick={() => handleNavigation('/admin/dashboard')}
            className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => handleNavigation('/profile')}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
        >
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleNavigation('/settings')}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserMenu.displayName = 'UserMenu';