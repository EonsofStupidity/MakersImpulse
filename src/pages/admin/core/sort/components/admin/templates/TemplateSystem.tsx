import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Layout,
  Search,
  Plus,
  FileText,
  Grid,
  MessageSquare,
  Table
} from "lucide-react";

const TemplateSystem = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    {
      id: "page",
      name: "Page Templates",
      description: "Pre-designed page layouts for various content types",
      icon: Layout,
      count: 12
    },
    {
      id: "post",
      name: "Post Templates",
      description: "Blog and article post layouts",
      icon: FileText,
      count: 8
    },
    {
      id: "grid",
      name: "Grid Templates",
      description: "Grid-based layouts for galleries and portfolios",
      icon: Grid,
      count: 6
    },
    {
      id: "forum",
      name: "Forum Templates",
      description: "Templates for forum threads and discussions",
      icon: MessageSquare,
      count: 4
    },
    {
      id: "data",
      name: "Data Templates",
      description: "Templates for data presentation and tables",
      icon: Table,
      count: 10
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Template System</h2>
          <p className="text-muted-foreground">Manage and create templates for various content types</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer backdrop-blur-sm bg-card/50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <span className="text-sm font-medium bg-primary/10 px-2 py-1 rounded">
                        {template.count}
                      </span>
                    </div>
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

export default TemplateSystem;