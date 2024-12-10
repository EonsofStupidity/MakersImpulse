import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { DashboardSections } from "./core/DashboardSections";
import { WorkflowManagement } from "@/components/admin/workflows/WorkflowManagement";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <DashboardSections />
          <WorkflowManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;