'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Search, Users, AlertTriangle, BarChart2, Plus, Filter, Calendar, Activity, Building2, Check, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'

interface RoleChange {
  date: string;
  from: string;
  to: string;
  reason: string;
  changedBy: string;
}

interface PendingRoleRequest {
  requestedRole: string;
  requestDate: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
}

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  company: string;
  role: 'admin' | 'manager' | 'user';
  created_at: string;
  last_sign_in_at: string | null;
  status: 'active' | 'inactive' | 'pending';
  activity_level: number;
  company_id: string;
  roleChangeHistory?: RoleChange[];
  pendingRoleRequest?: PendingRoleRequest;
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  data: Array<{ month: string; value: number }>;
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  percentageChange: number;
}

const UserManagementDashboard = () => {
  const router = useRouter()
  // Initialize Supabase client
  const supabase = createClientComponentClient();

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

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Map the data to match our interface
          const mappedUsers: User[] = data.map(user => ({
            id: user.id,
            email: user.email,
            full_name: `${user.first_name} ${user.last_name}`.trim(),
            company: user.company_name || '',
            role: user.role as 'admin' | 'manager' | 'user',
            created_at: user.signup_date || user.created_at || new Date().toISOString(),
            last_sign_in_at: user.last_login || null,
            status: user.is_active ? 'active' : 'inactive',
            activity_level: 75, // Default activity level since it's not in the DB
            company_id: user.company_id || '',
            avatar_url: undefined,
            roleChangeHistory: [],
            pendingRoleRequest: undefined
          }));
          
          setUsers(mappedUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const [showRoleHistory, setShowRoleHistory] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    role: 'user',
    job_title: '',
    company_size: ''
  });

  // Add error state for the form
  const [formError, setFormError] = useState<string | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => {
    const searchValue = searchTerm.toLowerCase();
    const matchesSearch = 
      searchTerm === '' || 
      user.full_name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.company?.toLowerCase().includes(searchValue);
    
    const matchesRole = filterRole === 'all' || (user.role?.toLowerCase() || '') === filterRole.toLowerCase();
    const matchesCompany = filterCompany === 'all' || user.company === filterCompany;
    
    return matchesSearch && matchesRole && matchesCompany;
  });

  // Get unique companies for the filter dropdown (filter out empty companies)
  const uniqueCompanies = Array.from(new Set(users.map(user => user.company).filter(company => company && company.trim() !== '')));

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const averageActivityLevel = users.reduce((sum, user) => sum + user.activity_level, 0) / users.length;

  const StatCard = ({ title, value, trend, data, color, percentageChange }: StatCardProps) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
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



  // Role change handler
  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleDialog(true);
  };

  // Confirm role change
  const confirmRoleChange = async () => {
    if (!selectedUser || !newRole || !changeReason) {
      console.log('Missing required fields:', { selectedUser, newRole, changeReason });
      return;
    }

    try {
      // Update role in database
      const { error } = await supabase
        .from('users')
        .update({ role: newRole.toLowerCase() })
        .eq('id', selectedUser.id);

      if (error) {
        console.error('Error updating role in database:', error);
        setFormError('Failed to update role in database');
        return;
      }

      // Update local state
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          console.log('Updating user:', user.full_name, 'from', user.role, 'to', newRole);
          return {
            ...user,
            role: newRole.toLowerCase() as 'admin' | 'manager' | 'user',
            roleChangeHistory: [
              ...(user.roleChangeHistory || []),
              {
                date: new Date().toISOString(),
                from: user.role,
                to: newRole.toLowerCase(),
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
    } catch (error) {
      console.error('Error updating role:', error);
      setFormError('An unexpected error occurred while updating the role');
    }
  };

  // Add this to debug state changes
  useEffect(() => {
    console.log('Users updated:', users);
  }, [users]);

  // Add this inside your JSX, before the Users Table
  const roleManagementSection = (
    <div className="px-10 mb-8">
      <h2 className="text-lg font-base mb-8 mt-6">Role Management</h2>
      <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Role Requests */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Pending Role Requests</h3>
            {users.filter(user => user.pendingRoleRequest?.status === 'pending').map(user => (
              <div key={user.id} className="bg-[#050607] border border-gray-800 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{user.full_name}</p>
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
            {users.filter(user => user.pendingRoleRequest?.status === 'pending').length === 0 && (
              <div className="bg-[#050607] border border-gray-800 rounded-lg p-4 text-sm text-gray-400">
                No pending requests
              </div>
            )}
          </div>

          {/* Recent Role Changes */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Role Changes</h3>
            {users
              .flatMap(user => 
                (user.roleChangeHistory || []).map(change => ({
                  ...change,
                  userName: user.full_name,
                  userId: user.id
                }))
              )
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((change, idx) => (
                <div key={`${change.userId}-${idx}`} className="bg-[#050607] border border-gray-800 p-4 rounded-lg mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white mb-1">{change.userName}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">{change.from}</span>
                        <span className="text-gray-500">→</span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded">{change.to}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {new Date(change.date).toLocaleDateString()} at {new Date(change.date).toLocaleTimeString()}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Changed by: {change.changedBy}
                      </div>
                      {change.reason && (
                        <div className="mt-2 text-xs text-gray-400">
                          Reason: {change.reason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {users.filter(user => user.roleChangeHistory?.length).length === 0 && (
              <div className="bg-[#050607] border border-gray-800 rounded-lg p-4 text-sm text-gray-400">
                No recent role changes
              </div>
            )}
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
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
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

  // Update the handleAddUser function
  const handleAddUser = async () => {
    try {
      setFormError(null); // Clear any previous errors

      // Validate required fields
      if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.company_name) {
        setFormError('Please fill in all required fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUser.email)) {
        setFormError('Please enter a valid email address');
        return;
      }

      // Insert the new user into Supabase
      console.log('Attempting to add user with data:', {
        first_name: newUser.first_name.trim(),
        last_name: newUser.last_name.trim(),
        email: newUser.email.trim().toLowerCase(),
        company_name: newUser.company_name.trim(),
        role: newUser.role,
        job_title: newUser.job_title.trim(),
        company_size: newUser.company_size,
        is_active: true
      });

      const { data, error: supabaseError } = await supabase
        .from('users')
        .insert([{
          first_name: newUser.first_name.trim(),
          last_name: newUser.last_name.trim(),
          email: newUser.email.trim().toLowerCase(),
          company_name: newUser.company_name.trim(),
          role: newUser.role,
          job_title: newUser.job_title.trim(),
          company_size: newUser.company_size,
          is_active: true
        }])
        .select();

      if (supabaseError) {
        console.error('Supabase error details:', {
          code: supabaseError.code,
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint
        });
        
        if (supabaseError.code === '23505') { // Unique constraint error
          setFormError('A user with this email already exists');
        } else {
          setFormError(`Failed to add user: ${supabaseError.message || 'Unknown error occurred'}`);
        }
        return;
      }

      if (!data || data.length === 0) {
        setFormError('No data returned from the server');
        return;
      }

      // Map the new user to our interface and add to the users list
      const mappedNewUser: User = {
        id: data[0].id,
        email: data[0].email,
        full_name: `${data[0].first_name} ${data[0].last_name}`.trim(),
        company: data[0].company_name || '',
        role: data[0].role as 'admin' | 'manager' | 'user',
        created_at: data[0].created_at,
        last_sign_in_at: null,
        status: 'active',
        activity_level: 75,
        company_id: '',
        avatar_url: undefined,
        roleChangeHistory: [],
        pendingRoleRequest: undefined
      };

      setUsers([...users, mappedNewUser]);
      setShowAddUserDialog(false);
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        role: 'user',
        job_title: '',
        company_size: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
      setFormError('An unexpected error occurred');
    }
  };

  // Update the addUserDialog to show form errors
  const addUserDialog = showAddUserDialog && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Add New User</h3>
        {formError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {formError}
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newUser.company_name}
              onChange={(e) => setNewUser({ ...newUser, company_name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Job Title</label>
            <input
              type="text"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newUser.job_title}
              onChange={(e) => setNewUser({ ...newUser, job_title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Company Size</label>
            <select
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newUser.company_size}
              onChange={(e) => setNewUser({ ...newUser, company_size: e.target.value })}
            >
              <option value="">Select company size</option>
              <option value="1">1</option>
              <option value="2-10">2-10</option>
              <option value="11-50">11-50</option>
              <option value="51-250">51-250</option>
              <option value="251-500">251-500</option>
              <option value="501+">501+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Role</label>
            <select
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
              onClick={() => setShowAddUserDialog(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/50"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen bg-[#050607] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-screen bg-[#050607] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#050607]">
      <div className="h-full overflow-y-auto">
        <div className="p-4 px-10">
          <div className="flex justify-between items-center mb-8 mt-1">
            <h1 className="text-xl font-base text-white">Users</h1>
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
            <div className="flex gap-3">
              <div className="w-[200px]">
                <Select
                  value={filterRole}
                  onValueChange={setFilterRole}
                >
                  <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[200px]">
                <Select
                  value={filterCompany}
                  onValueChange={setFilterCompany}
                >
                  <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                    <SelectValue placeholder="Filter by company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {uniqueCompanies.map((company, index) => (
                      <SelectItem key={index} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-[#181b24] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <button
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              onClick={() => setShowAddUserDialog(true)}
            >
              <Plus size={20} className="mr-2" />
              Add User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-900/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center mr-3">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.full_name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{user.company}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                        user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        className="text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-blue-500/10" 
                        title="Change Role"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoleChange(user);
                        }}
                      >
                        <Users size={16} />
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {roleManagementSection}
        {roleChangeDialog}
        {addUserDialog}
      </div>
    </div>
  );
};

export default UserManagementDashboard;