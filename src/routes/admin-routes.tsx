import { lazy } from "react";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";

const Posts = lazy(() => import("@/pages/admin/posts"));
const Users = lazy(() => import("@/pages/admin/users"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const ContentManagement = lazy(() => import("@/pages/admin/content-management"));
const ContentEditor = lazy(() => import("@/pages/admin/content-management/editor"));
const Categories = lazy(() => import("@/pages/admin/content-management/categories"));
const Templates = lazy(() => import("@/pages/admin/content-management/templates"));
const Workflows = lazy(() => import("@/pages/admin/content-management/workflows"));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-admin-dark via-admin-medium to-admin-light">
      <AdminNav />
      <AdminSidebar />
      <main className="pl-64 pt-16">
        {children}
      </main>
    </div>
  );
};

export const adminRoutes = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
          {/* Dashboard content will go here */}
        </div>
      </DashboardLayout>
    ),
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