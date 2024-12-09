import React from 'react';
import { AdminSidebarProvider } from '@/components/admin/dashboard/sidebar/AdminSidebarContext';
import { AdminSidebar } from '@/components/admin/dashboard/sidebar/AdminSidebar';
import { AdminNav } from '@/components/admin/dashboard/AdminNav';
import NewDashboardOverview from './core/NewDashboardOverview';

// Import our new CSS files
import '@/styles/admin/dashboard.css';
import '@/styles/admin/animations.css';
import '@/styles/admin/cards.css';

const AdminDashboard = () => {
  return (
    <AdminSidebarProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="flex-1 relative">
          <AdminNav />
          <main className="p-8 pt-32 ml-[60px]">
            <div className="space-y-8 relative z-10">
              <NewDashboardOverview />
            </div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;