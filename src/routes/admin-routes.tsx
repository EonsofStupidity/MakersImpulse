import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const WorkflowsManagement = lazy(() => import("@/pages/admin/content-management/workflows"));
const WorkflowEditor = lazy(() => import("@/pages/admin/content-management/workflows/[id]"));
const DatabaseManagement = lazy(() => import("@/pages/admin/DataMaestro/DatabaseManagement"));
const VisualEditor = lazy(() => import("@/pages/admin/DataMaestro/VisualEditor"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const ContentTypes = lazy(() => import("@/pages/admin/settings/content-types"));
const Posts = lazy(() => import("@/pages/admin/posts"));
const Users = lazy(() => import("@/pages/admin/users"));

export const adminRoutes: RouteObject[] = [
  {
    path: "",
    element: <AdminDashboard />
  },
  {
    path: "posts",
    element: <Posts />
  },
  {
    path: "users",
    element: <Users />
  },
  {
    path: "settings",
    element: <Settings />
  },
  {
    path: "settings/content-types",
    element: <ContentTypes />
  },
  {
    path: "content-management/workflows",
    element: <WorkflowsManagement />
  },
  {
    path: "content-management/workflows/:id",
    element: <WorkflowEditor />
  },
  {
    path: "data-maestro",
    element: <DatabaseManagement />
  },
  {
    path: "data-maestro/visual-editor",
    element: <VisualEditor />
  }
];