import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type UserRole = "visitor" | "subscriber" | "building" | "builder" | "editor" | "admin";

export const useRoleAccess = (requiredRole: UserRole = "subscriber") => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const roleHierarchy: Record<UserRole, number> = {
    visitor: 0,
    subscriber: 1,
    building: 2,
    builder: 3,
    editor: 4,
    admin: 5,
  };

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }

    if (!isLoading && profile) {
      const userRoleLevel = roleHierarchy[profile.role || "visitor"];
      const requiredRoleLevel = roleHierarchy[requiredRole];

      if (userRoleLevel < requiredRoleLevel) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access this area.",
        });
        navigate("/");
      }
    }
  }, [session, profile, isLoading, navigate, requiredRole, toast]);

  return {
    isLoading,
    hasAccess: profile ? roleHierarchy[profile.role] >= roleHierarchy[requiredRole] : false,
    userRole: profile?.role || "visitor",
  };
};