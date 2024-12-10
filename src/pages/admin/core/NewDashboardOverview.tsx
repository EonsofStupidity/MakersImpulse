import { motion } from "framer-motion";
import { StatsCards } from "@/components/admin/dashboard/stats/StatsCards";
import { ActivitySection } from "@/components/admin/dashboard/activity/ActivitySection";
import { RedisDashboardSection } from "./RedisDashboardSection";
import React from "react";

export const NewDashboardOverview = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };
  
  return (
    <div 
      className="min-h-screen pl-64 pt-32 bg-admin-dark"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(38,199,102,0.1), rgba(199,38,178,0.1), rgba(128,0,255,0.1))`,
          zIndex: 0
        }}
      />
      
      <div className="relative z-10 space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-admin-green via-admin-pink to-admin-purple animate-gradient-flow">
              Dashboard Overview
            </h1>
            <p className="text-white/60 mt-2">
              Manage your platform's content, users, and settings
            </p>
          </div>
        </motion.div>

        <StatsCards />
        <ActivitySection />
        <RedisDashboardSection />
      </div>
    </div>
  );
};

export default NewDashboardOverview;