import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { GraduationCap, UserCheck, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MentorshipPrograms from "@/components/mentorship/MentorshipPrograms";
import CreateProgramDialog from "@/components/mentorship/CreateProgramDialog";
import { useState } from "react";

const Mentorship = () => {
  const session = useSession();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile-mentorship"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              Mentorship Program
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect with experienced builders and share knowledge
            </p>
          </div>
          {profile?.builder_level >= 3 && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <UserCheck className="w-4 h-4 mr-2" />
              Become a Mentor
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Active Mentors</h3>
                <p className="text-2xl font-bold">
                  {profile?.mentorship_count || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Your Level</h3>
                <p className="text-2xl font-bold">
                  {profile?.builder_level || 1}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Mentor Rating</h3>
                <p className="text-2xl font-bold">
                  {profile?.mentor_rating ? `${profile.mentor_rating}/5` : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <MentorshipPrograms />

        <CreateProgramDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog} 
        />
      </div>
    </div>
  );
};

export default Mentorship;