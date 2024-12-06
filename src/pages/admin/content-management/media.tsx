import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { uploadMedia } from "@/utils/supabase";

const MediaLibrary = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase.from("media").select("*");
      if (error) console.error("Error fetching media:", error);
      else setUploadedMedia(data || []);
    };

    fetchMedia();
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);

    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await uploadMedia(file);
          await supabase.from("media").insert({ name: file.name, url, type: file.type });
          return url;
        })
      );

      console.log("Uploaded Files:", urls);
      setFiles([]);
      setUploadedMedia([...uploadedMedia, ...urls.map((url, idx) => ({ url, name: files[idx].name }))]);
    } catch (err) {
      console.error("Error uploading files:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Media Library</h2>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        accept="image/*"
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div>
        <h3>Uploaded Media</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {uploadedMedia.map((media) => (
            <div key={media.id} style={{ textAlign: "center" }}>
              <img src={media.url} alt={media.name} style={{ width: "100px", height: "100px" }} />
              <p>{media.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
