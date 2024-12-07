import { AlertTriangle } from 'lucide-react';

export const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
    <AlertTriangle className="h-12 w-12 text-destructive" />
    <h2 className="text-xl font-semibold text-destructive">Access Denied</h2>
    <p className="text-muted-foreground">You don't have permission to access this page.</p>
  </div>
);