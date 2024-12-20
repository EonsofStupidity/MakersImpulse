import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";

const Builds = lazy(() => import("@/pages/content/maker-space/builds"));
const BuildDetails = lazy(() => import("@/pages/content/maker-space/builds/[buildId]"));
const NewBuild = lazy(() => import("@/pages/content/maker-space/builds/new"));

export const makerSpaceRoutes: RouteObject[] = [
  {
    path: "/maker-space/builds",
    element: (
      <AuthGuard>
        <Builds />
      </AuthGuard>
    ),
  },
  {
    path: "/maker-space/builds/new",
    element: (
      <AuthGuard>
        <NewBuild />
      </AuthGuard>
    ),
  },
  {
    path: "/maker-space/builds/:buildId",
    element: (
      <AuthGuard>
        <BuildDetails />
      </AuthGuard>
    ),
  }
];