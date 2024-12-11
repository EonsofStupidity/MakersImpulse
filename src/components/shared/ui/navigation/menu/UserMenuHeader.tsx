import { UserCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export const UserMenuHeader = () => {
  const { user } = useAuthStore();

  return (
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
  );
};