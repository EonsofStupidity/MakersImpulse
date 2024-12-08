import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Twitter, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialShareProps {
  buildId: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

const SocialShare = ({ buildId, title, description, imageUrl }: SocialShareProps) => {
  const { toast } = useToast();
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const buildUrl = `${window.location.origin}/builds/${buildId}`;
  const embedCode = `<iframe src="${buildUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`;

  const handleShare = async (platform: string) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to share builds",
        variant: "destructive",
      });
      return;
    }

    try {
      // Record share in database
      await supabase.from("social_shares").insert({
        content_id: buildId,
        content_type: "build",
        platform,
        share_url: buildUrl,
        user_id: session.user.id
      });

      // Prepare share URL
      let shareUrl = "";
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(buildUrl)}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(buildUrl)}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }

      toast({
        title: "Shared successfully",
        description: `Your build has been shared on ${platform}`,
      });
    } catch (error) {
      toast({
        title: "Error sharing build",
        description: "There was an error sharing your build",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, type: "link" | "embed") => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type === "link" ? "Link" : "Embed code"} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this build</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Share link</p>
            <div className="flex space-x-2">
              <Input value={buildUrl} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(buildUrl, "link")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Embed code</p>
            <div className="flex space-x-2">
              <Input value={embedCode} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(embedCode, "embed")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;