import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { routes } from "@/config/routes";
import Navigation from "@/components/common/navigation/Navigation";

// Create QueryClient instance outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const routing = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        {/* Main application wrapper */}
        <div className="min-h-screen bg-background">
          {/* Global sticky navigation */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navigation />
          </div>
          
          {/* Add padding to account for fixed navigation */}
          <div className="pt-14">
            <Suspense 
              fallback={
                <div className="flex h-screen items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              }
            >
              {routing}
            </Suspense>
          </div>
          
          {/* Global notifications */}
          <Toaster />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;