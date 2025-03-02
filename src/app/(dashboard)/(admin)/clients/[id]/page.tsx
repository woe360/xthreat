'use client'
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Mail, Phone, MapPin, Calendar as CalendarIcon, Users, CreditCard, BarChart2, MessageSquare, AlertTriangle, Search, ChevronLeft, Pencil, Save, Trash2, PowerOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
  status: 'active' | 'inactive';
}

interface TimelineEvent {
  id: number;
  clientId: number;
  eventType: 'subscription_change' | 'payment' | 'risk_update' | 'note';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  completedModules: number;
}

const ClientDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const clientId = parseInt(resolvedParams.id);

  // Mock data - In a real app, this would come from an API
  const [client, setClient] = useState<Client>({
    id: clientId,
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
    notes: "Enterprise client with high engagement",
    status: 'active'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<Client>(client);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedClient(client);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    setClient(editedClient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedClient(client);
  };

  const handleInputChange = (field: keyof Omit<Client, 'primaryContact'>, value: any) => {
    setEditedClient(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof Client['primaryContact'], value: string) => {
    setEditedClient(prev => ({
      ...prev,
      primaryContact: {
        ...prev.primaryContact,
        [field]: value
      }
    }));
  };

  const handleDelete = () => {
    // In a real app, this would make an API call to delete the client
    router.push('/clients');
  };

  const handleDeactivate = () => {
    // In a real app, this would make an API call to deactivate the client
    setClient(prev => ({ ...prev, status: prev.status === 'active' ? 'inactive' : 'active' }));
    setShowDeactivateConfirm(false);
  };

  const users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@techcorp.com",
      role: "Admin",
      lastActive: "2024-03-20",
      completedModules: 10
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@techcorp.com",
      role: "User",
      lastActive: "2024-03-19",
      completedModules: 8
    }
  ];

  const timeline: TimelineEvent[] = [
    {
      id: 1,
      clientId: clientId,
      eventType: 'subscription_change',
      description: 'Upgraded to Advanced tier',
      timestamp: '2024-02-15T10:00:00Z'
    },
    {
      id: 2,
      clientId: clientId,
      eventType: 'payment',
      description: 'Monthly payment processed',
      timestamp: '2024-03-01T09:30:00Z'
    },
    {
      id: 3,
      clientId: clientId,
      eventType: 'note',
      description: 'Client requested additional user training',
      timestamp: '2024-03-10T14:20:00Z'
    }
  ];

  const usageData = [
    { month: 'Jan', users: 120, completion: 75 },
    { month: 'Feb', users: 135, completion: 78 },
    { month: 'Mar', users: 150, completion: 82 }
  ];

  const [notes, setNotes] = useState(client.notes);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'activity' | 'manage'>('overview');
  const [activePeriod, setActivePeriod] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const filteredTimeline = timeline.filter(event => {
    const eventDate = new Date(event.timestamp);
    const matchesType = eventTypeFilter === 'all' || event.eventType === eventTypeFilter;
    const matchesDateRange = (!startDate || eventDate >= startDate) &&
      (!endDate || eventDate <= endDate);
    return matchesType && matchesDateRange;
  });

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <button
      onClick={() => setActiveTab(tab as 'overview' | 'users' | 'activity' | 'manage')}
      className={`px-4 py-2 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-blue-500/30 text-blue-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-base">{client.companyName}</h1>
          </div>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-500/30 text-gray-400 hover:bg-gray-500/50 hover:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
            >
              <Pencil size={20} className="mr-2" />
              Edit Client
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete Client</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete {client.companyName}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500/30 text-red-400 hover:bg-red-500/50 hover:text-red-200 px-4 py-2 rounded-lg transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {client.status === 'active' ? 'Deactivate' : 'Activate'} Client
            </h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to {client.status === 'active' ? 'deactivate' : 'activate'} {client.companyName}?
              {client.status === 'active' && " The client won't be able to access the platform while deactivated."}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowDeactivateConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/50 hover:text-yellow-200 px-4 py-2 rounded-lg transition-colors"
                onClick={handleDeactivate}
              >
                {client.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Total Users</h3>
            <Users className="text-blue-400" size={20} />
          </div>
          <p className="text-2xl font-semibold">{client.totalUsers}</p>
          <p className="text-sm text-gray-400">{client.activeUsers} active</p>
        </div>

        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Monthly Revenue</h3>
            <CreditCard className="text-green-400" size={20} />
          </div>
          <p className="text-2xl font-semibold">${client.monthlyPrice}</p>
          <p className="text-sm text-gray-400">Next payment: {client.nextPaymentDate}</p>
        </div>

        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Risk Score</h3>
            <AlertTriangle className="text-yellow-400" size={20} />
          </div>
          <p className="text-2xl font-semibold">{client.riskScore}</p>
          <p className="text-sm text-gray-400">Trend: {client.riskTrend}</p>
        </div>

        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Module Completion</h3>
            <BarChart2 className="text-purple-400" size={20} />
          </div>
          <p className="text-2xl font-semibold">{((client.completedModules / client.totalModules) * 100).toFixed(1)}%</p>
          <p className="text-sm text-gray-400">{client.completedModules}/{client.totalModules} modules</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <TabButton tab="overview" label="Overview" />
        <TabButton tab="users" label="Users" />
        <TabButton tab="activity" label="Activity" />
        <TabButton tab="manage" label="Manage" />
      </div>

      {/* Tab Content */}
      <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Status Section */}
            <div className="bg-[#0d0f12] rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  client.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <h3 className="text-lg font-medium">Account Status</h3>
                  <p className="text-gray-400">
                    This client account is currently {' '}
                    <span className={client.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                          value={editedClient.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                          value={editedClient.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                          value={editedClient.primaryContact.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                          value={editedClient.primaryContact.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-[#181b24] border border-gray-800 rounded-lg px-4 py-2 text-white"
                          value={editedClient.primaryContact.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Subscription Tier
                        </label>
                        <Select
                          value={editedClient.subscriptionTier}
                          onValueChange={(value) => handleInputChange('subscriptionTier', value)}
                        >
                          <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Essential">Essential</SelectItem>
                            <SelectItem value="Core">Core</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm font-medium">Client Since</p>
                          <p className="text-sm text-gray-400">{new Date(client.activeSince).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm font-medium">Subscription Plan</p>
                          <p className="text-sm text-gray-400">{client.subscriptionTier} Plan</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building2 className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm font-medium">Company Address</p>
                          <p className="text-sm text-gray-400">{client.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-400">{client.primaryContact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-400">{client.primaryContact.phone}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-base">Notes</h3>
                    {!isEditing && (
                      <button
                        onClick={() => {
                          // In a real app, this would make an API call to save the notes
                          setClient(prev => ({ ...prev, notes }));
                          // You could show a success toast here
                        }}
                        className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                      >
                        Save
                      </button>
                    )}
                  </div>
                  <textarea
                    className="w-full h-32 bg-[#181b24] border border-gray-800 rounded-lg p-4 text-white resize-none"
                    value={isEditing ? editedClient.notes : notes}
                    onChange={(e) => isEditing ? handleInputChange('notes', e.target.value) : setNotes(e.target.value)}
                    placeholder="Add notes about this client..."
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div>
              <h2 className="text-lg font-base mb-4">Usage Statistics</h2>
              <div className="bg-[#0d0f12] rounded-lg p-6">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">294</h3>
                    <p className="text-gray-400">Total hours this month</p>
                  </div>
                  <div className="flex gap-4">
                    {['Day', 'Week', 'Month', 'Quarter', 'Year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setActivePeriod(period.toLowerCase())}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          activePeriod === period.toLowerCase()
                            ? 'bg-[#181b24] text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex">
                      <div className="w-16 grid grid-rows-7 gap-1 text-sm text-gray-400 py-1">
                        <div className="h-4 flex items-center">Mon</div>
                        <div className="h-4 flex items-center">Tue</div>
                        <div className="h-4 flex items-center">Wed</div>
                        <div className="h-4 flex items-center">Thu</div>
                        <div className="h-4 flex items-center">Fri</div>
                        <div className="h-4 flex items-center">Sat</div>
                        <div className="h-4 flex items-center">Sun</div>
                      </div>
                      <div className="grid grid-rows-7 grid-flow-col gap-1">
                        {Array.from({ length: 364 }, (_, i) => {
                          const col = Math.floor(i / 7);
                          const row = i % 7;
                          const isWeekend = row >= 5;
                          const baseIntensity = isWeekend ? 0.3 : 0.7;
                          const intensity = baseIntensity + (Math.random() * 0.3 - 0.15);
                          
                          return (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-sm ${
                                intensity > 0.7 ? 'bg-orange-600/80' :
                                intensity > 0.5 ? 'bg-orange-700/60' :
                                intensity > 0.3 ? 'bg-orange-800/40' :
                                'bg-[#181b24]'
                              }`}
                              title={`${Math.round(intensity * 100)}% activity`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <div className="w-[200px]">
                  <Select
                    value={roleFilter}
                    onValueChange={(value) => setRoleFilter(value)}
                  >
                    <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#181b24] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <div key={user.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-medium">{user.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.role}</p>
                      <p className="text-sm text-gray-400">Last active: {user.lastActive}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <div className="w-[200px]">
                  <Select
                    value={eventTypeFilter}
                    onValueChange={(value) => setEventTypeFilter(value)}
                  >
                    <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="subscription_change">Subscription Changes</SelectItem>
                      <SelectItem value="payment">Payments</SelectItem>
                      <SelectItem value="note">Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {filteredTimeline.map((event) => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {event.eventType === 'subscription_change' && <Users className="text-blue-400" size={16} />}
                    {event.eventType === 'payment' && <CreditCard className="text-green-400" size={16} />}
                    {event.eventType === 'note' && <MessageSquare className="text-purple-400" size={16} />}
                  </div>
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(event.timestamp).toLocaleDateString()} {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-6">Client Management</h2>
              
              {/* Account Status */}
              <div className="bg-[#0d0f12] rounded-lg p-6 mb-6">
                <h3 className="text-base font-medium mb-4">Account Status</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Current Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      client.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDeactivateConfirm(true)}
                    className="bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/50 hover:text-yellow-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                  >
                    <PowerOff size={20} className="mr-2" />
                    {client.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[#0d0f12] rounded-lg p-6 border border-red-900/50">
                <h3 className="text-base font-medium mb-4 text-red-400">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Delete Client Account</p>
                      <p className="text-sm text-gray-400">
                        Permanently remove this client and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-500/30 text-red-400 hover:bg-red-500/50 hover:text-red-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                    >
                      <Trash2 size={20} className="mr-2" />
                      Delete Client
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsPage; 