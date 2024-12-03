import React from "react";
import PostEditor from "../../pages/cms/PostEditor";
import MediaLibrary from "./MediaLibrary";

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