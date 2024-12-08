import { Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";

export const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        {/* Spread the route elements from each route group */}
        {PublicRoutes()}
        {ProtectedRoutes()}
        {adminRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </PageTransition>
  );
};