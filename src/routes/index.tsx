import { Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        {PublicRoutes()}
        {ProtectedRoutes()}
        {/* Wrap admin routes with AuthGuard requiring admin role */}
        <Route path="/admin/*" element={
          <AuthGuard requireAuth={true} requiredRole="admin">
            <Routes>
              {adminRoutes.map((route) => (
                <Route 
                  key={route.path}
                  path={route.path.replace('/admin/', '')} // Remove /admin/ prefix since we're already under /admin/*
                  element={route.element}
                />
              ))}
            </Routes>
          </AuthGuard>
        } />
      </Routes>
    </PageTransition>
  );
};