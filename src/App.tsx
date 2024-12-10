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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      throwOnError: true,
      meta: {
        errorMessage: 'Failed to fetch data'
      }
    },
    mutations: {
      retry: 1,
      meta: {
        successMessage: 'Operation completed successfully',
        errorMessage: 'Operation failed'
      },
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

    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const setupAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session retrieval error:', sessionError);
          throw sessionError;
        }

        console.log('Initial session check:', session);
        await handleAuthChange(session);

      } catch (error) {
        console.error('Auth setup error:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying auth setup (${retryCount}/${maxRetries})...`);
          setTimeout(setupAuth, retryDelay * retryCount);
        } else {
          toast.error('Failed to initialize authentication', {
            description: 'Please refresh the page or try again later.',
          });
        }
      }
    };

    setupAuth();

    // Listen for auth changes with error handling
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        console.log('Auth state changed:', _event, session?.user?.id);
        await handleAuthChange(session);
      } catch (error) {
        console.error('Auth state change error:', error);
        toast.error('Authentication error', {
          description: 'There was a problem with your session. Please try signing in again.',
        });
      }
    });
    
    // Cleanup subscriptions
    return () => {
      subscription.unsubscribe();
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