import { AdminNavContainer } from "./nav/AdminNavContainer";
import { AdminToolbar } from "./AdminToolbar";

export const AdminNav = () => {
  return (
    <div className="fixed top-16 left-0 right-0 z-30">
      <AdminNavContainer />
      <AdminToolbar />
    </div>
  );
};