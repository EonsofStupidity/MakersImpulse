import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const { data: user } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome{user ? `, ${user.username}` : ""}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity</p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Your Builds</h2>
          <p className="text-muted-foreground">No builds yet</p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Community Updates</h2>
          <p className="text-muted-foreground">No updates available</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;