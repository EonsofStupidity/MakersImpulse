interface PostPreviewProps {
  title: string;
  content: string;
}

export const PostPreview = ({ title, content }: PostPreviewProps) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};