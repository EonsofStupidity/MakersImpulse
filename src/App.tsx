import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "@/components/auth/SessionContext";
import { Navigation } from "@/components/layout/Navigation";

// Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MediaLibrary from "./pages/Admin/MediaLibrary";
import PostEditor from "./components/PostEditor/PostEditor";

const queryClient = new QueryClient();

// Layout component to wrap all routes
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
    <Navigation />
    <main className="flex-1 pt-[64px]">
      {children}
    </main>
  </div>
);

const App = () => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/media" element={<MediaLibrary />} />
              <Route path="/admin/post-editor" element={<PostEditor />} />
              <Route path="/admin/posts" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminDashboard />} />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SessionProvider>
);

export default App;