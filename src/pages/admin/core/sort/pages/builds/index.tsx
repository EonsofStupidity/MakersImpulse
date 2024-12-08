import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Builds = () => {
  const { data: builds, isLoading } = useQuery({
    queryKey: ["builds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("printer_builds")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Community Builds</h1>
      <Card className="p-6">
        {isLoading ? (
          <p>Loading builds...</p>
        ) : builds?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((build) => (
              <Card key={build.id} className="p-4">
                <h3 className="font-semibold">{build.printer_name}</h3>
                <p className="text-muted-foreground">{build.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No builds found</p>
        )}
      </Card>
    </div>
  );
};

export default Builds;