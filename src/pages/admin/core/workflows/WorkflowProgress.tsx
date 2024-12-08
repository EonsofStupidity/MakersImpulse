import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface WorkflowProgressProps {
  instance: {
    id: string;
    status: string;
    current_step: string;
    started_at: string;
    completed_at?: string;
    data: any;
  };
}

export const WorkflowProgress = ({ instance }: WorkflowProgressProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "active":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "active":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon(instance.status)}
          <h3 className="font-medium">Workflow Progress</h3>
        </div>
        <Badge
          className={`${getStatusColor(instance.status)} text-white`}
        >
          {instance.status}
        </Badge>
      </div>

      <Progress value={75} className="mb-4" />

      <div className="text-sm text-muted-foreground">
        <p>Started: {new Date(instance.started_at).toLocaleString()}</p>
        {instance.completed_at && (
          <p>Completed: {new Date(instance.completed_at).toLocaleString()}</p>
        )}
      </div>
    </Card>
  );
};