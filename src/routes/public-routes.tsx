import { RouteObject } from "react-router-dom";
import Landing from "@/pages/site/landing";
import About from "@/pages/site/about";
import Terms from "@/pages/site/terms";
import Privacy from "@/pages/site/privacy";
import LatestUpdates from "@/pages/content/blog/latest-updates";
import MakerSpace from "@/pages/content/maker-space";

export const PublicRoutes = (): RouteObject[] => [
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/maker-space",
    element: <MakerSpace />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/blog",
    element: <LatestUpdates />
  }
];