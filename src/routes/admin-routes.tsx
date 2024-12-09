import React from "react";
import WorkflowsManagement from "@/pages/admin/content-management/workflows";
import WorkflowEditor from "@/pages/admin/content-management/workflows/[id]";
import AdminDashboard from "@/pages/admin/dashboard";

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
}

export const adminRoutes: AdminRoute[] = [
  {
    path: "",
    element: <AdminDashboard />
  },
  {
    path: "content-management/workflows",
    element: <WorkflowsManagement />
  },
  {
    path: "content-management/workflows/:id",
    element: <WorkflowEditor />
  }
];