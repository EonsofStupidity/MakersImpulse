import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { NewDashboardOverview } from "./core/NewDashboardOverview";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  console.log("Admin Dashboard rendering");
  
  return (
    <div className={cn(
      "min-h-screen bg-black/95 relative",
      "after:absolute after:inset-0",
      "after:bg-[radial-gradient(circle_at_50%_50%,rgba(65,240,219,0.1),rgba(255,10,190,0.1),rgba(128,0,255,0.1))]"
    )}>
      <AdminNav />
      <AdminSidebar />
      
      <motion.div 
        className="ml-[250px] pt-20 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <NewDashboardOverview />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;