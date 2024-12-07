import { Route } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import AdminDashboard from "@/pages/admin/dashboard";
import MediaLibrary from "@/pages/admin/content-management/media";
import PostEditor from "@/pages/admin/content-management/editor";
import CategoriesManagement from "@/pages/admin/content-management/categories";
import TemplatesManagement from "@/pages/admin/content-management/templates";
import WorkflowsManagement from "@/pages/admin/content-management/workflows";
import ContentTypesSettings from "@/pages/admin/settings/content-types";
import PostsManagement from "@/pages/admin/posts";
import UserManagement from "@/pages/admin/users";
import SiteSettings from "@/pages/admin/settings";

export const AdminRoutes = () => (
  <>
    <Route path="/admin" element={<AuthGuard requiredRole="admin"><AdminDashboard /></AuthGuard>} />
    <Route path="/admin/posts" element={<AuthGuard requiredRole="admin"><PostsManagement /></AuthGuard>} />
    <Route path="/admin/users" element={<AuthGuard requiredRole="admin"><UserManagement /></AuthGuard>} />
    <Route path="/admin/settings" element={<AuthGuard requiredRole="admin"><SiteSettings /></AuthGuard>} />
    <Route path="/admin/content-management/media" element={<AuthGuard requiredRole="admin"><MediaLibrary /></AuthGuard>} />
    <Route path="/admin/content-management/editor" element={<AuthGuard requiredRole="admin"><PostEditor /></AuthGuard>} />
    <Route path="/admin/content-management/categories" element={<AuthGuard requiredRole="admin"><CategoriesManagement /></AuthGuard>} />
    <Route path="/admin/content-management/templates" element={<AuthGuard requiredRole="admin"><TemplatesManagement /></AuthGuard>} />
    <Route path="/admin/content-management/workflows" element={<AuthGuard requiredRole="admin"><WorkflowsManagement /></AuthGuard>} />
    <Route path="/admin/settings/content-types" element={<AuthGuard requiredRole="admin"><ContentTypesSettings /></AuthGuard>} />
  </>
);