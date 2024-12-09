import { lazy } from "react";
import { Landing } from "@/pages/site/landing";

const About = lazy(() => import("@/pages/site/about"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const MakerSpace = lazy(() => import("@/pages/content/maker-space"));
const LatestUpdates = lazy(() => import("@/pages/content/blog/latest-updates"));
const Privacy = lazy(() => import("@/pages/site/privacy"));
const Terms = lazy(() => import("@/pages/site/terms"));

const publicRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/maker-space",
    element: <MakerSpace />,
  },
  {
    path: "/blog/latest-updates",
    element: <LatestUpdates />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
];

export default publicRoutes;