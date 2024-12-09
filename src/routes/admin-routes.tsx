import React from "react";
import WorkflowsManagement from "@/pages/admin/content-management/workflows";
import WorkflowEditor from "@/pages/admin/content-management/workflows/[id]";

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
}

export const adminRoutes: AdminRoute[] = [
  {
    path: "content-management/workflows",
    element: <WorkflowsManagement />
  },
  {
    path: "content-management/workflows/:id",
    element: <WorkflowEditor />
  }
];