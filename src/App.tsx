import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "@/components/auth/SessionContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MediaLibraryPage from "./pages/Admin/MediaLibraryPage";
import PostEditor from "./pages/Admin/PostEditor";

const queryClient = new QueryClient();

const App = () => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/media" element={<MediaLibraryPage />} />
            <Route path="/admin/post-editor" element={<PostEditor />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SessionProvider>
);

export default App;