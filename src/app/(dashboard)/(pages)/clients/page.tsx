'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Search, Users, AlertTriangle, BarChart2, Plus, Filter, Calendar, Activity, Building2, Check, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'Admin' | 'Manager' | 'User';
  signUpDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
  activityLevel: number;
  roleChangeHistory?: {
    date: string;
    from: string;
    to: string;
    reason: string;
    changedBy: string;
  }[];
  pendingRoleRequest?: {
    requestedRole: string;
    requestDate: string;
    documents: string[];
    status: 'pending' | 'approved' | 'rejected';
  };
}

const UserManagementDashboard = () => {
  // Mock data for trends
  const userGrowthTrend = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 145 },
    { month: 'Mar', value: 162 },
    { month: 'Apr', value: 178 },
    { month: 'May', value: 195 },
    { month: 'Jun', value: 210 },
  ];

  const userActivityTrend = [
    { month: 'Jan', value: 70 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 82 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 88 },
  ];

  const newSignupsTrend = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 22 },
    { month: 'Apr', value: 28 },
    { month: 'May', value: 32 },
    { month: 'Jun', value: 38 },
  ];

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@techcorp.com",
      company: "TechCorp Solutions",
      role: "Admin",
      signUpDate: "2024-06-15",
      lastActive: "2024-11-20",
      status: "active",
      activityLevel: 92
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@globalfinance.com",
      company: "Global Finance Inc",
      role: "Manager",
      signUpDate: "2024-07-23",
      lastActive: "2024-11-18",
      status: "active",
      activityLevel: 85
    },
    {
      id: 3,
      name: "Michael Wong",
      email: "michael.w@healthcare.com",
      company: "Healthcare Plus",
      role: "User",
      signUpDate: "2024-08-10",
      lastActive: "2024-10-30",
      status: "inactive",
      activityLevel: 45
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@techcorp.com",
      company: "TechCorp Solutions",
      role: "User",
      signUpDate: "2024-09-05",
      lastActive: "2024-11-19",
      status: "active",
      activityLevel: 78
    },
    {
      id: 5,
      name: "Carlos Rodriguez",
      email: "carlos.r@newstartup.com",
      company: "New Startup LLC",
      role: "Admin",
      signUpDate: "2024-10-12",
      lastActive: "2024-11-01",
      status: "pending",
      activityLevel: 60
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [filterActivity, setFilterActivity] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const [showRoleHistory, setShowRoleHistory] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === '' || user.role === filterRole;
    const matchesCompany = filterCompany === '' || user.company === filterCompany;
    
    let matchesActivity = true;
    if (filterActivity === 'high') {
      matchesActivity = user.activityLevel >= 75;
    } else if (filterActivity === 'medium') {
      matchesActivity = user.activityLevel >= 40 && user.activityLevel < 75;
    } else if (filterActivity === 'low') {
      matchesActivity = user.activityLevel < 40;
    }
    
    return matchesSearch && matchesRole && matchesCompany && matchesActivity;
  });

  // Get unique companies for the filter dropdown
  const uniqueCompanies = Array.from(new Set(users.map(user => user.company)));

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const averageActivityLevel = users.reduce((sum, user) => sum + user.activityLevel, 0) / users.length;

  const StatCard = ({ title, value, trend, data, color, percentageChange }) => (
    <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
          +{percentageChange}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold mb-1">{value}</p>
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

  const getActivityLevelColor = (level: number) => {
    if (level >= 75) return 'text-green-400';
    if (level >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400',
      inactive: 'bg-red-500/20 text-red-400',
      pending: 'bg-yellow-500/20 text-yellow-400'
    };
    return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
  };

  // Role change handler
  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleDialog(true);
  };

  // Confirm role change
  const confirmRoleChange = () => {
    if (!selectedUser || !newRole || !changeReason) {
      console.log('Missing required fields:', { selectedUser, newRole, changeReason });
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        console.log('Updating user:', user.name, 'from', user.role, 'to', newRole);
        return {
          ...user,
          role: newRole as 'Admin' | 'Manager' | 'User',
          roleChangeHistory: [
            ...(user.roleChangeHistory || []),
            {
              date: new Date().toISOString(),
              from: user.role,
              to: newRole,
              reason: changeReason,
              changedBy: 'Current Admin'
            }
          ]
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowRoleDialog(false);
    setSelectedUser(null);
    setNewRole('');
    setChangeReason('');
  };

  // Add this to debug state changes
  useEffect(() => {
    console.log('Users updated:', users);
  }, [users]);

  // Add this inside your JSX, before the Users Table
  const roleManagementSection = (
    <div className="mb-8 mt-10">
      <h2 className="text-lg font-semibold mb-4">Role Management</h2>
      <div className="bg-[#050607] border border-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Role Requests */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Pending Role Requests</h3>
            {users.filter(user => user.pendingRoleRequest?.status === 'pending').map(user => (
              <div key={user.id} className="bg-gray-900/50 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      Requesting: {user.pendingRoleRequest?.requestedRole}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-400 hover:text-green-300">
                      <Check size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Role Changes */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Role Changes</h3>
            {users
              .filter(user => user.roleChangeHistory?.length)
              .slice(0, 5)
              .map(user => (
                <div key={user.id} className="bg-gray-900/50 p-4 rounded-lg mb-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.roleChangeHistory?.slice(-1).map((change, idx) => (
                    <div key={idx} className="text-xs text-gray-400">
                      <p>{change.from} → {change.to}</p>
                      <p className="text-gray-500">{new Date(change.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Add this modal component at the end of your return statement
  const roleChangeDialog = showRoleDialog && selectedUser && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Change User Role</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">New Role</label>
            <select
              className="bg-[#050607] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Reason for Change</label>
            <textarea
              className="bg-[#050607] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
              onClick={() => setShowRoleDialog(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/50"
              onClick={confirmRoleChange}
            >
              Confirm Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">User Management</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={totalUsers}
            trend="10% increase from last month"
            data={userGrowthTrend}
            color="blue"
            percentageChange={10}
          />
          
          <StatCard
            title="Active Users"
            value={`${activeUsers} (${((activeUsers / totalUsers) * 100).toFixed(1)}%)`}
            trend="Active in the last 30 days"
            data={userActivityTrend}
            color="green"
            percentageChange={8}
          />
          
          <StatCard
            title="New Sign-ups"
            value="38"
            trend="This month"
            data={newSignupsTrend}
            color="purple"
            percentageChange={15}
          />
        </div>

        {/* Search, Filters and Add User */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, company..."
                className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
            <button
              className="bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
          <button
            className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add User
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[#0a0b0c] border border-gray-800 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Users size={16} className="inline mr-2" />
                Filter by Role
              </label>
              <select
                className="bg-[#050607] border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-gray-700 w-full"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Filter by Company
              </label>
              <select
                className="bg-[#050607] border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-gray-700 w-full"
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                <option value="">All Companies</option>
                {uniqueCompanies.map((company, index) => (
                  <option key={index} value={company}>{company}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Activity size={16} className="inline mr-2" />
                Filter by Activity Level
              </label>
              <select
                className="bg-[#050607] border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-gray-700 w-full"
                value={filterActivity}
                onChange={(e) => setFilterActivity(e.target.value)}
              >
                <option value="">All Activity Levels</option>
                <option value="high">High (75%+)</option>
                <option value="medium">Medium (40-74%)</option>
                <option value="low">Low (0-39%)</option>
              </select>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sign-up Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{user.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{user.signUpDate}</div>
                    <div className="text-xs text-gray-400">Last active: {user.lastActive}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${getActivityLevelColor(user.activityLevel)}`}>
                        {user.activityLevel}%
                      </span>
                      <div className="ml-2 w-24 h-2 bg-gray-800 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            user.activityLevel >= 75 ? 'bg-green-500' : 
                            user.activityLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${user.activityLevel}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button 
                        className="text-gray-400 hover:text-blue-400 transition-colors" 
                        title="Change Role"
                        onClick={() => handleRoleChange(user)}
                      >
                        <Users size={20} />
                      </button>
                      {user.status === 'pending' ? (
                        <>
                          <button className="text-gray-400 hover:text-green-400 transition-colors" title="Approve">
                            <Check size={20} />
                          </button>
                          <button className="text-gray-400 hover:text-red-400 transition-colors" title="Reject">
                            <X size={20} />
                          </button>
                        </>
                      ) : (
                        <button className="text-gray-400 hover:text-yellow-400 transition-colors" title="Flag User">
                          <AlertTriangle size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {roleManagementSection}
      {roleChangeDialog}
    </div>
  );
};

export default UserManagementDashboard;