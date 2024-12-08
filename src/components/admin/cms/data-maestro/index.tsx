import { Suspense } from 'react';
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import { Database, Package, Upload } from 'lucide-react';
import DatabaseTable from "@/pages/admin/database/DatabaseTable";

const DataMaestro = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Database Management",
      description: "Manage your database schema, relationships, and data",
      icon: Database,
      path: "/admin/data-maestro/database"
    },
    {
      title: "Component Management",
      description: "Manage and organize your components",
      icon: Package,
      path: "/admin/data-maestro/components"
    },
    {
      title: "Import Wizard",
      description: "Import and validate data from various sources",
      icon: Upload,
      path: "/admin/data-maestro/import"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Data Maestro</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <Card 
              key={feature.path}
              className="p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <DatabaseTable />
      </Suspense>
    </div>
  );
};

export default DataMaestro;