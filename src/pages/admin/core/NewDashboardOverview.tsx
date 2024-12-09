import { motion } from "framer-motion";
import { StatsCards } from "@/components/admin/dashboard/stats/StatsCards";
import { ActivitySection } from "@/components/admin/dashboard/activity/ActivitySection";
import { CacheManagementSection } from "./CacheManagementSection";

const NewDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple">
          Dashboard Overview
        </h1>
      </div>

      <StatsCards />
      <ActivitySection />
      <CacheManagementSection />
    </div>
  );
};

export default NewDashboardOverview;