import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "@/components/auth/SessionContext";
import { Navigation } from "@/components/shared/ui/Navigation";

// Pages
import MakerSpace from "./pages/content/maker-space/index";
import LatestUpdates from "./pages/content/blog/latest-updates";
import Login from "./pages/auth/login";
import AdminDashboard from "./pages/admin/dashboard";
import MediaLibrary from "./pages/admin/content-management/media";
import PostEditor from "./pages/admin/content-management/editor";

const queryClient = new QueryClient();

const App = () => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MakerSpace />} />
                <Route path="/blog/latest-updates" element={<LatestUpdates />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/media" element={<MediaLibrary />} />
                <Route path="/admin/post-editor" element={<PostEditor />} />
                <Route path="/admin/posts" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminDashboard />} />
              </Routes>
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