import React from "react";
import { X } from "lucide-react";

export const Thumbnail = ({ file, onDelete }: { file: File; onDelete: () => void }) => (
  <div className="relative group">
    <img
      src={URL.createObjectURL(file)}
      alt="Thumbnail"
      className="w-full h-full object-cover rounded"
    />
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100"
    >
      <X size={18} />
    </button>
  </div>
);
