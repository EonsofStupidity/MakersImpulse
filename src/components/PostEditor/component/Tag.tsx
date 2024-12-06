import React from "react";
import { X } from "lucide-react";

export const Tag = ({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#41f0db]/10">
    {tag}
    <button onClick={() => onRemove(tag)} className="ml-2 hover:text-[#ff0abe]">
      <X size={14} />
    </button>
  </span>
);
