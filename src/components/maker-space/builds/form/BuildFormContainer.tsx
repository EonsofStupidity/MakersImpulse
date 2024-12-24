import React, { useState } from 'react';
import { BuildFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface BuildFormContainerProps {
  initialData: BuildFormData;
  onSubmit: (data: BuildFormData) => void;
}

const BuildFormContainer: React.FC<BuildFormContainerProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<BuildFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success('Build data submitted successfully!');
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Build Name</label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="build_volume" className="block text-sm font-medium text-gray-700">Build Volume</label>
          <Input
            id="build_volume"
            name="build_volume"
            value={formData.build_volume}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">Submit Build</Button>
      </form>
    </Card>
  );
};

export default BuildFormContainer;
