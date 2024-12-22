import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { ThemeSettingsForm } from "@/components/admin/theme/ThemeSettingsForm";
import { motion } from "framer-motion";

const SiteSettings = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <AdminNav />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Theme Settings</h1>
        </div>

        <div className="grid gap-6">
          <ThemeSettingsForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SiteSettings;