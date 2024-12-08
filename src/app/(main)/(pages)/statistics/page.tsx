'use client'
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUp, ArrowDown, Users, Target, ShieldCheck, BrainCircuit } from 'lucide-react';

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

  const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
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

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div className="flex justify-between items-center mb-8 mt-1">
        <h1 className="text-xl font-base text-white">Performance</h1>
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
        <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
          <h2 className="text-lg font-base mb-6">Assessment Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={assessmentTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ background: '#111827', border: '1px solid #374151' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Line type="monotone" dataKey="completion" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="awareness" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
          <h2 className="text-lg font-base mb-6">Weekly Engagement</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ background: '#111827', border: '1px solid #374151' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Bar dataKey="active" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
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

        <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
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
  );
};

export default PerformancePage;