import { useNavigate } from "react-router-dom";
import { TemplateEditor } from "@/components/admin/templates/TemplateEditor";

const NewTemplatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Template</h1>
      <TemplateEditor onSave={() => navigate("/admin/templates")} />
    </div>
  );
};

export default NewTemplatePage;