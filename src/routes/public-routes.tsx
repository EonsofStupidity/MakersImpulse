import { RouteObject } from "react-router-dom";
import Landing from "@/pages/site/landing";

export const PublicRoutes = (): RouteObject[] => [
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/blog",
    element: <Blog />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/portfolio",
    element: <Portfolio />
  },
  {
    path: "/faq",
    element: <FAQ />
  }
];
