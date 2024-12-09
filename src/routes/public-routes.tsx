import { RouteObject } from "react-router-dom";
import Landing from "@/pages/site/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />
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

export default publicRoutes;