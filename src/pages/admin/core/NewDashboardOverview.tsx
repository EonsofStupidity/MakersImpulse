import { motion } from "framer-motion";
import { StatsCards } from "@/components/admin/dashboard/stats/StatsCards";
import { ActivitySection } from "@/components/admin/dashboard/activity/ActivitySection";
import { RedisDashboardSection } from "./RedisDashboardSection";

export const NewDashboardOverview = () => {
  console.log("NewDashboardOverview rendering");
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple">
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
  );
};

export default NewDashboardOverview;