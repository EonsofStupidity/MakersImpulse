import { Route } from "react-router-dom";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import AboutPage from "@/pages/site/about";
import TermsPage from "@/pages/site/terms";
import PrivacyPage from "@/pages/site/privacy";
import LatestUpdates from "@/pages/content/blog/latest-updates";
import LandingPage from "@/pages/site/landing";

export const PublicRoutes = () => (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/blog" element={<LatestUpdates />} />
    <Route path="/blog/latest-updates" element={<LatestUpdates />} />
  </>
);