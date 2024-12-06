import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";

const ContentTypesSettings = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Content Types Settings</h1>
        <div className="grid gap-6">
          {/* Content types settings will go here */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-6">
            <p className="text-white/60">Content types configuration coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTypesSettings;