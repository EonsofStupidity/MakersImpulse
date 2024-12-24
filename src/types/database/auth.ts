export interface AuthTables {
  users: {
    Row: {
      id: string;
      email: string;
      role: string;
    };
  };
}