import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";
import { adminRoutes } from "@/config/navigation";

export const AdminNav = () => {
  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-transparent">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl border-b border-white/10" />
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent opacity-50" />
        <AdminNavContainer routes={adminRoutes} />
        <AdminToolbar />
      </div>
    </div>
  );
};