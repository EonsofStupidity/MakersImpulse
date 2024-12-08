import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Keyboard,
  Settings2,
  MessageSquare,
  CheckSquare,
  AlertCircle,
} from "lucide-react";

const STEP_TYPES = [
  {
    type: "input",
    name: "User Input",
    description: "Collect information from users",
    icon: Keyboard,
    color: "bg-blue-500",
  },
  {
    type: "automated",
    name: "Automated Action",
    description: "Perform automated tasks",
    icon: Settings2,
    color: "bg-green-500",
  },
  {
    type: "approval",
    name: "Approval",
    description: "Request approval from designated users",
    icon: CheckSquare,
    color: "bg-yellow-500",
  },
  {
    type: "notification",
    name: "Notification",
    description: "Send notifications to users",
    icon: MessageSquare,
    color: "bg-purple-500",
  },
  {
    type: "condition",
    name: "Condition",
    description: "Add branching logic",
    icon: AlertCircle,
    color: "bg-orange-500",
  },
];

export const StepTypeDefinitions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {STEP_TYPES.map((stepType) => (
        <Card key={stepType.type} className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${stepType.color}`}>
              <stepType.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">{stepType.name}</h3>
              <p className="text-sm text-muted-foreground">
                {stepType.description}
              </p>
              <Badge variant="outline" className="mt-2">
                {stepType.type}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};