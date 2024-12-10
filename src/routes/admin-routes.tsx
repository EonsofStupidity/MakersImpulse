import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { StatsCards } from "@/components/admin/dashboard/stats/StatsCards";
import { cn } from "@/lib/utils";

const Posts = lazy(() => import("@/pages/admin/posts"));
const Users = lazy(() => import("@/pages/admin/users"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const ContentManagement = lazy(() => import("@/pages/admin/content-management"));
const Categories = lazy(() => import("@/pages/admin/content-management/categories"));
const ForumAdminPage = lazy(() => import("@/pages/admin/forum"));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden",
      "before:content-[''] before:absolute before:inset-0 before:bg-cyber-texture before:opacity-10 before:z-0",
      "after:content-[''] after:absolute after:inset-0 after:bg-scratch-overlay after:opacity-[0.03] after:z-0"
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-admin-dark via-admin-medium to-admin-light z-[-1]" />
      <AdminNav />
      <AdminSidebar />
      <main className="pl-64 pt-32 relative z-10">
        <div className="p-8 space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export const adminRoutes = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <div className="space-y-8">
          <h1 className={cn(
            "text-2xl font-bold bg-gradient-to-r from-cyber-yellow via-cyber-pink to-cyber-purple bg-clip-text text-transparent",
            "animate-text-glow"
          )}>
            Dashboard Overview
          </h1>
          <StatsCards />
        </div>
      </DashboardLayout>
    ),
  },
  {
    path: "posts",
    element: <DashboardLayout><Posts /></DashboardLayout>,
  },
  {
    path: "users",
    element: <DashboardLayout><Users /></DashboardLayout>,
  },
  {
    path: "settings",
    element: <DashboardLayout><Settings /></DashboardLayout>,
  },
  {
    path: "content-management",
    element: <DashboardLayout><ContentManagement /></DashboardLayout>,
  },
  {
    path: "content-management/categories",
    element: <DashboardLayout><Categories /></DashboardLayout>,
  },
  {
    path: "forum",
    element: <DashboardLayout><ForumAdminPage /></DashboardLayout>,
  },
];
