'use client'
import React, { useState, ChangeEvent } from 'react';
import { Search, Building2, AlertTriangle, BarChart2, Plus, Filter, Activity, CreditCard, Users, Download, Mail, FileSpreadsheet, ChevronDown, CheckSquare, Square, RefreshCcw } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface Client {
  id: number;
  companyName: string;
  address: string;
  primaryContact: {
    name: string;
    email: string;
    phone?: string;
  };
  subscriptionTier: 'Essential' | 'Core' | 'Advanced';
  totalUsers: number;
  activeUsers: number;
  monthlyPrice: number;
  completedModules: number;
  totalModules: number;
  nextPaymentDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  riskScore: number;
  riskTrend: 'increasing' | 'decreasing' | 'stable';
  activeSince: string;
  lastModified: string;
  notes: string;
}

interface TimelineEvent {
  id: number;
  clientId: number;
  eventType: 'subscription_change' | 'payment' | 'risk_update' | 'note';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  data: Array<{ month: string; value: number }>;
  color: string;
  percentageChange: number;
  prefix?: string;
}

const ClientsPage = () => {
  const router = useRouter();
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
      address: "123 Tech Street, San Francisco, CA 94105",
      primaryContact: {
        name: "John Smith",
        email: "john@techcorp.com",
        phone: "+1 (555) 123-4567"
      },
      subscriptionTier: "Advanced",
      totalUsers: 150,
      activeUsers: 125,
      monthlyPrice: 2500,
      completedModules: 8,
      totalModules: 12,
      nextPaymentDate: "2024-12-01",
      paymentStatus: 'paid',
      riskScore: 85,
      riskTrend: "stable",
      activeSince: "2023-01-15",
      lastModified: "2024-03-15",
      notes: "Enterprise client with high engagement"
    },
    {
      id: 2,
      companyName: "Global Finance Inc",
      address: "456 Wall Street, New York, NY 10005",
      primaryContact: {
        name: "Sarah Johnson",
        email: "sarah@globalfinance.com",
        phone: "+1 (555) 234-5678"
      },
      subscriptionTier: "Core",
      totalUsers: 300,
      activeUsers: 275,
      monthlyPrice: 4500,
      completedModules: 10,
      totalModules: 12,
      nextPaymentDate: "2024-11-28",
      paymentStatus: 'pending',
      riskScore: 92,
      riskTrend: "increasing",
      activeSince: "2023-03-01",
      lastModified: "2024-03-10",
      notes: "Expanding user base rapidly"
    },
    {
      id: 3,
      companyName: "Healthcare Plus",
      address: "789 Medical Drive, Boston, MA 02115",
      primaryContact: {
        name: "Michael Chen",
        email: "michael@healthcareplus.com",
        phone: "+1 (555) 345-6789"
      },
      subscriptionTier: "Essential",
      totalUsers: 200,
      activeUsers: 180,
      monthlyPrice: 3500,
      completedModules: 6,
      totalModules: 12,
      nextPaymentDate: "2024-11-15",
      paymentStatus: 'overdue',
      riskScore: 78,
      riskTrend: "decreasing",
      activeSince: "2023-06-15",
      lastModified: "2024-03-01",
      notes: "Recent payment issues"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterActivity, setFilterActivity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client | '';
    direction: 'asc' | 'desc';
  }>({ key: '', direction: 'asc' });
  const [selectedClients, setSelectedClients] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  const handleSort = (key: keyof Client) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedClients = React.useMemo(() => {
    if (!sortConfig.key) return [...clients];
    
    return [...clients].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Client];
      const bValue = b[sortConfig.key as keyof Client];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clients, sortConfig]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = sortedClients.filter(client => {
    const matchesSearch = 
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.primaryContact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = filterTier === 'all' || client.subscriptionTier.toLowerCase() === filterTier;
    const matchesPayment = filterPayment === 'all' || client.paymentStatus === filterPayment;
    
    let matchesRisk = true;
    if (filterRisk === 'high') {
      matchesRisk = client.riskScore >= 90;
    } else if (filterRisk === 'medium') {
      matchesRisk = client.riskScore >= 70 && client.riskScore < 90;
    } else if (filterRisk === 'low') {
      matchesRisk = client.riskScore < 70;
    }

    let matchesActivity = true;
    if (filterActivity === 'high') {
      matchesActivity = (client.activeUsers / client.totalUsers) >= 0.75;
    } else if (filterActivity === 'medium') {
      matchesActivity = (client.activeUsers / client.totalUsers) >= 0.4 && (client.activeUsers / client.totalUsers) < 0.75;
    } else if (filterActivity === 'low') {
      matchesActivity = (client.activeUsers / client.totalUsers) < 0.4;
    }
    
    return matchesSearch && matchesTier && matchesPayment && matchesRisk && matchesActivity;
  });

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyPrice, 0);
  const totalUsers = clients.reduce((sum, client) => sum + client.totalUsers, 0);
  const averageCompletion = clients.reduce((sum, client) => 
    sum + (client.completedModules / client.totalModules), 0) / clients.length * 100;

  const StatCard = ({ 
    title, 
    value, 
    trend, 
    data, 
    color, 
    percentageChange, 
    prefix = '' 
  }: StatCardProps) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
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

  const getPaymentStatusBadge = (status: Client['paymentStatus']) => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      overdue: 'bg-red-500/20 text-red-400'
    } as const;
    return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
  };

  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    subscriptionTier: 'Essential' as const,
    primaryContact: { name: '', email: '', phone: '' }
  });

  const handleInputChange = (field: keyof Omit<Client, 'primaryContact'>, value: string) => {
    setNewClient(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof Client['primaryContact'], value: string) => {
    setNewClient(prev => ({
      ...prev,
      primaryContact: {
        name: prev.primaryContact?.name || '',
        email: prev.primaryContact?.email || '',
        phone: prev.primaryContact?.phone || '',
        [field]: value
      }
    }));
  };

  const handleAddClient = () => {
    if (!newClient.companyName || !newClient.primaryContact?.email) {
      alert('Please fill in all required fields');
      return;
    }

    const client: Client = {
      id: clients.length + 1,
      companyName: newClient.companyName || '',
      address: newClient.address || '',
      primaryContact: {
        name: newClient.primaryContact?.name || '',
        email: newClient.primaryContact?.email || '',
        phone: newClient.primaryContact?.phone || ''
      },
      subscriptionTier: newClient.subscriptionTier as 'Essential' | 'Core' | 'Advanced',
      totalUsers: 0,
      activeUsers: 0,
      monthlyPrice: newClient.subscriptionTier === 'Advanced' ? 2500 :
                   newClient.subscriptionTier === 'Core' ? 1500 : 500,
      completedModules: 0,
      totalModules: 12,
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paymentStatus: 'pending',
      riskScore: 50,
      riskTrend: 'stable',
      activeSince: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      notes: ''
    };

    setClients(prev => [...prev, client]);
    setIsAddClientModalOpen(false);
    setNewClient({
      subscriptionTier: 'Essential' as const,
      primaryContact: { name: '', email: '', phone: '' }
    });
  };

  // Add Client Modal
  const AddClientModal = () => {
    if (!isAddClientModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-6">Add New Client</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.companyName || ''}
                onChange={e => handleInputChange('companyName', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Company Address
              </label>
              <input
                type="text"
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.address || ''}
                onChange={e => handleInputChange('address', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.primaryContact?.name || ''}
                onChange={e => handleContactChange('name', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.primaryContact?.email || ''}
                onChange={e => handleContactChange('email', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.primaryContact?.phone || ''}
                onChange={e => handleContactChange('phone', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Subscription Tier
              </label>
              <select
                className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={newClient.subscriptionTier}
                onChange={e => handleInputChange('subscriptionTier', e.target.value as Client['subscriptionTier'])}
              >
                <option value="Essential">Essential</option>
                <option value="Core">Core</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsAddClientModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 px-4 py-2 rounded-lg transition-colors"
              onClick={handleAddClient}
            >
              Add Client
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSelectClient = (clientId: number) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedClients.size === filteredClients.length) {
      setSelectedClients(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedClients(new Set(filteredClients.map(client => client.id)));
      setShowBulkActions(true);
    }
  };

  const handleExportCSV = () => {
    const selectedClientsData = filteredClients.filter(client => selectedClients.has(client.id));
    const csvData = selectedClientsData.map(client => ({
      'Company Name': client.companyName,
      'Contact Name': client.primaryContact.name,
      'Contact Email': client.primaryContact.email,
      'Contact Phone': client.primaryContact.phone,
      'Subscription Tier': client.subscriptionTier,
      'Total Users': client.totalUsers,
      'Active Users': client.activeUsers,
      'Monthly Price': client.monthlyPrice,
      'Risk Score': client.riskScore,
      'Payment Status': client.paymentStatus,
      'Active Since': client.activeSince,
    }));

    // Convert to CSV and download
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => JSON.stringify(row[header as keyof typeof row])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clients_export.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-base">Clients</h1>
          <button
            onClick={() => setIsAddClientModalOpen(true)}
            className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Client
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Revenue</h3>
              <CreditCard className="text-green-400" size={20} />
            </div>
            <p className="text-2xl font-semibold">${totalRevenue}</p>
            <p className="text-sm text-gray-400">+12% from last month</p>
          </div>

          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Users</h3>
              <Users className="text-blue-400" size={20} />
            </div>
            <p className="text-2xl font-semibold">{totalUsers}</p>
            <p className="text-sm text-gray-400">+8% from last month</p>
          </div>

          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Average Risk Score</h3>
              <AlertTriangle className="text-yellow-400" size={20} />
            </div>
            <p className="text-2xl font-semibold">82</p>
            <p className="text-sm text-gray-400">Trend: stable</p>
          </div>

          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Module Completion</h3>
              <BarChart2 className="text-purple-400" size={20} />
            </div>
            <p className="text-2xl font-semibold">{averageCompletion.toFixed(1)}%</p>
            <p className="text-sm text-gray-400">+5% from last month</p>
          </div>
        </div>

        {/* Search, Filters, and Bulk Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-[#181b24] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button
              className="bg-[#181b24] text-gray-400 hover:bg-[#232734] hover:text-gray-300 font-medium py-2 px-4 rounded-lg flex items-center transition-colors border border-gray-800"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>

          {showBulkActions && (
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800 w-[200px]">
                  <SelectValue placeholder="Bulk Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      Send Email
                    </div>
                  </SelectItem>
                  <SelectItem value="subscription">
                    <div className="flex items-center">
                      <RefreshCcw size={16} className="mr-2" />
                      Update Subscription
                    </div>
                  </SelectItem>
                  <SelectItem value="export">
                    <div className="flex items-center" onClick={handleExportCSV}>
                      <FileSpreadsheet size={16} className="mr-2" />
                      Export to CSV
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <button
                onClick={() => setSelectedClients(new Set())}
                className="bg-[#181b24] text-gray-400 hover:bg-[#232734] hover:text-gray-300 font-medium py-2 px-4 rounded-lg flex items-center transition-colors border border-gray-800"
              >
                Clear Selection ({selectedClients.size})
              </button>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Subscription Tier
              </label>
              <Select
                value={filterTier}
                onValueChange={(value) => setFilterTier(value)}
              >
                <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="essential">Essential</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <AlertTriangle size={16} className="inline mr-2" />
                Risk Level
              </label>
              <Select
                value={filterRisk}
                onValueChange={(value) => setFilterRisk(value)}
              >
                <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk (90+)</SelectItem>
                  <SelectItem value="medium">Medium Risk (70-89)</SelectItem>
                  <SelectItem value="low">Low Risk (0-69)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <CreditCard size={16} className="inline mr-2" />
                Payment Status
              </label>
              <Select
                value={filterPayment}
                onValueChange={(value) => setFilterPayment(value)}
              >
                <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Activity size={16} className="inline mr-2" />
                Activity Level
              </label>
              <Select
                value={filterActivity}
                onValueChange={(value) => setFilterActivity(value)}
              >
                <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                  <SelectValue placeholder="Filter by activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activity Levels</SelectItem>
                  <SelectItem value="high">High (75%+ active)</SelectItem>
                  <SelectItem value="medium">Medium (40-74% active)</SelectItem>
                  <SelectItem value="low">Low (0-39% active)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left">
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={handleSelectAll}
                  >
                    {selectedClients.size === filteredClients.length ? (
                      <CheckSquare size={20} />
                    ) : (
                      <Square size={20} />
                    )}
                  </button>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('companyName')}
                >
                  Company
                  {sortConfig.key === 'companyName' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('subscriptionTier')}
                >
                  Subscription
                  {sortConfig.key === 'subscriptionTier' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('totalUsers')}
                >
                  Users
                  {sortConfig.key === 'totalUsers' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('activeSince')}
                >
                  Active Since
                  {sortConfig.key === 'activeSince' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('paymentStatus')}
                >
                  Payment
                  {sortConfig.key === 'paymentStatus' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('riskScore')}
                >
                  Risk Score
                  {sortConfig.key === 'riskScore' && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => handleSelectClient(client.id)}
                    >
                      {selectedClients.has(client.id) ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Building2 size={20} className="text-gray-400 mr-3" />
                      <div>
                        <div 
                          className="text-sm font-medium text-white hover:text-blue-400 cursor-pointer"
                          onClick={() => router.push(`/clients/${client.id}`)}
                        >
                          {client.companyName}
                        </div>
                        <div className="text-sm text-gray-400">{client.primaryContact.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      client.subscriptionTier === 'Advanced' ? 'bg-purple-500/20 text-purple-400' :
                      client.subscriptionTier === 'Core' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {client.subscriptionTier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Total: {client.totalUsers}</div>
                    <div className="text-sm text-gray-400">Active: {client.activeUsers}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{new Date(client.activeSince).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-400">
                      {Math.floor((Date.now() - new Date(client.activeSince).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Next: {client.nextPaymentDate}</div>
                    <div className="mt-1">
                      {getPaymentStatusBadge(client.paymentStatus)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${getRiskColor(client.riskScore)}`}>
                        {client.riskScore}
                      </span>
                      <span className={`ml-2 ${
                        client.riskTrend === 'increasing' ? 'text-red-400' :
                        client.riskTrend === 'decreasing' ? 'text-green-400' :
                        'text-gray-400'
                      }`}>
                        {client.riskTrend === 'increasing' ? '↑' :
                         client.riskTrend === 'decreasing' ? '↓' :
                         '→'}
                      </span>
                    </div>
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

        {/* Add Client Modal */}
        <AddClientModal />
      </div>
    </div>
  );
};

export default ClientsPage;