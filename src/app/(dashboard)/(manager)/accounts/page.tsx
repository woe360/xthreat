'use client'
import React, { useState, useEffect } from 'react';
import { Search, UserPlus, UserMinus, BarChart2, FolderOpen } from 'lucide-react';
import { CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { getTabSpecificSupabaseClient } from '@/lib/supabase/client';

const AccountsPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    job_title: '',
    company_name: '',
    company_size: '',
    selected_plan: ''
  });

  // Fetch current user info and employees
  useEffect(() => {
    fetchCurrentUserAndEmployees();
  }, []);

  const fetchCurrentUserAndEmployees = async () => {
    try {
      const supabase = getTabSpecificSupabaseClient();
      
      // Get current user info
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setCurrentUser(userData);
        
        // Pre-fill company info from current user
        if (userData) {
          setNewEmployee(prev => ({
            ...prev,
            company_name: userData.company_name || '',
            company_size: userData.company_size || '',
            selected_plan: userData.selected_plan || ''
          }));
        }
      }
      
      // Fetch all employees from the same company
      const { data: employeesData, error } = await supabase
        .from('users')
        .select('*')
        .in('role', ['user', 'manager'])
        .order('first_name');
      
      if (error) {
        console.error('Error fetching employees:', error);
      } else {
        setEmployees(employeesData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts
  const activeUsersTrend = [
    { value: 10 },
    { value: 15 },
    { value: 25 },
    { value: 32 },
    { value: 45 },
  ];

  const completedCourseTrend = [
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 25 },
    { value: 33 },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.first_name || ''} ${employee.last_name || ''}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) ||
           (employee.email || '').toLowerCase().includes(searchLower) ||
           (employee.job_title || '').toLowerCase().includes(searchLower);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEmployee = async () => {
    if (newEmployee.first_name && newEmployee.last_name && newEmployee.email && newEmployee.job_title) {
      try {
        const supabase = getTabSpecificSupabaseClient();
        
        const { data, error } = await supabase
          .from('users')
          .insert([{
            first_name: newEmployee.first_name,
            last_name: newEmployee.last_name,
            email: newEmployee.email,
            job_title: newEmployee.job_title,
            company_name: newEmployee.company_name,
            company_size: newEmployee.company_size,
            selected_plan: newEmployee.selected_plan,
            role: 'user',
            is_active: true
          }])
          .select();

        if (error) {
          console.error('Error adding employee:', error);
          alert('Error adding employee. Please try again.');
        } else {
          // Refresh the employees list
          await fetchCurrentUserAndEmployees();
          setNewEmployee({ 
            first_name: '', 
            last_name: '', 
            email: '', 
            job_title: '',
            company_name: currentUser?.company_name || '',
            company_size: currentUser?.company_size || '',
            selected_plan: currentUser?.selected_plan || ''
          });
          setShowAddModal(false);
          alert('Employee added successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding employee. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleRemoveEmployee = async (id: string) => {
    if (confirm('Are you sure you want to remove this employee?')) {
      try {
        const supabase = getTabSpecificSupabaseClient();
        
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error removing employee:', error);
          alert('Error removing employee. Please try again.');
        } else {
          // Refresh the employees list
          await fetchCurrentUserAndEmployees();
          alert('Employee removed successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error removing employee. Please try again.');
      }
    }
  };

  const StatCard = ({ title, value, trend, data, color, percentageChange }: {
    title: string;
    value: number;
    trend: string;
    data: any[];
    color: string;
    percentageChange: number;
  }) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
          +{percentageChange}%
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{trend}</p>
        </div>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={`rgb(var(--${color}-500))`} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 flex items-center justify-center">
        <div className="text-white">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#0b0b0b] text-neutral-100 px-10 py-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl md:text-3xl font-light text-white">Accounts</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                className="bg-[#121212] border border-white/10 focus:border-white/30 rounded-full px-4 py-2 pl-10 text-neutral-100 text-sm outline-none w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            </div>
            <button
              className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus size={20} className="mr-2" />
              Add
            </button>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-[#121212] border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15">
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/15">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-light text-white">
                          {employee.first_name} {employee.last_name}
                        </div>
                        <div className="text-sm text-neutral-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-300">{employee.job_title}</td>
                  <td className="px-6 py-4 text-sm">
                    {employee.role !== 'manager' ? (
                      <button
                        className="text-neutral-400 hover:text-red-400 transition-colors"
                        onClick={() => handleRemoveEmployee(employee.id)}
                      >
                        <UserMinus size={20} />
                      </button>
                    ) : (
                      <span className="text-neutral-500 text-xs">Manager</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#121212] border border-white/15 p-6 rounded-lg w-96">
              <h2 className="text-lg font-light text-white mb-6">Add New Employee</h2>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="w-full bg-[#0b0b0b] border border-white/10 focus:border-white/30 text-neutral-100 px-4 py-2 rounded-lg mb-3 outline-none"
                value={newEmployee.first_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="w-full bg-[#0b0b0b] border border-white/10 focus:border-white/30 text-neutral-100 px-4 py-2 rounded-lg mb-3 outline-none"
                value={newEmployee.last_name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-[#0b0b0b] border border-white/10 focus:border-white/30 text-neutral-100 px-4 py-2 rounded-lg mb-3 outline-none"
                value={newEmployee.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                className="w-full bg-[#0b0b0b] border border-white/10 focus:border-white/30 text-neutral-100 px-4 py-2 rounded-lg mb-3 outline-none"
                value={newEmployee.job_title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                className="w-full bg-[#0b0b0b] border border-white/10 text-neutral-400 px-4 py-2 rounded-lg mb-3 outline-none"
                value={newEmployee.company_name}
                onChange={handleInputChange}
                disabled
              />
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-lg border border-white/15 text-neutral-300 hover:bg-neutral-900/30 transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  onClick={handleAddEmployee}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;