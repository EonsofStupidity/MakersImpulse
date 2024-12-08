import React from "react";
import { AdminNav } from "../dashboard/AdminNav";
import { motion } from "framer-motion";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-black">
      <div className="container mx-auto px-4 pt-20">
        <AdminNav />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};