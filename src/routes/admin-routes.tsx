import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AdminLayout } from "@/components/admin/layouts/AdminLayout";

const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminPosts = lazy(() => import("@/pages/admin/posts"));
const AdminSettings = lazy(() => import("@/pages/admin/settings"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));
const ActivityLogs = lazy(() => import("@/pages/admin/settings/activity-logs"));
const ContentTypes = lazy(() => import("@/pages/admin/settings/content-types"));
const PostEditor = lazy(() => import("@/pages/admin/content-management/editor"));
const DataMaestro = lazy(() => import("@/components/admin/cms/data-maestro"));

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "",
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
      {
        path: "content-management/editor",
        element: <PostEditor />,
      },
      {
        path: "data-maestro",
        element: <DataMaestro />,
      }
    ]
  }
];