import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/store/auth-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  console.log('App component mounting...');
  const { setSession, setUser, setLoading } = useAuthStore();
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Global mouse gradient effect
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setSession, setUser, setLoading]);
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdminSidebarProvider>
            <ThemeProvider>
              <TooltipProvider>
                <div className="app-container">
                  <RootLayout>
                    <AppRoutes />
                  </RootLayout>
                  <Toaster 
                    position="top-right" 
                    expand={false} 
                    richColors 
                    closeButton 
                  />
                </div>
              </TooltipProvider>
            </ThemeProvider>
          </AdminSidebarProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;