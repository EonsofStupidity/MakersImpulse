import { lazy } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Layout } from "@/components/layout/Layout";

// Core Pages
const Landing = lazy(() => import('@/pages/landing/Landing'));
const Home = lazy(() => import('@/pages/home/Home'));
const NotFound = lazy(() => import('@/pages/error/NotFound'));

// Admin Pages
const CoreDashboard = lazy(() => import('@/components/admin/core/CoreDashboard'));
const DataMaestro = lazy(() => import('@/components/admin/data-maestro/DataMaestro/DataMaestro'));
const UserManagement = lazy(() => import('@/components/admin/users/UserManagement'));
const RoleList = lazy(() => import('@/components/admin/core/roles/RoleList'));
const AdminSettings = lazy(() => import('@/components/admin/AdminSettings'));

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/home", element: <Home /> }
    ],
  },
  // Admin routes - separate layout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <CoreDashboard /> },
      { path: "data-maestro", element: <DataMaestro /> },
      { path: "core/users", element: <UserManagement /> },
      { path: "core/roles", element: <RoleList /> },
      { path: "core/settings", element: <AdminSettings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];