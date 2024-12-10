import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    setIsLoaded(true);
    toast.success("Welcome to Admin Dashboard");
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div 
      className={cn(
        "min-h-screen bg-black/95 relative overflow-hidden",
        "after:absolute after:inset-0",
        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(65,240,219,0.1),rgba(255,10,190,0.1),rgba(128,0,255,0.1))]"
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${springX}% ${springY}%, 
            rgba(65,240,219,0.15), 
            rgba(255,10,190,0.15), 
            rgba(128,0,255,0.15)
          )`,
          filter: 'blur(40px)',
        }}
      />
      
      {/* Main content area */}
      <motion.div 
        className="relative z-10 p-8 pt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple animate-gradient-flow">
                Admin Dashboard
              </h1>
              <p className="text-white/60 mt-2">
                Manage your platform's content, users, and settings
              </p>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Content', 'Users', 'Analytics', 'Settings', 'Media', 'Workflows'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group relative overflow-hidden rounded-xl bg-white/5 p-6 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">{item}</h3>
                  <p className="text-white/60">Manage {item.toLowerCase()} settings and configurations</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-pink/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;