import React from "react";
import { Route } from "react-router-dom";
import WorkflowsManagement from "@/pages/admin/content-management/workflows";
import WorkflowEditor from "@/pages/admin/content-management/workflows/[id]";

export const adminRoutes = (
  <>
    <Route path="content-management/workflows" element={<WorkflowsManagement />} />
    <Route path="content-management/workflows/:id" element={<WorkflowEditor />} />
  </>
);
