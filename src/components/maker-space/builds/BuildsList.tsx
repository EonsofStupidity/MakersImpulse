import React from 'react';
import { Build } from '@/types';

interface BuildsListProps {
  builds: Build[];
}

const BuildsList: React.FC<BuildsListProps> = ({ builds }) => {
  return (
    <div className="grid gap-4">
      {builds.map((build) => (
        <div key={build.id} className="p-4 border rounded">
          <h3>{build.name}</h3>
          <p>{build.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BuildsList;