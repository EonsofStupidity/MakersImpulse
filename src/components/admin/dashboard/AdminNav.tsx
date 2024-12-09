import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";
import { adminRoutes } from "@/config/navigation";
import { motion } from "framer-motion";

export const AdminNav = () => {
  return (
    <div className="fixed top-16 left-0 right-0 z-30">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 via-[#ff0abe]/10 to-[#8000ff]/10 backdrop-blur-xl border-b border-white/10" />
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent opacity-50" />
        <AdminNavContainer routes={adminRoutes} />
        <AdminToolbar />
      </motion.div>
    </div>
  );
};