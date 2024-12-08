import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { ValidationSummary } from "./ValidationSummary";
import { PreviewGrid } from "./preview/PreviewGrid";
import { PreviewControls } from "./preview/PreviewControls";
import { PreviewFilters } from "./preview/PreviewFilters";
import { PreviewPagination } from "./preview/PreviewPagination";
import { DataImportPreviewProps } from "./types";

const MAX_PREVIEW_ROWS = 50;
const ROWS_PER_PAGE = 10;

export const DataImportPreview = ({ data, onConfirm, onCancel, importType }: DataImportPreviewProps) => {
  const [editedData, setEditedData] = useState(data.slice(0, MAX_PREVIEW_ROWS));
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [validationProgress, setValidationProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const handleEdit = useCallback((rowIndex: number, field: string, value: string) => {
    const newData = [...editedData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setEditedData(newData);
    validateRow(rowIndex, newData[rowIndex]);
  }, [editedData]);

  const validateRow = (rowIndex: number, rowData: any) => {
    const rowErrors: string[] = [];
    Object.entries(rowData).forEach(([field, value]) => {
      if (!value) {
        rowErrors.push(`${field} is required`);
      }
    });
    
    if (rowErrors.length > 0) {
      setErrors(prev => ({ ...prev, [rowIndex]: rowErrors }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[rowIndex];
        return newErrors;
      });
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    const headers = Object.keys(editedData[0]).join(',');
    const rows = editedData.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate pagination
  const totalPages = Math.ceil(editedData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <PreviewControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDownloadCSV={downloadCSV}
          selectedRows={selectedRows}
        />

        <ValidationSummary 
          errorCount={Object.keys(errors).length}
          progress={validationProgress}
        />

        <PreviewFilters
          headers={Object.keys(editedData[0] || {})}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        <PreviewGrid
          data={editedData.slice(startIndex, endIndex)}
          errors={errors}
          onDataChange={handleEdit}
          filterValues={filterValues}
        />

        <PreviewPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={editedData.length}
        />

        {data.length > MAX_PREVIEW_ROWS && (
          <Alert>
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Limited Preview</AlertTitle>
            <AlertDescription>
              Showing {MAX_PREVIEW_ROWS} of {data.length} rows. All rows will be processed during the actual import.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Back
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={Object.keys(errors).length > 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DataImportPreview;