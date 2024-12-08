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
const DatabaseManagement = lazy(() => import("@/pages/admin/DataMaestro/DatabaseManagement"));
const ComponentManagement = lazy(() => import("@/pages/admin/DataMaestro/ComponentManager/ComponentManagement"));
const ImportWizard = lazy(() => import("@/pages/admin/DataMaestro/csv/ImportWizard"));

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
      },
      {
        path: "data-maestro/database",
        element: <DatabaseManagement />,
      },
      {
        path: "data-maestro/components",
        element: <ComponentManagement />,
      },
      {
        path: "data-maestro/import",
        element: <ImportWizard />,
      }
    ]
  }
];