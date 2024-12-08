import { useState } from "react";
import { Editor } from "./Editor";
import { PostToolbar } from "./PostToolbar";
import { PostForm } from "./PostForm";

interface PostEditorProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const PostEditor = ({ initialData, onSave }: PostEditorProps) => {
  const [data, setData] = useState(initialData || {
    title: "",
    content: "",
    excerpt: "",
    publication_status: "draft",
    category_id: null,
    tags: [],
  });

  console.log("PostEditor current data:", data);

  return (
    <div className="space-y-4">
      <PostToolbar 
        data={data} 
        onSave={(status) => {
          console.log("PostToolbar save triggered with status:", status);
          onSave({ ...data, status });
        }} 
      />
      <PostForm 
        data={data} 
        onChange={(newData) => {
          console.log("PostForm data updated:", newData);
          setData(newData);
        }} 
      />
    </div>
  );
};