import React from "react";
import { AdminTopNav } from "@/components/admin/dashboard/nav/AdminTopNav";
import NewDashboardOverview from "./core/NewDashboardOverview";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <AdminTopNav />
      <div className="container mx-auto p-8">
        <NewDashboardOverview />
      </div>
    </div>
  );
};

export default AdminDashboard;