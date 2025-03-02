'use client'
import React, { useState } from 'react';
import { Search, UserPlus, UserMinus, BarChart2, FolderOpen } from 'lucide-react';
import { CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const AccountsPage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', phone: '', department: '' });

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
      setEmployees([...employees, { 
        ...newEmployee, 
        id: employees.length + 1, 
        joinDate: new Date().toISOString().split('T')[0], 
        completedCourses: 0, 
        activeCourses: 0 
      }]);
      setNewEmployee({ name: '', email: '', phone: '', department: '' });
      setShowAddModal(false);
    }
  };

  const handleRemoveEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const StatCard = ({ title, value, trend, data, color, percentageChange }) => (
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

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Accounts</h1>
          <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
            Save
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employees.length}
            trend="Active accounts"
            data={activeUsersTrend}
            color="green"
            percentageChange={12}
          />
          
          <StatCard
            title="Active Courses"
            value={employees.reduce((sum, emp) => sum + emp.activeCourses, 0)}
            trend="Currently in progress"
            data={activeUsersTrend}
            color="blue"
            percentageChange={5}
          />
          
          <StatCard
            title="Completed Courses"
            value={employees.reduce((sum, emp) => sum + emp.completedCourses, 0)}
            trend="15 completed this month"
            data={completedCourseTrend}
            color="purple"
            percentageChange={18}
          />
        </div>

        {/* Search and Add Employee */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
          <div className="flex space-x-3">
            <button
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              onClick={() => console.log('Import clicked')}
            >
              <FolderOpen size={20} className="mr-2" />
              Import
            </button>
            <button
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus size={20} className="mr-2" />
              Add
            </button>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{employee.name}</div>
                        <div className="text-sm text-gray-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{employee.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{employee.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Completed: {employee.completedCourses}</div>
                    <div className="text-sm text-gray-300">Active: {employee.activeCourses}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        onClick={() => handleRemoveEmployee(employee.id)}
                      >
                        <UserMinus size={20} />
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

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#181b24] border border-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-lg font-base mb-6">Add New Employee</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
                value={newEmployee.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
                value={newEmployee.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
                value={newEmployee.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:border-gray-700"
                value={newEmployee.department}
                onChange={handleInputChange}
              />
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-800 transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 transition-colors"
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