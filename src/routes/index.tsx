import { Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        {/* Redirect root to maker-space */}
        <Route path="/" element={<Navigate to="/maker-space" replace />} />
        
        {PublicRoutes()}
        {ProtectedRoutes()}
        
        {/* Admin routes with auth guard */}
        <Route
          path="admin/*"
          element={
            <AuthGuard requireAuth={true} requiredRole="admin">
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
      </Routes>
    </PageTransition>
  );
};