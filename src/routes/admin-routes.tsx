import { lazy } from "react";
import { NewDashboardOverview } from "@/pages/admin/core/NewDashboardOverview";

const Posts = lazy(() => import("@/pages/admin/posts"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const Users = lazy(() => import("@/pages/admin/users"));
const ActivityLogs = lazy(() => import("@/pages/admin/settings/activity-logs"));
const ContentTypes = lazy(() => import("@/pages/admin/settings/content-types"));
const DataMaestro = lazy(() => import("@/pages/admin/DataMaestro/Settings"));

export const adminRoutes = [
  {
    path: "dashboard",
    element: <NewDashboardOverview />,
  },
  {
    path: "posts",
    element: <Posts />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "users",
    element: <Users />,
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
    path: "data-maestro",
    element: <DataMaestro />,
  },
];