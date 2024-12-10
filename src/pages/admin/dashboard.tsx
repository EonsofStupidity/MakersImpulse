import React, { useState, useEffect } from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { NewDashboardOverview } from "./core/NewDashboardOverview";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Dashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Dashboard mounting");
    setIsLoaded(true);
    toast.success("Welcome to Admin Dashboard");
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      className={cn(
        "min-h-screen bg-black/95 relative",
        "after:absolute after:inset-0",
        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(65,240,219,0.1),rgba(255,10,190,0.1),rgba(128,0,255,0.1))]"
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(65,240,219,0.1), rgba(255,10,190,0.1), rgba(128,0,255,0.1))`,
          filter: 'blur(40px)',
        }}
      />
      
      <AdminNav />
      <AdminSidebar />
      
      <motion.div 
        className="ml-[250px] pt-20 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <NewDashboardOverview />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;