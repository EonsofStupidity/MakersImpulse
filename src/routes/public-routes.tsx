import { Route } from "react-router-dom";
import Landing from "@/pages/site/landing";
import About from "@/pages/site/about";
import Terms from "@/pages/site/terms";
import Privacy from "@/pages/site/privacy";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import LatestUpdates from "@/pages/content/blog/latest-updates";
import MakerSpace from "@/pages/content/maker-space";

export const PublicRoutes = () => [
  <Route key="/" path="/" element={<Landing />} />,
  <Route key="/maker-space" path="/maker-space" element={<MakerSpace />} />,
  <Route key="/about" path="/about" element={<About />} />,
  <Route key="/terms" path="/terms" element={<Terms />} />,
  <Route key="/privacy" path="/privacy" element={<Privacy />} />,
  <Route key="/login" path="/login" element={<Login />} />,
  <Route key="/register" path="/register" element={<Register />} />,
  <Route key="/blog" path="/blog" element={<LatestUpdates />} />
];