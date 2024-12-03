import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Mail, BookOpen, TrendingUp } from "lucide-react";

const attendanceData = [
  { month: "Jan", value: 94 },
  { month: "Feb", value: 37 },
  { month: "Mar", value: 64 },
  { month: "Apr", value: 55 },
  { month: "May", value: 41 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 37 },
];

const keyMetrics = [
  { label: "Employee Turnover", value: 85, color: "#ff69b4" },
  { label: "Speed to Hire (Days)", value: 80, color: "#7FFFD4" },
  { label: "Promotion Rates", value: 70, color: "#FFB6C1" },
  { label: "Success Rate", value: 45, color: "#E6E6FA" },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#9b87f5]/20 border-[#9b87f5]/30 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">EMPLOYEES</p>
              <h3 className="text-2xl font-bold text-white">914,001</h3>
            </div>
            <Users className="h-8 w-8 text-[#9b87f5]" />
          </div>
        </Card>

        <Card className="bg-[#7FFFD4]/20 border-[#7FFFD4]/30 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">MESSAGES</p>
              <h3 className="text-2xl font-bold text-white">2,100</h3>
            </div>
            <Mail className="h-8 w-8 text-[#7FFFD4]" />
          </div>
        </Card>

        <Card className="bg-[#FFB6C1]/20 border-[#FFB6C1]/30 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">VISITORS</p>
              <h3 className="text-2xl font-bold text-white">54,876</h3>
            </div>
            <BookOpen className="h-8 w-8 text-[#FFB6C1]" />
          </div>
        </Card>

        <Card className="bg-[#E6E6FA]/20 border-[#E6E6FA]/30 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">GROWTH RATE</p>
              <h3 className="text-2xl font-bold text-white">46.43%</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-[#E6E6FA]" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attendance Metrics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ff69b4" 
                    strokeWidth={2}
                    dot={{ fill: '#ff69b4' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
            <div className="space-y-6">
              {keyMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-white/60">{metric.label}</span>
                    <span className="text-sm text-white">{metric.value}%</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2 bg-white/5" 
                    indicatorClassName={`bg-[${metric.color}]`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Media Library and Post Editor Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Media Library</h3>
            {/* Render MediaLibrary component here */}
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Post Editor</h3>
            {/* Render PostEditor component here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;