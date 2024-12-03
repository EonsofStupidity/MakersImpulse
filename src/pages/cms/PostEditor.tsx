import React, { useState } from "react";
import { supabase } from "../../utils/supabase";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleSave = async () => {
    const { data, error } = await supabase.from("posts").insert({
      title,
      slug,
      content,
      is_published: true,
      author_id: "user_id", // Replace with your current user's ID
      published_at: new Date(),
    });

    if (error) console.error("Error saving post:", error);
    else console.log("Post saved:", data);
  };

  return (
    <div>
      <h2>Create/Edit Post</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
};

export default PostEditor;