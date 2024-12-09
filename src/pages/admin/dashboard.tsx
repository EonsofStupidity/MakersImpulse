import React from "react";
import { AdminTopNav } from "@/components/admin/dashboard/nav/AdminTopNav";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { AdminSidebar } from "@/components/admin/dashboard/sidebar/AdminSidebar";
import NewDashboardOverview from "./core/NewDashboardOverview";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        if (!session?.user?.id) {
          console.log('No session found, redirecting to login');
          toast.error('Please login to access admin dashboard');
          navigate('/login');
          return;
        }

        if (!user || !['admin', 'super_admin'].includes(user.role)) {
          console.error('User is not an admin:', user?.role);
          toast.error('Admin access required');
          navigate('/');
          return;
        }

        console.log('Admin access confirmed for role:', user.role);
        setIsLoading(false);
        toast.success(`Welcome to admin dashboard, ${user.displayName || user.username || 'Admin'}`);
      } catch (error) {
        console.error('Error in admin access check:', error);
        toast.error('Error verifying admin access');
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [session, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-gray-900">
        <AdminTopNav />
        <AdminSidebar />
        <main className="transition-all duration-300 ml-[185px]">
          <div className="container mx-auto p-8">
            <NewDashboardOverview />
          </div>
        </main>
      </div>
    </AdminSidebarProvider>
  );
};

export default AdminDashboard;