import React from "react";
import { AdminTopNav } from "@/components/admin/dashboard/nav/AdminTopNav";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import NewDashboardOverview from "./core/NewDashboardOverview";

const AdminDashboard = () => {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-gray-900 pt-20">
        <AdminTopNav />
        <div className="container mx-auto p-8 ml-[80px] transition-all duration-300">
          <NewDashboardOverview />
        </div>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;