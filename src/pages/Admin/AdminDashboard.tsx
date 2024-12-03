import React from "react";
import PostEditor from "../components/cms/PostEditor";
import MediaLibrary from "../components/cms/MediaLibrary";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <PostEditor />
      <MediaLibrary />
    </div>
  );
};

export default AdminDashboard;