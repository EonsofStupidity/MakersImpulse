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
  
  useEffect(() => {
    // Get initial session and check role
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session);
      
      if (session?.user) {
        // Get user profile with role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        console.log('User profile:', profile);
        
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

        // Set session with enhanced user info including role
        setSession(session);
        setUser({ ...session.user, role: profile.role });
        setLoading(false);

        console.log('User role:', profile.role);
        if (profile.role !== 'admin' && profile.role !== 'super_admin') {
          toast.error('You need admin privileges to access the dashboard');
        }
      } else {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error || !profile) {
          console.error('Error fetching profile:', error);
          return;
        }

        setSession(session);
        setUser({ ...session.user, role: profile.role });
      } else {
        setSession(null);
        setUser(null);
      }
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