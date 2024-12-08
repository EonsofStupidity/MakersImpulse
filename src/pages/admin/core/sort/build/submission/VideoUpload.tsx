import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Youtube } from "lucide-react";

interface VideoUploadProps {
  submissionId: string;
  onVideoAdded: (videoUrl: string) => void;
}

export const VideoUpload = ({ submissionId, onVideoAdded }: VideoUploadProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { toast } = useToast();

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }
    onVideoAdded(youtubeUrl);
    setYoutubeUrl(""); // Clear input after successful addition
    toast({
      title: "Success",
      description: "YouTube video added successfully",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Add Video</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="youtube">YouTube Video URL</Label>
          <div className="flex gap-2">
            <Input
              id="youtube"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <Button onClick={handleYoutubeSubmit}>
              <Youtube className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Share your build video from YouTube
          </p>
        </div>
      </div>
    </Card>
  );
};