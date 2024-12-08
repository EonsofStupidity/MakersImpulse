import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ModerationQueue from "./moderation/ModerationQueue";
import ReportsList from "./moderation/ReportsList";
import CommunityMetrics from "./metrics/CommunityMetrics";

const CommunityDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Community Management</h2>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <CommunityMetrics />
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card className="p-6">
            <ModerationQueue />
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <ReportsList />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDashboard;