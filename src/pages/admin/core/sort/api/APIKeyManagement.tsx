import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy, Key, Trash } from "lucide-react";
import { useApiKeys } from "@/hooks/useApiKeys";
import type { ApiAccessLevel } from "@/types/api";

const APIKeyManagement = () => {
  const [newKeyName, setNewKeyName] = useState("");
  const [accessLevel, setAccessLevel] = useState<ApiAccessLevel>("read_only");
  const { toast } = useToast();
  const { apiKeys, isLoading, createKey, toggleKey, deleteKey } = useApiKeys();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key has been copied to clipboard.",
    });
  };

  if (isLoading) {
    return <div>Loading API keys...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New API Key</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="key-name">Key Name</Label>
            <Input
              id="key-name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter a name for your API key"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="access-level">Access Level</Label>
            <Select value={accessLevel} onValueChange={(value: ApiAccessLevel) => setAccessLevel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read_only">Read Only</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={() => {
              createKey.mutate(
                { name: newKeyName, access_level: accessLevel },
                {
                  onSuccess: () => {
                    setNewKeyName("");
                    toast({
                      title: "API Key Created",
                      description: "Your new API key has been generated successfully.",
                    });
                  },
                  onError: () => {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to create API key. Please try again.",
                    });
                  },
                }
              );
            }} 
            disabled={!newKeyName}
          >
            Generate API Key
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        <div className="space-y-4">
          {apiKeys?.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="font-medium">{key.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(key.created_at).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Access Level: {key.access_level}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(key.api_key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Switch
                  checked={key.enabled}
                  onCheckedChange={(checked) =>
                    toggleKey.mutate({ id: key.id, enabled: checked })
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteKey.mutate(key.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default APIKeyManagement;