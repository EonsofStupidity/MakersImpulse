import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PointRule {
  activity: string;
  points: number;
}

const DEFAULT_RULES: PointRule[] = [
  { activity: "forum_post", points: 5 },
  { activity: "comment", points: 2 },
  { activity: "build_submission", points: 10 },
  { activity: "helpful_answer", points: 15 },
  { activity: "daily_login", points: 1 }
];

export const PointsCalculator = () => {
  const [rules, setRules] = useState<PointRule[]>(DEFAULT_RULES);
  const [selectedActivity, setSelectedActivity] = useState<string>(DEFAULT_RULES[0].activity);
  const [customPoints, setCustomPoints] = useState<number>(0);
  const { toast } = useToast();

  const handleAddRule = () => {
    if (customPoints <= 0) {
      toast({
        title: "Invalid Points",
        description: "Points must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    setRules([...rules, { activity: selectedActivity, points: customPoints }]);
    setCustomPoints(0);
  };

  const handleUpdatePoints = async (activity: string, points: number) => {
    try {
      const { error } = await supabase
        .from('gamification_settings')
        .upsert({
          setting_name: `points_${activity}`,
          setting_value: points.toString(),
          setting_type: 'integer',
          description: `Points awarded for ${activity}`
        });

      if (error) throw error;

      toast({
        title: "Points Updated",
        description: `Points for ${activity} have been updated to ${points}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update points",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Points Calculator</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold capitalize">
                    {rule.activity.replace("_", " ")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Current points: {rule.points}
                  </p>
                </div>
                <Input
                  type="number"
                  className="w-24"
                  value={rule.points}
                  onChange={(e) => {
                    const newRules = [...rules];
                    newRules[index].points = parseInt(e.target.value);
                    setRules(newRules);
                  }}
                  onBlur={() => handleUpdatePoints(rule.activity, rule.points)}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Add New Rule</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="activity">Activity</Label>
              <Select
                value={selectedActivity}
                onValueChange={setSelectedActivity}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_RULES.map((rule) => (
                    <SelectItem key={rule.activity} value={rule.activity}>
                      {rule.activity.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={customPoints}
                onChange={(e) => setCustomPoints(parseInt(e.target.value))}
              />
            </div>
            <Button 
              className="mt-8"
              onClick={handleAddRule}
            >
              Add Rule
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};