import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export const RollbackHistory = ({ importId }: { importId: string }) => {
  const { toast } = useToast();

  const { data: rollbacks } = useQuery({
    queryKey: ['import-rollbacks', importId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('import_rollbacks')
        .select('*')
        .eq('import_id', importId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleRollback = async (rollbackId: string) => {
    try {
      const { error } = await supabase
        .from('import_rollbacks')
        .update({ status: 'restored', restored_at: new Date().toISOString() })
        .eq('id', rollbackId);

      if (error) throw error;

      toast({
        title: "Rollback Successful",
        description: "The data has been restored to the previous state.",
      });
    } catch (error) {
      toast({
        title: "Rollback Failed",
        description: "Failed to restore the data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!rollbacks?.length) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Rollback History</AlertTitle>
        <AlertDescription>
          No rollback points are available for this import.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Rollback History</h3>
      <div className="space-y-4">
        {rollbacks.map((rollback) => (
          <div key={rollback.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <p className="font-medium">Backup from {new Date(rollback.created_at).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Status: {rollback.status}</p>
            </div>
            {rollback.status === 'available' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRollback(rollback.id)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restore
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};