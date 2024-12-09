import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";
import { adminRoutes } from "@/config/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const AdminNav = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-30">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          y: isLoaded ? 0 : -50 
        }}
        transition={{ 
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-glass backdrop-blur-xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
              background: "linear-gradient(135deg, rgba(65,240,219,0.1), rgba(255,10,190,0.1), rgba(128,0,255,0.1))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-pink/10 to-neon-purple/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent opacity-50" />
          </div>
        </div>
        <div className="relative z-10">
          <AdminNavContainer routes={adminRoutes} />
          <AdminToolbar />
        </div>
      </motion.div>
    </div>
  );
};