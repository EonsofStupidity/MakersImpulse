import React from 'react';
import { AdminSidebarProvider } from '@/components/admin/dashboard/sidebar/AdminSidebarContext';
import { AdminSidebar } from '@/components/admin/dashboard/sidebar/AdminSidebar';
import { AdminNav } from '@/components/admin/dashboard/AdminNav';
import NewDashboardOverview from './core/NewDashboardOverview';
import { RedisDashboardSection } from './core/RedisDashboardSection';

const AdminDashboard = () => {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen flex bg-gradient-to-b from-black via-black/95 to-black/90">
        <AdminSidebar />
        <div className="flex-1 relative">
          <AdminNav />
          <main className="p-8 pt-32 ml-[60px]">
            <div className="space-y-8 relative z-10">
              <NewDashboardOverview />
              <RedisDashboardSection />
            </div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;