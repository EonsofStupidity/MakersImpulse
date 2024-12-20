import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { AuthGuard } from "@/lib/auth/AuthGuard";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { lazy } from "react";

// Lazy load pages
const LandingPage = lazy(() => import("@/pages/site/landing"));
const SchedulePage = lazy(() => import("@/pages/content/schedule"));
const QueuePage = lazy(() => import("@/pages/content/queue"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));
const ProfilePage = lazy(() => import("@/pages/auth/profile"));
const SettingsPage = lazy(() => import("@/pages/admin/settings"));
const DashboardPage = lazy(() => import("@/pages/admin/dashboard"));
const UsersPage = lazy(() => import("@/pages/admin/users"));
const DataMaestroPage = lazy(() => import("@/pages/admin/DataMaestro"));
const MonitoringPage = lazy(() => import("@/pages/admin/monitoring"));
const ForumPage = lazy(() => import("@/pages/admin/forum"));
const MakerSpacePage = lazy(() => import("@/pages/content/maker-space"));
const BuildsPage = lazy(() => import("@/pages/content/maker-space/builds"));
const GuidesPage = lazy(() => import("@/pages/content/maker-space/guides"));
const PartsPage = lazy(() => import("@/pages/content/maker-space/parts"));

export const AppRoutes = () => {
  const { session, user, isLoading } = useAuthStore();
  
  console.log('AppRoutes: Session state:', { 
    userId: session?.user?.id,
    role: user?.role,
    isLoading,
    hasSession: !!session
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/content/schedule" element={<SchedulePage />} />
          <Route path="/content/queue" element={<QueuePage />} />

          {/* Protected Routes */}
          <Route path="/profile" element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          } />
          <Route path="/settings" element={
            <AuthGuard>
              <SettingsPage />
            </AuthGuard>
          } />

          {/* Maker Space Routes */}
          <Route path="/maker-space" element={
            <AuthGuard>
              <MakerSpacePage />
            </AuthGuard>
          } />
          <Route path="/maker-space/builds/*" element={
            <AuthGuard>
              <BuildsPage />
            </AuthGuard>
          } />
          <Route path="/maker-space/guides/*" element={
            <AuthGuard>
              <GuidesPage />
            </AuthGuard>
          } />
          <Route path="/maker-space/parts/*" element={
            <AuthGuard>
              <PartsPage />
            </AuthGuard>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AuthGuard requireAuth={true} requiredRole={["admin", "super_admin"]}>
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="data-maestro" element={<DataMaestroPage />} />
                <Route path="monitoring" element={<MonitoringPage />} />
                <Route path="forum" element={<ForumPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Routes>
            </AuthGuard>
          } />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};