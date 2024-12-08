import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  details: string | null;
  created_at: string;
  metadata: any;
  profiles: {
    username: string | null;
    display_name: string | null;
  };
}

export const ActivityLogTable = () => {
  const [search, setSearch] = React.useState("");
  const [activityType, setActivityType] = React.useState<string>("");

  const { data: activityLogs, isLoading } = useQuery({
    queryKey: ["activity-logs", search, activityType],
    queryFn: async () => {
      console.log("Fetching activity logs with filters:", { search, activityType });
      let query = supabase
        .from("user_activity")
        .select(`
          *,
          profiles (
            username,
            display_name
          )
        `)
        .order("created_at", { ascending: false });

      if (search) {
        query = query.or(`details.ilike.%${search}%,profiles.username.ilike.%${search}%`);
      }

      if (activityType) {
        query = query.eq("activity_type", activityType);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching activity logs:", error);
        throw error;
      }

      console.log("Activity logs fetched:", data);
      return data as ActivityLog[];
    },
  });

  const { data: activityTypes } = useQuery({
    queryKey: ["activity-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_activity")
        .select("activity_type")
        .distinct();

      if (error) throw error;
      return data.map((item) => item.activity_type);
    },
  });

  const renderMetadata = (metadata: any) => {
    if (!metadata || Object.keys(metadata).length === 0) return null;
    return (
      <div className="text-sm text-gray-400">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key}>
            {key}: {JSON.stringify(value)}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by user or activity details..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-gray-800/50 border-white/10 text-white"
        />
        <Select value={activityType} onValueChange={setActivityType}>
          <SelectTrigger className="w-[200px] bg-gray-800/50 border-white/10 text-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-white/10">
            <SelectItem value="">All Types</SelectItem>
            {activityTypes?.map((type) => (
              <SelectItem key={type} value={type} className="text-white">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Activity Type</TableHead>
              <TableHead className="text-white">Details</TableHead>
              <TableHead className="text-white">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLogs?.map((log) => (
              <TableRow
                key={log.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">
                  {log.profiles.display_name || log.profiles.username || "Unknown User"}
                </TableCell>
                <TableCell className="text-white">
                  {log.activity_type}
                </TableCell>
                <TableCell className="text-white">
                  <div>{log.details}</div>
                  {renderMetadata(log.metadata)}
                </TableCell>
                <TableCell className="text-white">
                  {format(new Date(log.created_at), "PPp")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};