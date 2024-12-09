import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminSidebar } from "./sidebar/AdminSidebar";
import { AdminToolbar } from "./AdminToolbar";

export const AdminNav = () => {
  return (
    <>
      <AdminNavContainer />
      <AdminSidebar />
      <AdminToolbar />
    </>
  );
};