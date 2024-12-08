import { ChartBar, Calendar, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  campaign_ads: {
    id: string;
    title: string;
    impressions: number;
    clicks: number;
  }[];
}

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const CampaignList = ({ campaigns, isLoading }: CampaignListProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => {
            const totalImpressions = campaign.campaign_ads.reduce(
              (sum, ad) => sum + (ad.impressions || 0),
              0
            );
            const totalClicks = campaign.campaign_ads.reduce(
              (sum, ad) => sum + (ad.clicks || 0),
              0
            );
            const ctr = totalImpressions
              ? ((totalClicks / totalImpressions) * 100).toFixed(2)
              : "0.00";

            return (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "default"
                        : campaign.status === "draft"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(campaign.start_date).toLocaleDateString()} -{" "}
                    {new Date(campaign.end_date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {campaign.budget?.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ChartBar className="w-4 h-4" />
                    <span>
                      {totalImpressions} impressions, {ctr}% CTR
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CampaignList;