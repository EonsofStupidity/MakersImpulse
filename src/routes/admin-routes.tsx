import { lazy } from "react";
import { NewDashboardOverview } from "@/pages/admin/core/NewDashboardOverview";

const Posts = lazy(() => import("@/pages/admin/posts"));
const Users = lazy(() => import("@/pages/admin/users"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const ContentManagement = lazy(() => import("@/pages/admin/content-management"));
const ContentEditor = lazy(() => import("@/pages/admin/content-management/editor"));
const Categories = lazy(() => import("@/pages/admin/content-management/categories"));
const Templates = lazy(() => import("@/pages/admin/content-management/templates"));
const Workflows = lazy(() => import("@/pages/admin/content-management/workflows"));

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
    path: "users",
    element: <Users />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "content-management",
    element: <ContentManagement />,
  },
  {
    path: "content-management/editor",
    element: <ContentEditor />,
  },
  {
    path: "content-management/editor/:id",
    element: <ContentEditor />,
  },
  {
    path: "content-management/categories",
    element: <Categories />,
  },
  {
    path: "content-management/templates",
    element: <Templates />,
  },
  {
    path: "content-management/workflows",
    element: <Workflows />,
  },
];