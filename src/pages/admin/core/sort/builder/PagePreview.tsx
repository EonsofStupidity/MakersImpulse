import { Card } from "@/components/ui/card";

interface PagePreviewProps {
  page: {
    content: any;
    style_config: any;
  };
}

const PagePreview = ({ page }: PagePreviewProps) => {
  const { content, style_config } = page;

  const getStyles = () => ({
    backgroundColor: style_config.backgroundColor || "#ffffff",
    color: style_config.textColor || "#000000",
    fontFamily: style_config.bodyFont || "Inter",
    maxWidth: style_config.contentWidth === "contained" ? "1200px" : "none",
    margin: "0 auto",
  });

  return (
    <Card className="p-6">
      <div style={getStyles()}>
        {content.blocks?.map((block: any) => (
          <div key={block.id} className="mb-4">
            {/* Render different block types */}
            {block.type === "text" && <div>{block.content.text}</div>}
            {block.type === "image" && (
              <img
                src={block.content.url}
                alt={block.content.alt}
                className="max-w-full rounded-lg"
              />
            )}
            {/* Add more block type renderers as needed */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PagePreview;