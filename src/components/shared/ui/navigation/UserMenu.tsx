import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../avatar/UserAvatar";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";

export const UserMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { session, signOut } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl z-50">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <UserAvatar size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <button
          onClick={() => handleNavigation("/profile")}
          className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          Profile
        </button>
        <button
          onClick={() => handleNavigation("/settings")}
          className="w-full px-4 py-2 text-sm text-left text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          Settings
        </button>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          {isLoading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};