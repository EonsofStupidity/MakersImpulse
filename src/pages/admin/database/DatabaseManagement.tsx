import { useSession } from "@supabase/auth-helpers-react";
import DatabaseAccess from "./DatabaseAccess";
import DatabaseTable from "./DatabaseTable";

const DatabaseManagement = () => {
  const session = useSession();

  if (!session) {
    return <DatabaseAccess />;
  }

  return <DatabaseTable />;
};

export default DatabaseManagement;