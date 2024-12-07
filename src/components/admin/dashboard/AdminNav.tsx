import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Image, 
  Users, 
  MessageSquare, 
  Layers, 
  FileType, 
  GitBranch, 
  Settings,
  BookOpen,
  UserCog,
  Cog
} from "lucide-react";
import { AdminToolbar } from "./AdminToolbar";

export const AdminNav = () => {
  return (
    <>
      <nav className="glass mb-8 p-4">
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
          <li>
            <Link 
              to="/admin/posts" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              <span>Posts</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <UserCog className="w-4 h-4" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <Cog className="w-4 h-4" />
              <span>Site Settings</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/content-management/editor" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              <span>New Post</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/content-management/categories" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <Layers className="w-4 h-4" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/content-management/templates" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <FileType className="w-4 h-4" />
              <span>Templates</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/content-management/workflows" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <GitBranch className="w-4 h-4" />
              <span>Workflows</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/media" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <Image className="w-4 h-4" />
              <span>Media Library</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings/content-types" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#ff0abe] transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Content Types</span>
            </Link>
          </li>
        </ul>
      </nav>
      <AdminToolbar />
    </>
  );
};