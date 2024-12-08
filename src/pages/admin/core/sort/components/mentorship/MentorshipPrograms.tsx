import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck } from "lucide-react";

interface MentorProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  mentor_rating: number | null;
}

interface MentorshipProgram {
  id: string;
  title: string;
  description: string;
  expertise_areas: string[];
  mentor: MentorProfile;
}

const MentorshipPrograms = () => {
  const session = useSession();
  const { toast } = useToast();

  const { data: programs, isLoading } = useQuery({
    queryKey: ["mentorship-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mentorship_programs")
        .select(`
          *,
          mentor:profiles(id, username, display_name, avatar_url, mentor_rating)
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as MentorshipProgram[];
    },
  });

  const handleJoinProgram = async (programId: string) => {
    try {
      const { error } = await supabase
        .from("mentorship_relationships")
        .insert({
          program_id: programId,
          mentee_id: session?.user?.id,
        });

      if (error) throw error;

      toast({
        title: "Request Sent",
        description: "Your mentorship request has been sent to the mentor.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send mentorship request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs?.map((program) => (
        <Card key={program.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold">{program.title}</h3>
              <p className="text-sm text-muted-foreground">
                by {program.mentor.display_name || program.mentor.username}
              </p>
            </div>
            {program.mentor.mentor_rating && (
              <Badge variant="secondary">
                ★ {program.mentor.mentor_rating}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {program.description}
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {program.expertise_areas.map((area: string) => (
                <Badge key={area} variant="outline">
                  {area}
                </Badge>
              ))}
            </div>

            <Button 
              className="w-full" 
              onClick={() => handleJoinProgram(program.id)}
              disabled={program.mentor.id === session?.user?.id}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Request Mentorship
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MentorshipPrograms;