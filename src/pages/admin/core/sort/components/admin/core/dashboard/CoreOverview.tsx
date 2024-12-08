import { Card } from "@/components/ui/card";
import { 
  Database, 
  Settings, 
  Users, 
  Shield, 
  Activity,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";

const coreTools = [
  {
    title: "Database Management",
    description: "Manage database schemas and data",
    icon: Database,
    link: "/admin/core/database"
  },
  {
    title: "System Settings",
    description: "Configure core system settings",
    icon: Settings,
    link: "/admin/core/settings"
  },
  {
    title: "User Management",
    description: "Manage users and permissions",
    icon: Users,
    link: "/admin/core/users"
  },
  {
    title: "Security",
    description: "Security settings and access",
    icon: Shield,
    link: "/admin/core/security"
  },
  {
    title: "Monitoring",
    description: "System monitoring and logs",
    icon: Activity,
    link: "/admin/core/monitoring"
  },
  {
    title: "Workflows",
    description: "Automated system workflows",
    icon: Workflow,
    link: "/admin/core/workflows"
  }
];

const CoreOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Core System</h2>
        <p className="text-muted-foreground">Manage essential system functions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coreTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CoreOverview;