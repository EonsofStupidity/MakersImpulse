import { Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useSession } from "@/components/auth/SessionContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";

export const AppRoutes = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  console.log('AppRoutes: Current session state:', { session, isLoading });

  return (
    <PageTransition>
      <Routes>
        {/* Public Routes - Always accessible */}
        {PublicRoutes()}

        {/* Protected Routes - Require authentication */}
        <Route
          element={
            <AuthGuard
              requireAuth={true}
              fallbackPath="/login"
            >
              {ProtectedRoutes()}
            </AuthGuard>
          }
        />

        {/* Admin Routes - Require admin role */}
        <Route
          path="admin/*"
          element={
            <AuthGuard 
              requireAuth={true} 
              requiredRole={["admin", "super_admin"]}
              fallbackPath="/login"
              onError={(error) => {
                console.error('Admin access error:', error);
                toast.error(error.message);
              }}
            >
              <Routes>
                {adminRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </AuthGuard>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/maker-space" replace />} />
      </Routes>
    </PageTransition>
  );
};