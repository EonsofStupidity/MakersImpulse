import React from "react";
import { Link } from "react-router-dom";
import { FileText, Image, Users, MessageSquare } from "lucide-react";

export const AdminNav = () => {
  return (
    <nav className="glass mb-8 p-4">
      <ul className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
        <li>
          <Link 
            to="/admin/post-editor" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff69b4] transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/posts" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff69b4] transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>Manage Posts</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/media" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff69b4] transition-all duration-200"
          >
            <Image className="w-4 h-4" />
            <span>Media Library</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/users" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff69b4] transition-all duration-200"
          >
            <Users className="w-4 h-4" />
            <span>Manage Users</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};