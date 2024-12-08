import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Trophy, Users, Calendar, UserCheck, Star, Award } from "lucide-react";
import { GamificationProfile } from "@/components/profile/GamificationProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          mentorship_programs: mentorship_programs(count),
          challenge_participants: challenge_participants(count)
        `)
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: activeChallenges } = useQuery({
    queryKey: ["active-challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_challenges")
        .select("*")
        .gt("end_date", new Date().toISOString())
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>{profile?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{profile?.display_name || profile?.username}</h2>
              <p className="text-muted-foreground">{profile?.bio}</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">Level {profile?.builder_level}</Badge>
                {profile?.mentor_rating && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {profile.mentor_rating}
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/challenges">
                  <Trophy className="mr-2 h-4 w-4" />
                  Challenges
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/mentorship">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Mentorship
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/groups">
                  <Users className="mr-2 h-4 w-4" />
                  Groups
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Events
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <GamificationProfile />

          {/* Active Challenges */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Active Challenges</h3>
              <Button variant="outline" asChild>
                <Link to="/challenges">View All</Link>
              </Button>
            </div>
            <div className="grid gap-4">
              {activeChallenges?.map((challenge) => (
                <Card key={challenge.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{challenge.reward_points} pts</Badge>
                        {challenge.badge_id && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Special Badge
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm">Join Challenge</Button>
                  </div>
                </Card>
              ))}
              {(!activeChallenges || activeChallenges.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  No active challenges at the moment
                </p>
              )}
            </div>
          </Card>

          {/* Security Settings Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Security Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account security, devices, and recovery options
                </p>
              </div>
              <Link to="/security">
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Settings
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;