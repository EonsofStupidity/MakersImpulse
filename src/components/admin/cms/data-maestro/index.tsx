import { Suspense } from 'react';
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const DataMaestro = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Data Maestro</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <Card className="p-6">
          <div className="grid gap-6">
            {/* Content will be added here */}
            <p className="text-muted-foreground">Data management interface loading...</p>
          </div>
        </Card>
      </Suspense>
    </div>
  );
};

export default DataMaestro;