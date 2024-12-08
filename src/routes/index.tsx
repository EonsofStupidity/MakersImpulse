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