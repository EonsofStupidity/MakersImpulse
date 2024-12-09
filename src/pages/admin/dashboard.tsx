import React from 'react';
import { motion } from 'framer-motion';
import { AdminSidebarProvider } from '@/components/admin/dashboard/sidebar/AdminSidebarContext';
import { AdminSidebar } from '@/components/admin/dashboard/sidebar/AdminSidebar';
import { AdminNav } from '@/components/admin/dashboard/AdminNav';
import NewDashboardOverview from './core/NewDashboardOverview';
import { RedisDashboardSection } from './core/RedisDashboardSection';

const AdminDashboard = () => {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminNav />
          <main className="p-8 pt-20 ml-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <NewDashboardOverview />
              <RedisDashboardSection />
            </motion.div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;