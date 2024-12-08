import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CampaignList from "@/components/campaigns/CampaignList";
import CampaignAnalytics from "@/components/campaigns/CampaignAnalytics";
import CreateCampaignDialog from "@/components/campaigns/CreateCampaignDialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Campaigns = () => {
  const session = useSession();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          campaign_ads (
            id,
            title,
            impressions,
            clicks
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (!session) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Campaign Management</h2>
          <p>Please sign in to manage campaigns.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CampaignList campaigns={campaigns || []} isLoading={isLoading} />
        </div>
        <div>
          <CampaignAnalytics campaigns={campaigns || []} />
        </div>
      </div>

      <CreateCampaignDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default Campaigns;