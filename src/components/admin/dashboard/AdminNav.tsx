import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";
import { adminRoutes } from "@/config/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GradientBackground } from "./effects/GradientBackground";
import { GlitchEffect } from "./effects/GlitchEffect";

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
        <GlitchEffect isActive={isLoaded}>
          <GradientBackground>
            <div className="relative z-10">
              <AdminNavContainer routes={adminRoutes} />
              <AdminToolbar />
            </div>
          </GradientBackground>
        </GlitchEffect>
      </motion.div>
    </div>
  );
};