import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SessionProvider } from "@/components/auth/SessionContext";
import { Navigation } from "@/components/shared/ui/Navigation";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import MakerSpace from "./pages/content/maker-space/index";
import LatestUpdates from "./pages/content/blog/latest-updates";
import Login from "./pages/auth/login";
import AdminDashboard from "./pages/admin/dashboard";
import MediaLibrary from "./pages/admin/content-management/media";
import PostEditor from "./pages/admin/content-management/editor";
import CategoriesManagement from "./pages/admin/content-management/categories";
import TemplatesManagement from "./pages/admin/content-management/templates";
import WorkflowsManagement from "./pages/admin/content-management/workflows";
import ContentTypesSettings from "./pages/admin/settings/content-types";

const queryClient = new QueryClient();

// Pool of trendy transitions
const transitions = [
  {
    initial: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(8px)" },
  },
  {
    initial: { opacity: 0, x: -100, rotateY: -30 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 100, rotateY: 30 },
  },
  {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
  },
  {
    initial: { opacity: 0, scale: 1.1, filter: "saturate(0)" },
    animate: { opacity: 1, scale: 1, filter: "saturate(1)" },
    exit: { opacity: 0, scale: 0.9, filter: "saturate(0)" },
  },
  {
    initial: { opacity: 0, rotate: -5, y: 30 },
    animate: { opacity: 1, rotate: 0, y: 0 },
    exit: { opacity: 0, rotate: 5, y: -30 },
  },
];

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const transition = transitions[Math.floor(Math.random() * transitions.length)];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
            <Navigation />
            <main className="flex-1">
              <PageTransition>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<MakerSpace />} />
                  <Route path="/blog/latest-updates" element={<LatestUpdates />} />
                  <Route path="/login" element={<Login />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/media" element={<MediaLibrary />} />
                  <Route path="/admin/post-editor" element={<PostEditor />} />
                  <Route path="/admin/content-management/categories" element={<CategoriesManagement />} />
                  <Route path="/admin/content-management/templates" element={<TemplatesManagement />} />
                  <Route path="/admin/content-management/workflows" element={<WorkflowsManagement />} />
                  <Route path="/admin/settings/content-types" element={<ContentTypesSettings />} />
                </Routes>
              </PageTransition>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SessionProvider>
);

export default App;
