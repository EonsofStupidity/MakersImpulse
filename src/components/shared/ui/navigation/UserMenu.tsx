import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import { 
  UserCircle, Settings, Activity, 
  LayoutDashboard, LogOut, Database,
  Image, FileText
} from "lucide-react";

export const UserMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
    toast.success(`Navigating to ${path.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  return (
    <div 
      className="absolute right-0 mt-2 w-64 rounded-lg bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl z-50 
                 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b 
                 before:from-[#41f0db]/5 before:to-[#8000ff]/5 before:pointer-events-none"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <UserCircle className="w-10 h-10 text-[#41f0db]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.email}
            </p>
            <p className="text-xs text-white/60">
              {user?.role?.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-2 space-y-1">
        <button
          onClick={() => handleNavigation("/profile")}
          className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                     hover:bg-white/5 rounded-lg transition-all duration-300 group relative overflow-hidden"
        >
          <UserCircle className="w-4 h-4" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => handleNavigation("/media")}
          className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                     hover:bg-white/5 rounded-lg transition-all duration-300 group"
        >
          <Image className="w-4 h-4" />
          <span>Media</span>
        </button>

        <button
          onClick={() => handleNavigation("/activity")}
          className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                     hover:bg-white/5 rounded-lg transition-all duration-300 group"
        >
          <Activity className="w-4 h-4" />
          <span>Activity</span>
        </button>

        {user?.role === 'admin' && (
          <>
            <div className="h-px bg-white/10 my-2" />
            <button
              onClick={() => handleNavigation("/admin/dashboard")}
              className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                         hover:bg-white/5 rounded-lg transition-all duration-300 group"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation("/admin/data-maestro")}
              className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                         hover:bg-white/5 rounded-lg transition-all duration-300 group"
            >
              <Database className="w-4 h-4" />
              <span>Data Maestro</span>
            </button>
          </>
        )}

        <div className="h-px bg-white/10 my-2" />
        
        <button
          onClick={() => handleNavigation("/settings")}
          className="flex items-center space-x-2 w-full p-2 text-sm text-left text-white/80 hover:text-[#41f0db] 
                     hover:bg-white/5 rounded-lg transition-all duration-300 group"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        <button
          onClick={async () => {
            try {
              await signOut();
              toast.success("Signed out successfully");
              navigate("/");
            } catch (error) {
              console.error("Sign out error:", error);
              toast.error("Failed to sign out");
            } finally {
              onClose();
            }
          }}
          className="flex items-center space-x-2 w-full p-2 text-sm text-left text-red-400 hover:text-red-300 
                     hover:bg-red-500/10 rounded-lg transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};