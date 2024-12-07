import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      meta: {
        errorMessage: "Failed to fetch data",
      },
    },
    mutations: {
      retry: 1,
      meta: {
        successMessage: "Operation completed successfully",
        errorMessage: "Operation failed",
      },
      onError: (error: Error, variables: unknown, context: unknown, mutation: any) => {
        toast.error(
          mutation.meta?.errorMessage || "An error occurred",
          {
            description: error.message
          }
        );
      },
      onSuccess: (data: unknown, variables: unknown, context: unknown, mutation: any) => {
        if (mutation.meta?.successMessage) {
          toast.success(mutation.meta.successMessage);
        }
      },
    },
  },
});