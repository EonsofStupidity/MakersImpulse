import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VisualBuilderSection = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Visual Builder Sessions</h2>
      <div className="space-y-4">
        <Button onClick={() => navigate("/admin/visual-builder/new")} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Start New Visual Builder Session
        </Button>
      </div>
    </Card>
  );
};