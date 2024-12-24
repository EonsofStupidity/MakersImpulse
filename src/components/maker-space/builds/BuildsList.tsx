import React from 'react';
import { Build } from '@/types';
import { useBuildsQuery } from '@/hooks/builds/useBuildsQuery';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const BuildsList = () => {
  const { data: builds, isLoading, error } = useBuildsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading builds: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {builds?.map((build: Build) => (
        <Card key={build.id} className="p-4">
          <h2 className="text-lg font-bold">{build.name}</h2>
          <p>{build.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default BuildsList;
