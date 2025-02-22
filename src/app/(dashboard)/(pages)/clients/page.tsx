'use client'
import React, { useState, ChangeEvent } from 'react';
import { Search, Building2, AlertTriangle, BarChart2, Plus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Client {
  id: number;
  companyName: string;
  totalUsers: number;
  activeUsers: number;
  monthlyPrice: number;
  completedModules: number;
  totalModules: number;
  nextPaymentDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  riskScore: number;
}

const ClientsPage = () => {
  // Mock data for trends
  const clientGrowthTrend = [
    { month: 'Jan', value: 5 },
    { month: 'Feb', value: 8 },
    { month: 'Mar', value: 12 },
    { month: 'Apr', value: 15 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 20 },
  ];

  const userEngagementTrend = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 70 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 82 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 },
  ];

  const revenueGrowthTrend = [
    { month: 'Jan', value: 10000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 22000 },
    { month: 'Apr', value: 28000 },
    { month: 'May', value: 35000 },
    { month: 'Jun', value: 42000 },
  ];

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      companyName: "TechCorp Solutions",
      totalUsers: 150,
      activeUsers: 125,
      monthlyPrice: 2500,
      completedModules: 8,
      totalModules: 12,
      nextPaymentDate: "2024-12-01",
      paymentStatus: 'paid',
      riskScore: 85
    },
    {
      id: 2,
      companyName: "Global Finance Inc",
      totalUsers: 300,
      activeUsers: 275,
      monthlyPrice: 4500,
      completedModules: 10,
      totalModules: 12,
      nextPaymentDate: "2024-11-28",
      paymentStatus: 'pending',
      riskScore: 92
    },
    {
      id: 3,
      companyName: "Healthcare Plus",
      totalUsers: 200,
      activeUsers: 180,
      monthlyPrice: 3500,
      completedModules: 6,
      totalModules: 12,
      nextPaymentDate: "2024-11-15",
      paymentStatus: 'overdue',
      riskScore: 78
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyPrice, 0);
  const totalUsers = clients.reduce((sum, client) => sum + client.totalUsers, 0);
  const averageCompletion = clients.reduce((sum, client) => 
    sum + (client.completedModules / client.totalModules), 0) / clients.length * 100;

  const StatCard = ({ title, value, trend, data, color, percentageChange, prefix = '' }) => (
    <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
          +{percentageChange}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold mb-1">{prefix}{value}</p>
          <p className="text-sm text-gray-400">{trend}</p>
        </div>
        <div className="w-32 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={`var(--${color}-500)`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      overdue: 'bg-red-500/20 text-red-400'
    };
    return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Clients</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Monthly Revenue"
            value={totalRevenue.toLocaleString()}
            trend="15% increase from last month"
            data={revenueGrowthTrend}
            color="green"
            percentageChange={15}
            prefix="$"
          />
          
          <StatCard
            title="Total Users"
            value={totalUsers}
            trend="Active across all clients"
            data={clientGrowthTrend}
            color="blue"
            percentageChange={12}
          />
          
          <StatCard
            title="Average Module Completion"
            value={`${averageCompletion.toFixed(1)}%`}
            trend="Across all clients"
            data={userEngagementTrend}
            color="purple"
            percentageChange={8}
          />
        </div>

        {/* Search and Add Client */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
          <button
            className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Client
          </button>
        </div>

        {/* Clients Table */}
        <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Users</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Building2 size={20} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-white">{client.companyName}</div>
                        <div className="text-sm text-gray-400">${client.monthlyPrice}/month</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Total: {client.totalUsers}</div>
                    <div className="text-sm text-gray-400">Active: {client.activeUsers}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{client.completedModules}/{client.totalModules} Modules</div>
                    <div className="w-24 h-2 bg-gray-800 rounded-full mt-2">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(client.completedModules / client.totalModules) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Next: {client.nextPaymentDate}</div>
                    <div className="mt-1">
                      {getPaymentStatusBadge(client.paymentStatus)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-lg font-semibold ${getRiskColor(client.riskScore)}`}>
                      {client.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <AlertTriangle size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <BarChart2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;