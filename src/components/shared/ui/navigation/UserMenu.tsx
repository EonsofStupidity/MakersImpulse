import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import { 
  UserCircle, Settings, Activity, 
  LayoutDashboard, LogOut, Database,
  Image, FileText
} from "lucide-react";
import { UserMenuHeader } from "./menu/UserMenuHeader";
import { UserMenuItem } from "./menu/UserMenuItem";

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
      className="fixed md:absolute right-0 mt-2 w-64 rounded-lg bg-[#7E69AB] backdrop-blur-xl border border-white/10 shadow-xl z-[100] 
                 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b 
                 before:from-[#41f0db]/5 before:to-[#8000ff]/5 before:pointer-events-none"
    >
      <UserMenuHeader />
      
      <div className="p-2 space-y-1">
        <UserMenuItem
          icon={UserCircle}
          label="Profile"
          onClick={() => handleNavigation("/profile")}
        />

        <UserMenuItem
          icon={Image}
          label="Media"
          onClick={() => handleNavigation("/media")}
        />

        <UserMenuItem
          icon={Activity}
          label="Activity"
          onClick={() => handleNavigation("/activity")}
        />

        {user?.role === 'admin' && (
          <>
            <div className="h-px bg-white/10 my-2" />
            <UserMenuItem
              icon={LayoutDashboard}
              label="Admin Dashboard"
              onClick={() => handleNavigation("/admin/dashboard")}
            />
            <UserMenuItem
              icon={Database}
              label="Data Maestro"
              onClick={() => handleNavigation("/admin/data-maestro")}
            />
          </>
        )}

        <div className="h-px bg-white/10 my-2" />
        
        <UserMenuItem
          icon={Settings}
          label="Settings"
          onClick={() => handleNavigation("/settings")}
        />

        <UserMenuItem
          icon={LogOut}
          label="Sign Out"
          variant="danger"
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
        />
      </div>
    </div>
  );
};