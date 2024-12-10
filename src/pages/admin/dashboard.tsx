import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { NewDashboardOverview } from "./core/NewDashboardOverview";
import { WorkflowManagement } from "@/components/admin/workflows/WorkflowManagement";

const Dashboard = () => {
  console.log("Admin Dashboard component rendering");
  
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <NewDashboardOverview />
          <WorkflowManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;