import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "@/types";

export const useUserManagement = () => {
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      throw error;
    }

    return data as Profile[];
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
