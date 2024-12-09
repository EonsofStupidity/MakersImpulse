import { Route } from "react-router-dom";
import Landing from "@/pages/site/landing";
import About from "@/pages/site/about";
import Terms from "@/pages/site/terms";
import Privacy from "@/pages/site/privacy";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import LatestUpdates from "@/pages/content/blog/latest-updates";
import MakerSpace from "@/pages/content/maker-space";

export const PublicRoutes = () => {
  return [
    { path: "/", element: <Landing /> },
    { path: "/maker-space", element: <MakerSpace /> },
    { path: "/about", element: <About /> },
    { path: "/terms", element: <Terms /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/blog", element: <LatestUpdates /> }
  ];
};