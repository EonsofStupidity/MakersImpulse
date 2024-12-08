import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { CMSContent } from '../../core/types';

interface ContentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  contentType: string;
  onContentTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  searchQuery,
  onSearchChange,
  contentType,
  onContentTypeChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Select value={contentType} onValueChange={onContentTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="page">Pages</SelectItem>
              <SelectItem value="component">Components</SelectItem>
              <SelectItem value="template">Templates</SelectItem>
              <SelectItem value="workflow">Workflows</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {searchQuery && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Search: {searchQuery}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange('')} />
          </Badge>
        )}
        {contentType !== 'all' && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Type: {contentType}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onContentTypeChange('all')} />
          </Badge>
        )}
        {status !== 'all' && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Status: {status}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onStatusChange('all')} />
          </Badge>
        )}
      </div>
    </div>
  );
};