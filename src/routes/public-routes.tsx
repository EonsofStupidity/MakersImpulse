import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Landing = lazy(() => import("@/pages/site/landing"));
const About = lazy(() => import("@/pages/site/about"));
const Privacy = lazy(() => import("@/pages/site/privacy"));
const Terms = lazy(() => import("@/pages/site/terms"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
];