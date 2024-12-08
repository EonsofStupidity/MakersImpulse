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
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />, // Add default route for /admin
  },
  {
    path: "/admin/posts",
    element: <AdminPosts />,
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />,
  },
  {
    path: "/admin/settings/activity-logs",
    element: <ActivityLogs />,
  },
  {
    path: "/admin/settings/content-types",
    element: <ContentTypes />,
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
  },
];