import React, { useState, useCallback } from "react";
import { PreviewGrid } from "./preview/PreviewGrid";
import { PreviewControls } from "./preview/PreviewControls";
import { PreviewFilters } from "./preview/PreviewFilters";
import { PreviewPagination } from "./preview/PreviewPagination";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PreviewTableProps {
  data: any[];
  errors: Record<number, string[]>;
  onDataChange: (rowIndex: number, field: string, value: string) => void;
  pageSize?: number;
}

export const PreviewTable = ({ 
  data, 
  errors, 
  onDataChange,
  pageSize = 10 
}: PreviewTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tagVerification, setTagVerification] = useState<Record<string, boolean>>({});
  const [addTagDialog, setAddTagDialog] = useState<{ open: boolean; tagName: string }>({ open: false, tagName: '' });
  const { toast } = useToast();

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    return sortDirection === 'asc' 
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilter = useCallback((field: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  }, []);

  const handleDownloadCSV = useCallback(() => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }, [data]);

  const verifyTag = useCallback(async (tagName: string) => {
    const { data: existingTags, error } = await supabase
      .from('component_tags')
      .select('name')
      .eq('name', tagName)
      .single();

    if (error) {
      console.error('Error verifying tag:', error);
      return false;
    }

    const exists = !!existingTags;
    setTagVerification(prev => ({
      ...prev,
      [tagName]: exists
    }));

    return exists;
  }, []);

  const handleAddTag = useCallback(async (tagName: string) => {
    try {
      const { error } = await supabase
        .from('component_tags')
        .insert([{ name: tagName }]);

      if (error) throw error;

      await verifyTag(tagName);
      setAddTagDialog({ open: false, tagName: '' });

      toast({
        title: "Success",
        description: `Tag '${tagName}' was added to the database!`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tag to database",
        variant: "destructive",
      });
    }
  }, [toast, verifyTag]);

  // Verify tags in the first row when data changes
  React.useEffect(() => {
    if (data.length > 0) {
      const firstRow = data[0];
      Object.keys(firstRow).forEach(async (key) => {
        if (typeof firstRow[key] === 'string') {
          await verifyTag(firstRow[key]);
        }
      });
    }
  }, [data, verifyTag]);

  return (
    <div className="space-y-4">
      <PreviewControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDownloadCSV={handleDownloadCSV}
        selectedRows={selectedRows}
      />

      <PreviewFilters
        headers={Object.keys(data[0])}
        filterValues={filterValues}
        onFilterChange={handleFilter}
        onSort={setSortField}
        sortField={sortField}
        sortDirection={sortDirection}
      />

      <div className="relative">
        <PreviewGrid
          data={data.slice(startIndex, endIndex)}
          errors={errors}
          onDataChange={onDataChange}
          filterValues={filterValues}
          tagVerification={tagVerification}
          onAddTag={(tagName) => setAddTagDialog({ open: true, tagName })}
        />

        <AnimatePresence>
          {Object.entries(tagVerification).map(([tagName, exists]) => (
            !exists && (
              <motion.div
                key={tagName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute top-0 left-0 bg-${exists ? 'green' : 'red'}-500/10 p-2 rounded`}
              >
                {tagName}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <PreviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={data.length}
      />

      <Dialog open={addTagDialog.open} onOpenChange={(open) => setAddTagDialog({ open, tagName: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
            <DialogDescription>
              Do you want to add "{addTagDialog.tagName}" to the tag system?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddTagDialog({ open: false, tagName: '' })}>
              Cancel
            </Button>
            <Button onClick={() => handleAddTag(addTagDialog.tagName)}>
              Add Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
