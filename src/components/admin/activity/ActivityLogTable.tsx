import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ActivityLogTable = () => {
  const { data: activityTypes } = useQuery({
    queryKey: ["activity-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_activity")
        .select("activity_type");

      if (error) throw error;
      
      // Get unique activity types using Set
      const uniqueTypes = [...new Set(data?.map(item => item.activity_type))];
      return uniqueTypes || [];
    },
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Activity Types</h2>
      <ul>
        {activityTypes?.map((type, index) => (
          <li key={index} className="text-gray-300">{type}</li>
        ))}
      </ul>
    </div>
  );
};
