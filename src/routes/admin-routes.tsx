import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminPosts = lazy(() => import("@/pages/admin/posts"));
const AdminSettings = lazy(() => import("@/pages/admin/settings"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));
const ActivityLogs = lazy(() => import("@/pages/admin/settings/activity-logs"));
const ContentTypes = lazy(() => import("@/pages/admin/settings/content-types"));

export const adminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "",  // Empty path for the root /admin route
    element: <AdminDashboard />,
  },
  {
    path: "posts",
    element: <AdminPosts />,
  },
  {
    path: "settings",
    element: <AdminSettings />,
  },
  {
    path: "settings/activity-logs",
    element: <ActivityLogs />,
  },
  {
    path: "settings/content-types",
    element: <ContentTypes />,
  },
  {
    path: "users",
    element: <AdminUsers />,
  },
];