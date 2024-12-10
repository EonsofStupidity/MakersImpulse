import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSetup } from '@/hooks/useAuthSetup';

// Create QueryClient with robust error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      throwOnError: true,
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast.error('Failed to fetch data', {
          description: error.message,
          duration: 5000,
        });
      },
    },
    mutations: {
      retry: 1,
      onError: (error: Error) => {
        console.error('Mutation error:', error);
        toast.error('Operation failed', {
          description: error.message,
          duration: 5000,
        });
      },
    },
  },
});

const App = () => {
  const { handleAuthChange, initialSetupDone } = useAuthSetup();

  useEffect(() => {
    if (initialSetupDone.current) return;
    initialSetupDone.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      handleAuthChange(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      handleAuthChange(session);
    });

    // Global mouse gradient effect with performance optimization
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Cleanup subscriptions and event listeners
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleAuthChange]);
  
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