import React from 'react';
import { AdminNav } from '@/components/admin/dashboard/AdminNav';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        {/* Dashboard content will be implemented later */}
      </div>
    </div>
  );
};

export default AdminDashboard;