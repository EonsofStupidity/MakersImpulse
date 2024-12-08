import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const DataAnalysis = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
            Data Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze and visualize your data
          </p>
        </div>
        <Button>
          <ChartBar className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6">
          <h3 className="font-medium mb-4">Data Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Records</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processing Rate</p>
              <p className="text-2xl font-bold">98.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data Quality Score</p>
              <p className="text-2xl font-bold">4.8/5.0</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalysis;