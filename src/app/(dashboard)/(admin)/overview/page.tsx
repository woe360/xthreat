'use client'
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { X, ArrowUpRight, Building2, Users, Target, AlertTriangle } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  totalUsers: number;
  activeUsers: number;
  awarenessScore: number;
  riskScore: number;
  engagementRate: number;
  trend: { month: string; value: number; }[];
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  trend: Array<{ month: string; value: number }>;
}

interface CompanyDetailProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

const CompanyDetailPanel: React.FC<CompanyDetailProps> = ({ company, isOpen, onClose }) => {
  if (!isOpen) return null;

  const stats = [
    { icon: Users, label: "Total Users", value: company?.totalUsers.toLocaleString() },
    { icon: Target, label: "Awareness Score", value: `${company?.awarenessScore}%` },
    { icon: AlertTriangle, label: "Risk Score", value: `${company?.riskScore}%` }
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-[#0a0b0c] border-l border-white/[0.06] transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h2 className="text-lg font-medium">Company Details</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <div className="text-2xl font-bold text-white mb-2">{company?.name}</div>
          </div>

          <div className="space-y-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center">
                <Icon size={20} className="text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">{label}</div>
                  <div className="text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-sm text-gray-400 mb-4">Performance Trend</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={company?.trend}>
                  <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm text-gray-400 mb-4">Active Users</h3>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(company?.activeUsers || 0) / (company?.totalUsers || 1) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {company?.activeUsers} out of {company?.totalUsers} users active
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm text-gray-400 mb-4">Risk Assessment</h3>
            <div className={`p-4 rounded-lg ${
              (company?.riskScore ?? 0) > 20 ? 'bg-red-500/10 border border-red-500/20' : 
              'bg-green-500/10 border border-green-500/20'
            }`}>
              <p className={`text-sm ${
                (company?.riskScore ?? 0) > 20 ? 'text-red-400' : 'text-green-400'
              }`}>
                {(company?.riskScore ?? 0) > 20 
                  ? 'High risk level detected. Immediate attention required.' 
                  : 'Risk levels are within acceptable range.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend }) => (
  <div className="bg-[#050607] rounded-lg p-6 border border-white/[0.06]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <span className={`text-sm px-2 py-1 rounded ${
        change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <div className="h-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trend}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={change > 0 ? '#4ADE80' : '#F87171'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="text-sm text-gray-400 mt-2">Last 30 days</p>
  </div>
);

const Overview = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 82 },
    { month: 'Jun', value: 88 },
  ];

  const sessionData = Array(30).fill(0).map((_, i) => ({
    date: `Apr ${i + 1}`,
    sessions: 2000 + Math.random() * 5000,
    trend: 3000 + (i * 200) + (Math.random() * 1000)
  }));

  const [companies] = useState<Company[]>([
    {
      id: 1,
      name: "TechCorp Solutions",
      totalUsers: 150,
      activeUsers: 125,
      awarenessScore: 86,
      riskScore: 14,
      engagementRate: 92,
      trend: Array(6).fill(0).map((_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        value: 65 + Math.random() * 20
      }))
    },
    {
      id: 2,
      name: "Global Finance Inc",
      totalUsers: 300,
      activeUsers: 275,
      awarenessScore: 92,
      riskScore: 8,
      engagementRate: 95,
      trend: Array(6).fill(0).map((_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        value: 75 + Math.random() * 20
      }))
    },
    {
      id: 3,
      name: "Healthcare Plus",
      totalUsers: 200,
      activeUsers: 180,
      awarenessScore: 78,
      riskScore: 22,
      engagementRate: 88,
      trend: Array(6).fill(0).map((_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        value: 55 + Math.random() * 20
      }))
    }
  ]);

  return (
    <div className="relative h-screen overflow-auto bg-[#050607] text-gray-100">
      <div className="p-2 px-10">
        <div className="mb-8 mt-3">
          <h1 className="text-xl font-base">Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Awareness Score" value="86%" change={25} trend={monthlyData} />
          <StatCard title="Risk Exposure" value="14%" change={-25} trend={monthlyData} />
          <StatCard title="Engagement Rate" value="92%" change={5} trend={monthlyData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#050607] rounded-lg p-6 border border-white/[0.06]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-sm text-gray-400 font-light">Sessions</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">13,277</span>
                  <span className="ml-2 text-sm text-green-400">+35%</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionData}>
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Line type="monotone" dataKey="trend" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sessions" stroke="#60A5FA" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#050607] rounded-lg p-6 border border-white/[0.06]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-sm text-gray-400 font-light">Page Views</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">1.3M</span>
                  <span className="ml-2 text-sm text-red-400">-8%</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-[#050607] rounded-lg border border-white/[0.06]">
          <div className="p-6 border-b border-white/[0.06]">
            <h2 className="text-lg font-medium">Companies</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {companies.map(company => (
              <div key={company.id} className="p-6 flex items-center justify-between hover:bg-gray-900/50">
                <div className="flex items-center space-x-4">
                  <Building2 size={24} className="text-gray-400" />
                  <div>
                    <h3 className="font-medium">{company.name}</h3>
                    <p className="text-sm text-gray-400">
                      {company.activeUsers} active users / {company.totalUsers} total
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div>
                    <div className="text-sm text-gray-400">Awareness</div>
                    <div className="font-medium">{company.awarenessScore}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Risk</div>
                    <div className={`font-medium ${company.riskScore > 20 ? 'text-red-400' : 'text-green-400'}`}>
                      {company.riskScore}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Engagement</div>
                    <div className="font-medium">{company.engagementRate}%</div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CompanyDetailPanel
          company={selectedCompany}
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      </div>
    </div>
  );
};

export default Overview;