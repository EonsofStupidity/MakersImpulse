import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet, AlertTriangle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LivePreviewProps {
  data: any;
  type: "part" | "build" | "category";
  validationErrors?: { [key: string]: string[] };
  crossFieldErrors?: string[];
  sampleData?: boolean;
}

const LivePreview = ({ 
  data, 
  type, 
  validationErrors, 
  crossFieldErrors = [], 
  sampleData = false 
}: LivePreviewProps) => {
  const renderPartPreview = () => (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
        {data.image_url ? (
          <img
            src={data.image_url}
            alt={data.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image available
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold">{data.name}</h3>
        <p className="text-sm text-muted-foreground">{data.manufacturer}</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">${data.cost_usd}</Badge>
        <Badge variant="outline">{data.category}</Badge>
      </div>
      <p className="text-sm">{data.summary}</p>

      {/* Field Validation Feedback */}
      <AnimatePresence>
        {validationErrors && Object.keys(validationErrors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {Object.entries(validationErrors).map(([field, errors]) => (
                    <li key={field}>
                      {field}: {errors.join(", ")}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cross-field Validation Feedback */}
      <AnimatePresence>
        {crossFieldErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {crossFieldErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Data Indicator */}
      {sampleData && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Sample Data
        </Badge>
      )}
    </div>
  );

  const renderBuildPreview = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{data.printer_name}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Build Volume</p>
          <p className="text-sm text-muted-foreground">
            {data.build_volume?.x}x{data.build_volume?.y}x{data.build_volume?.z}mm
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Kinematics</p>
          <p className="text-sm text-muted-foreground">{data.kinematics}</p>
        </div>
      </div>
      <p className="text-sm">{data.description}</p>
    </div>
  );

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
      <Tabs defaultValue="desktop">
        <TabsList className="mb-4">
          <TabsTrigger value="desktop">
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="tablet">
            <Tablet className="w-4 h-4 mr-2" />
            Tablet
          </TabsTrigger>
          <TabsTrigger value="mobile">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="desktop" className="w-full">
          {type === 'part' ? renderPartPreview() : renderBuildPreview()}
        </TabsContent>
        <TabsContent value="tablet" className="max-w-[768px] mx-auto">
          {type === 'part' ? renderPartPreview() : renderBuildPreview()}
        </TabsContent>
        <TabsContent value="mobile" className="max-w-[375px] mx-auto">
          {type === 'part' ? renderPartPreview() : renderBuildPreview()}
        </TabsContent>
      </Tabs>

      {/* Export Preview Button */}
      <div className="mt-6 flex items-center justify-between">
        <Badge variant="outline" className="text-green-500">
          <Check className="w-4 h-4 mr-1" />
          Preview Ready
        </Badge>
        <button
          onClick={() => {
            const previewData = {
              type,
              data,
              timestamp: new Date().toISOString(),
            };
            const blob = new Blob([JSON.stringify(previewData, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `preview-${type}-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Export Preview
        </button>
      </div>
    </Card>
  );
};

export default LivePreview;