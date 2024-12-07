import { Routes } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { AdminRoutes } from "./admin-routes";

export const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <PublicRoutes />
        <ProtectedRoutes />
        <AdminRoutes />
      </Routes>
    </PageTransition>
  );
};