import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";
import { adminRoutes } from "@/config/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const AdminNav = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("AdminNav mounting");
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 z-30"
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={{ 
        clipPath: isLoaded ? "polygon(0 0, 100% 0, 98% 100%, 2% 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
    >
      <div className={cn(
        "relative bg-black/20 backdrop-blur-xl h-16",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-neon-cyan/10 before:via-neon-pink/10 before:to-neon-purple/10",
        "after:absolute after:inset-0 after:bg-white/5"
      )}>
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65,240,219,0.1), rgba(255,10,190,0.1), rgba(128,0,255,0.1))`,
            filter: 'blur(40px)',
          }}
        />
        
        <div className="relative z-10">
          <AdminNavContainer routes={adminRoutes} />
          <AdminToolbar />
        </div>
      </div>
    </motion.div>
  );
};