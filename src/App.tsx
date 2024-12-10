import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { Toaster } from "sonner";
import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";

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
  const { setSession, setUser, setLoading } = useAuthStore();
  const initialSetupDone = useRef(false);
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    
    if (session?.user) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Error fetching user profile');
          return;
        }

        if (!profile) {
          console.error('No profile found');
          toast.error('No user profile found');
          return;
        }

        setSession(session);
        setUser({ ...session.user, role: profile.role });
        console.log('User role set:', profile.role);
        
        if (profile.role !== 'admin' && profile.role !== 'super_admin') {
          toast.error('You need admin privileges to access the dashboard');
        }
      } catch (error) {
        console.error('Error in auth change handler:', error);
        toast.error('Authentication error occurred');
      }
    } else {
      setSession(null);
      setUser(null);
    }
    setLoading(false);
  }, [setSession, setUser, setLoading]);

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

    // Global mouse gradient effect
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
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