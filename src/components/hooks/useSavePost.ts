import { useState } from "react";

export const useSavePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const savePost = async () => {
    // Logic for saving post
  };

  return { title, setTitle, slug, setSlug, content, setContent, savePost };
};