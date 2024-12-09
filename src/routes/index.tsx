import { Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useSession } from "@/components/auth/SessionContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const AppRoutes = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Routes>
        {/* Redirect root to maker-space */}
        <Route path="/" element={<Navigate to="/maker-space" replace />} />
        
        {/* Public Routes */}
        {PublicRoutes()}
        
        {/* Protected Routes */}
        {ProtectedRoutes()}
        
        {/* Admin routes with auth guard */}
        <Route
          path="admin/*"
          element={
            <AuthGuard 
              requireAuth={true} 
              requiredRole="admin"
              fallbackPath="/login"
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

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/maker-space" replace />} />
      </Routes>
    </PageTransition>
  );
};