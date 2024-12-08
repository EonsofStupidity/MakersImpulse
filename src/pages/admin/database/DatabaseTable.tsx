import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

const ITEMS_PER_PAGE = 10;

type TableName = keyof Database['public']['Tables'];
type TableStats = {
  name: TableName;
  recordCount: number;
  lastUpdated: string;
};

const DatabaseTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: tableStats, isLoading } = useQuery({
    queryKey: ["table-stats", currentPage],
    queryFn: async () => {
      const tables: TableName[] = [
        "profiles",
        "forum_threads",
        "forum_replies",
        "achievements",
        "printer_builds",
      ];

      const stats = await Promise.all(
        tables.map(async (tableName) => {
          const { count } = await supabase
            .from(tableName)
            .select("*", { count: "exact", head: true });

          const { data: lastRecord } = await supabase
            .from(tableName)
            .select("created_at")
            .order("created_at", { ascending: false })
            .limit(1)
            .single() as { data: { created_at: string } | null };

          return {
            name: tableName,
            recordCount: count || 0,
            lastUpdated: lastRecord?.created_at
              ? new Date(lastRecord.created_at).toLocaleString()
              : "---",
          } satisfies TableStats;
        })
      );

      return stats;
    },
  });

  const totalPages = Math.ceil((tableStats?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = tableStats?.slice(startIndex, endIndex) || [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Database Tables</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table Name</TableHead>
              <TableHead>Record Count</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading table statistics...
                </TableCell>
              </TableRow>
            ) : (
              currentPageData.map((table) => (
                <TableRow key={table.name}>
                  <TableCell className="font-medium">{table.name}</TableCell>
                  <TableCell>{table.recordCount.toLocaleString()}</TableCell>
                  <TableCell>{table.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Active</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DatabaseTable;