import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";

export const UserMenu = memo(() => {
  const navigate = useNavigate();
  const { session, user, signOut, isLoading } = useAuthStore();

  console.log('UserMenu render - Detailed state:', {
    session,
    user,
    userRole: user?.role,
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
    isLoading
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="relative">
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }

  if (!session || !user) {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/login')}
        className="relative text-white hover:text-[#41f0db] transition-colors duration-300"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  const isAdmin = user.role === 'admin' || user.role === 'super_admin';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="relative text-white hover:text-[#41f0db] transition-colors duration-300"
        >
          <User className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-56 bg-black/90 border border-white/10 backdrop-blur-xl"
      >
        {isAdmin && (
          <DropdownMenuItem 
            onClick={() => {
              navigate('/admin/dashboard');
              toast.success('Navigating to Admin Dashboard');
            }}
            className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => {
            navigate('/maker-space');
            toast.success('Navigating to Maker Space');
          }}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
        >
          <User className="mr-2 h-4 w-4" />
          Maker Space
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            navigate('/settings');
            toast.success('Navigating to Settings');
          }}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300 focus:bg-white/10"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut}
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