import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PreviewStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PreviewStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: PreviewStepProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(50);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const totalPages = Math.ceil(previewData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = previewData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="border rounded overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {config.primary_fields.map((field: any) => (
                <TableHead key={field.name}>{field.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow key={index}>
                {config.primary_fields.map((field: any) => (
                  <TableCell key={field.name}>
                    <Input
                      value={row[field.name] || ""}
                      onChange={(e) => {
                        const newData = [...previewData];
                        newData[startIndex + index] = {
                          ...newData[startIndex + index],
                          [field.name]: e.target.value
                        };
                        setPreviewData(newData);
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};