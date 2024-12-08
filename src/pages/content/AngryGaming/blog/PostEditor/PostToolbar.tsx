import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostToolbarProps {
  data: any;
  onSave: (data: any) => void;
}

export const PostToolbar = ({ data, onSave }: PostToolbarProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select
            value={data.publication_status}
            onValueChange={(value) => onSave({ ...data, publication_status: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onSave(data)}>
            Save
          </Button>
          <Button onClick={() => onSave({ ...data, publication_status: "published" })}>
            Publish
          </Button>
        </div>
      </div>
    </Card>
  );
};