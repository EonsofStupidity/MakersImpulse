import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GamificationManagement = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["admin-achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("points", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading achievements...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Achievements & Rewards</h2>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Achievement
        </Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Requirements</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements?.map((achievement) => (
              <TableRow key={achievement.id}>
                <TableCell className="font-medium">{achievement.name}</TableCell>
                <TableCell>{achievement.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{achievement.points} pts</Badge>
                </TableCell>
                <TableCell>
                  <pre className="text-sm">
                    {JSON.stringify(achievement.requirements, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default GamificationManagement;