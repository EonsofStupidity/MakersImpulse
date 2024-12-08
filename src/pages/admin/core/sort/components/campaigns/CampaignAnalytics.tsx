import { Card } from "@/components/ui/card";

interface CampaignAnalyticsProps {
  campaigns: any[];
}

const CampaignAnalytics = ({ campaigns }: CampaignAnalyticsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Campaign Analytics</h2>
      <p className="text-muted-foreground">
        {campaigns.length} active campaigns
      </p>
    </Card>
  );
};

export default CampaignAnalytics;