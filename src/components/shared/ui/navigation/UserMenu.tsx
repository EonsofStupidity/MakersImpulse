import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AuthSession } from "@/components/auth/types";

interface UserMenuProps {
  session?: AuthSession | null;
}

export const UserMenu = ({ session }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out');
    }
  };

  if (!session) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/login')}
        className="relative group hover:bg-transparent"
      >
        <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
          <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
          <Avatar className="h-8 w-8 border-2 border-white/20 transition-all duration-300 group-hover:border-[#ff0abe]/50">
            <AvatarFallback className="bg-transparent text-white group-hover:text-[#41f0db] transition-colors duration-300">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border border-white/10">
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/settings')}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-white hover:text-[#41f0db] transition-colors duration-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};