import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "./types";

export const useProfile = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData || !session?.user?.id) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          location: formData.location,
          interests: formData.interests,
          signature: formData.signature,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    formData,
    isLoading,
    isEditing,
    setFormData,
    setIsEditing,
    handleUpdate,
  };
};