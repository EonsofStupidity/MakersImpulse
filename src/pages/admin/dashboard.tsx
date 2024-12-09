import React from 'react';
import { motion } from 'framer-motion';
import { AdminSidebarProvider } from '@/components/admin/dashboard/sidebar/AdminSidebarContext';
import NewDashboardOverview from './core/NewDashboardOverview';
import { CacheManagementSection } from './core/CacheManagementSection';

const AdminDashboard = () => {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-background">
        <main className="p-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <NewDashboardOverview />
            <CacheManagementSection />
          </motion.div>
        </main>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;