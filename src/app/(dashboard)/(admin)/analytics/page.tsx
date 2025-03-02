'use client'
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { ArrowUp, ArrowDown, Users, Target, ShieldCheck, BrainCircuit } from 'lucide-react';
import { Card } from "@/components/ui/card";

const PerformancePage = () => {
  const assessmentTrends = [
    { month: 'Jan', completion: 82, awareness: 78 },
    { month: 'Feb', completion: 85, awareness: 80 },
    { month: 'Mar', completion: 88, awareness: 85 },
    { month: 'Apr', completion: 92, awareness: 88 },
    { month: 'May', completion: 90, awareness: 86 },
    { month: 'Jun', completion: 94, awareness: 90 },
  ];

  const weeklyEngagement = [
    { name: 'Mon', active: 450, completed: 380 },
    { name: 'Tue', active: 520, completed: 425 },
    { name: 'Wed', active: 480, completed: 400 },
    { name: 'Thu', active: 510, completed: 440 },
    { name: 'Fri', active: 490, completed: 420 },
  ];

  const departmentScores = [
    { department: 'IT', score: 94, change: '+4.2%' },
    { department: 'Finance', score: 88, change: '+2.8%' },
    { department: 'Sales', score: 82, change: '+5.1%' },
    { department: 'Operations', score: 86, change: '+3.2%' },
    { department: 'HR', score: 90, change: '+4.5%' }
  ];

  const securityRisks = [
    { category: 'Phishing', current: 85, target: 90 },
    { category: 'Data Protection', current: 78, target: 85 },
    { category: 'Access Control', current: 92, target: 95 },
    { category: 'Password Security', current: 88, target: 90 }
  ];

  const activityData = [
    { date: 'Apr 5', total: 2500, active: 1800, completed: 1200 },
    { date: 'Apr 10', total: 5000, active: 3500, completed: 2800 },
    { date: 'Apr 15', total: 8000, active: 6000, completed: 4500 },
    { date: 'Apr 20', total: 12000, active: 9000, completed: 7000 },
    { date: 'Apr 25', total: 18000, active: 14000, completed: 11000 },
    { date: 'Apr 30', total: 22000, active: 17000, completed: 14000 },
  ];

  const lessonCompletionData = [
    { month: 'Jan', completed: 150, inProgress: 50, notStarted: 20 },
    { month: 'Feb', completed: 180, inProgress: 45, notStarted: 15 },
    { month: 'Mar', completed: 200, inProgress: 40, notStarted: 10 },
    { month: 'Apr', completed: 220, inProgress: 35, notStarted: 8 },
    { month: 'May', completed: 240, inProgress: 30, notStarted: 5 },
    { month: 'Jun', completed: 260, inProgress: 25, notStarted: 3 },
    { month: 'Jul', completed: 280, inProgress: 20, notStarted: 2 },
  ];

  interface StatCardProps {
    title: string;
    value: string;
    trend: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }

  const StatCard = ({ title, value, trend, icon: Icon, color }: StatCardProps) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-800/50 rounded-lg">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className={`flex items-center text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {Math.abs(trend)}%
        </span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  function PerformanceOverTime() {
    return (
      <Card className="bg-[#181b24] border border-gray-800 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Performance Over Time</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">92%</span>
              <span className="text-xs font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded-full">+8%</span>
            </div>
            <span className="text-sm text-muted-foreground">Average completion rate</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={assessmentTrends}>
              <defs>
                <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAwareness" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="completion" 
                stackId="1"
                stroke="#2563eb" 
                fillOpacity={1}
                fill="url(#colorCompletion)"
              />
              <Area 
                type="monotone" 
                dataKey="awareness" 
                stackId="1"
                stroke="#8B5CF6" 
                fillOpacity={1}
                fill="url(#colorAwareness)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }

  function WeeklyEngagementChart() {
    return (
      <Card className="bg-[#181b24] border border-gray-800 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Weekly Engagement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyEngagement}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar 
                dataKey="active" 
                fill="url(#colorBar)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="completed" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }

  function ActivityOverTime() {
    return (
      <Card className="bg-[#181b24] border border-gray-800 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Activity</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4,571</span>
              <span className="text-xs font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded-full">+15%</span>
            </div>
            <span className="text-sm text-gray-400">User activity</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                stroke="#374151"
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                stroke="#374151"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem'
                }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stackId="1"
                stroke="#f59e0b"
                fill="url(#colorTotal)"
              />
              <Area 
                type="monotone" 
                dataKey="active" 
                stackId="2"
                stroke="#2563eb"
                fill="url(#colorActive)"
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="3"
                stroke="#10b981"
                fill="url(#colorCompleted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }

  function LessonCompletion() {
    return (
      <Card className="bg-[#181b24] border border-gray-800 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lesson Completion</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">14</span>
              <span className="text-xs font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded-full">+12%</span>
            </div>
            <span className="text-sm text-gray-400">Average completion rate across all modules</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={lessonCompletionData}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                stroke="#374151"
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                stroke="#374151"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem'
                }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Bar 
                dataKey="completed" 
                stackId="a"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="inProgress" 
                stackId="a"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="notStarted" 
                stackId="a"
                fill="#374151"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Analytics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Overall Score"
            value="88%"
            trend={4.2}
            icon={Target}
            color="text-blue-400"
          />
          <StatCard
            title="Awareness Level"
            value="92%"
            trend={5.8}
            icon={BrainCircuit}
            color="text-purple-400"
          />
          <StatCard
            title="Active Users"
            value="1,248"
            trend={3.5}
            icon={Users}
            color="text-green-400"
          />
          <StatCard
            title="Security Rating"
            value="A+"
            trend={2.1}
            icon={ShieldCheck}
            color="text-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityOverTime />
          <LessonCompletion />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6">Department Scores</h2>
            <div className="space-y-4">
              {departmentScores.map((dept) => (
                <div key={dept.department} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">{dept.department}</span>
                      <span className="text-sm text-green-400">{dept.change}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${dept.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium">{dept.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6">Security Risk Assessment</h2>
            <div className="space-y-4">
              {securityRisks.map((risk) => (
                <div key={risk.category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">{risk.category}</span>
                      <span className="text-sm text-gray-400">Target: {risk.target}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${risk.current}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium">{risk.current}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;