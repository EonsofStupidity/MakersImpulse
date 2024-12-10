import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";

interface UserMenuProps {
  onClose?: () => void;
}

export const UserMenu = memo(({ onClose }: UserMenuProps) => {
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
      onClose?.();
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleNavigation = (path: string, label: string) => {
    navigate(path);
    toast.success(`Navigating to ${label}`);
    onClose?.();
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="relative">
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden">
      <div className="bg-black/90 border border-[#41f0db]/30 backdrop-blur-xl p-2 space-y-1">
        {isAdmin && (
          <button
            onClick={() => handleNavigation('/admin/dashboard', 'Admin Dashboard')}
            className="w-full flex items-center px-3 py-2 text-white hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-colors duration-300"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </button>
        )}
        <button
          onClick={() => handleNavigation('/maker-space', 'Maker Space')}
          className="w-full flex items-center px-3 py-2 text-white hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-colors duration-300"
        >
          <User className="mr-2 h-4 w-4" />
          Maker Space
        </button>
        <button
          onClick={() => handleNavigation('/user/settings', 'User Settings')}
          className="w-full flex items-center px-3 py-2 text-white hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-colors duration-300"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-2 text-white hover:text-[#41f0db] hover:bg-white/5 rounded-lg transition-colors duration-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
});

UserMenu.displayName = 'UserMenu';