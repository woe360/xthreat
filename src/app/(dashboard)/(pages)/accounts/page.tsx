// 'use client'
// import React, { useState } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

// const AccountsPage = () => {
//   const [employees, setEmployees] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({ name: '', email: '', phone: '', department: '' });

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       setEmployees([...employees, { ...newEmployee, id: employees.length + 1, joinDate: new Date().toISOString().split('T')[0], completedCourses: 0, activeCourses: 0 }]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Accounts Overview</h1>

//       {/* Search and Add Employee */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search employees..."
//             className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//           onClick={() => setShowAddModal(true)}
//         >
//           <UserPlus size={20} className="mr-2" />
//           Add Employee
//         </button>
//       </div>

//       {/* Employee List */}
//       <div className="bg-gray-800 rounded-lg overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-700">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Courses</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.id}>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium">{employee.name}</div>
//                       <div className="text-sm text-gray-400">{employee.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">{employee.department}</td>
//                 <td className="px-6 py-4 text-sm">{employee.joinDate}</td>
//                 <td className="px-6 py-4 text-sm">
//                   <div>Completed: {employee.completedCourses}</div>
//                   <div>Active: {employee.activeCourses}</div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button
//                     className="text-red-400 hover:text-red-300 mr-2"
//                     onClick={() => handleRemoveEmployee(employee.id)}
//                   >
//                     <UserMinus size={20} />
//                   </button>
//                   <button className="text-blue-400 hover:text-blue-300">
//                     <BarChart2 size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Employee Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.name}
//               onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.email}
//               onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.phone}
//               onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
//             />
//             <input
//               type="text"
//               placeholder="Department"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
//               value={newEmployee.department}
//               onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleAddEmployee}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountsPage;



// 'use client'
// import React, { useState, ChangeEvent } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
//   joinDate: string;
//   completedCourses: number;
//   activeCourses: number;
// }

// interface NewEmployee {
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
// }

// const AccountsPage = () => {
//   const [employees, setEmployees] = useState<Employee[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState<NewEmployee>({ 
//     name: '', 
//     email: '', 
//     phone: '', 
//     department: '' 
//   });

//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       const newEmployeeWithDetails: Employee = {
//         ...newEmployee,
//         id: employees.length + 1,
//         joinDate: new Date().toISOString().split('T')[0],
//         completedCourses: 0,
//         activeCourses: 0
//       };
//       setEmployees([...employees, newEmployeeWithDetails]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id: number) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Accounts Overview</h1>

//       {/* Search and Add Employee */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search employees..."
//             className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//           onClick={() => setShowAddModal(true)}
//         >
//           <UserPlus size={20} className="mr-2" />
//           Add Employee
//         </button>
//       </div>

//       {/* Employee List */}
//       <div className="bg-gray-800 rounded-lg overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-700">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Courses</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.id}>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium">{employee.name}</div>
//                       <div className="text-sm text-gray-400">{employee.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">{employee.department}</td>
//                 <td className="px-6 py-4 text-sm">{employee.joinDate}</td>
//                 <td className="px-6 py-4 text-sm">
//                   <div>Completed: {employee.completedCourses}</div>
//                   <div>Active: {employee.activeCourses}</div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button
//                     className="text-red-400 hover:text-red-300 mr-2"
//                     onClick={() => handleRemoveEmployee(employee.id)}
//                   >
//                     <UserMinus size={20} />
//                   </button>
//                   <button className="text-blue-400 hover:text-blue-300">
//                     <BarChart2 size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Employee Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.name}
//               onChange={handleInputChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.email}
//               onChange={handleInputChange}
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.phone}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="department"
//               placeholder="Department"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
//               value={newEmployee.department}
//               onChange={handleInputChange}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleAddEmployee}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountsPage;


// 'use client'
// import React, { useState, ChangeEvent } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
//   joinDate: string;
//   completedCourses: number;
//   activeCourses: number;
// }

// interface NewEmployee {
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
// }

// const AccountsPage = () => {
//   const [employees, setEmployees] = useState<Employee[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState<NewEmployee>({
//     name: '',
//     email: '',
//     phone: '',
//     department: ''
//   });

//   // Existing handlers remain unchanged
//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       const newEmployeeWithDetails: Employee = {
//         ...newEmployee,
//         id: employees.length + 1,
//         joinDate: new Date().toISOString().split('T')[0],
//         completedCourses: 0,
//         activeCourses: 0
//       };
//       setEmployees([...employees, newEmployeeWithDetails]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id: number) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[#0D1018] text-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-semibold text-white mb-8">Accounts</h1>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Total Employees</h3>
//               <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+12%</span>
//             </div>
//             <p className="text-3xl font-bold">{employees.length}</p>
//             <div className="mt-4 h-12 bg-[#0D1018]"></div>
//           </div>
          
//           <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Active Courses</h3>
//               <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+5%</span>
//             </div>
//             <p className="text-3xl font-bold">
//               {employees.reduce((sum, emp) => sum + emp.activeCourses, 0)}
//             </p>
//             <div className="mt-4 h-12 bg-[#0D1018]"></div>
//           </div>
          
//           <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Completed Courses</h3>
//               <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">+18%</span>
//             </div>
//             <p className="text-3xl font-bold">
//               {employees.reduce((sum, emp) => sum + emp.completedCourses, 0)}
//             </p>
//             <div className="mt-4 h-12 bg-[#0D1018]"></div>
//           </div>
//         </div>

//         {/* Search and Add Employee */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search employees..."
//               className="bg-[#0D1018] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
//           </div>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
//             onClick={() => setShowAddModal(true)}
//           >
//             <UserPlus size={20} className="mr-2" />
//             Add Employee
//           </button>
//         </div>

//         {/* Employee List */}
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-800">
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Courses</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800">
//               {filteredEmployees.map((employee) => (
//                 <tr key={employee.id} className="hover:bg-gray-900/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div>
//                         <div className="text-sm font-medium text-white">{employee.name}</div>
//                         <div className="text-sm text-gray-400">{employee.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.department}</td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.joinDate}</td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-300">Completed: {employee.completedCourses}</div>
//                     <div className="text-sm text-gray-300">Active: {employee.activeCourses}</div>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <div className="flex space-x-3">
//                       <button
//                         className="text-gray-400 hover:text-red-400 transition-colors"
//                         onClick={() => handleRemoveEmployee(employee.id)}
//                       >
//                         <UserMinus size={20} />
//                       </button>
//                       <button className="text-gray-400 hover:text-blue-400 transition-colors">
//                         <BarChart2 size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add Employee Modal */}
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
//             <div className="bg-[#0D1018] border border-gray-800 p-6 rounded-lg w-96">
//               <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="w-full bg-[#0D1018] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.name}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full bg-[#0D1018] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.email}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone"
//                 className="w-full bg-[#0D1018] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.phone}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Department"
//                 className="w-full bg-[#0D1018] border border-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.department}
//                 onChange={handleInputChange}
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   className="px-4 py-2 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-800 transition-colors"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                   onClick={handleAddEmployee}
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountsPage;



// 'use client'
// import React, { useState, ChangeEvent } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
//   joinDate: string;
//   completedCourses: number;
//   activeCourses: number;
// }

// interface NewEmployee {
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
// }

// const AccountsPage = () => {
//   const [employees, setEmployees] = useState<Employee[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState<NewEmployee>({
//     name: '',
//     email: '',
//     phone: '',
//     department: ''
//   });

//   // Existing handlers remain unchanged
//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       const newEmployeeWithDetails: Employee = {
//         ...newEmployee,
//         id: employees.length + 1,
//         joinDate: new Date().toISOString().split('T')[0],
//         completedCourses: 0,
//         activeCourses: 0
//       };
//       setEmployees([...employees, newEmployeeWithDetails]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id: number) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-semibold text-white mb-8">Accounts</h1>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Total Employees</h3>
//               <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+12%</span>
//             </div>
//             <p className="text-3xl font-bold">{employees.length}</p>
//             <div className="mt-4 h-12 bg-[#050607]"></div>
//           </div>
          
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Active Courses</h3>
//               <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+5%</span>
//             </div>
//             <p className="text-3xl font-bold">
//               {employees.reduce((sum, emp) => sum + emp.activeCourses, 0)}
//             </p>
//             <div className="mt-4 h-12 bg-[#050607]"></div>
//           </div>
          
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-gray-400 text-sm">Completed Courses</h3>
//               <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">+18%</span>
//             </div>
//             <p className="text-3xl font-bold">
//               {employees.reduce((sum, emp) => sum + emp.completedCourses, 0)}
//             </p>
//             <div className="mt-4 h-12 bg-[#050607]"></div>
//           </div>
//         </div>

//         {/* Search and Add Employee */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search employees..."
//               className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
//           </div>
//           <button
//             className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200  font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
//             onClick={() => setShowAddModal(true)}
//           >
//             <UserPlus size={20} className="mr-2" />
//             Add Employee
//           </button>
//         </div>

//         {/* Employee List */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-800">
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Courses</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800">
//               {filteredEmployees.map((employee) => (
//                 <tr key={employee.id} className="hover:bg-gray-900/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div>
//                         <div className="text-sm font-medium text-white">{employee.name}</div>
//                         <div className="text-sm text-gray-400">{employee.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.department}</td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.joinDate}</td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-300">Completed: {employee.completedCourses}</div>
//                     <div className="text-sm text-gray-300">Active: {employee.activeCourses}</div>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <div className="flex space-x-3">
//                       <button
//                         className="text-gray-400 hover:text-red-400 transition-colors"
//                         onClick={() => handleRemoveEmployee(employee.id)}
//                       >
//                         <UserMinus size={20} />
//                       </button>
//                       <button className="text-gray-400 hover:text-blue-400 transition-colors">
//                         <BarChart2 size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add Employee Modal */}
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
//             <div className="bg-[#050607] border border-gray-800 p-6 rounded-lg w-96">
//               <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.name}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.email}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.phone}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Department"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.department}
//                 onChange={handleInputChange}
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   className="px-4 py-2 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-800 transition-colors"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                   onClick={handleAddEmployee}
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountsPage;





// 'use client'
// import React, { useState, ChangeEvent } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
//   joinDate: string;
//   completedCourses: number;
//   activeCourses: number;
// }

// interface NewEmployee {
//   name: string;
//   email: string;
//   phone: string;
//   department: string;
// }

// const AccountsPage = () => {
//   // Mock data for trend visualizations
//   const employeeTrend = [
//     { month: 'Jan', value: 8 },
//     { month: 'Feb', value: 10 },
//     { month: 'Mar', value: 12 },
//     { month: 'Apr', value: 15 },
//     { month: 'May', value: 18 },
//     { month: 'Jun', value: 20 },
//   ];

//   const activeCourseTrend = [
//     { month: 'Jan', value: 25 },
//     { month: 'Feb', value: 28 },
//     { month: 'Mar', value: 30 },
//     { month: 'Apr', value: 35 },
//     { month: 'May', value: 38 },
//     { month: 'Jun', value: 42 },
//   ];

//   const completedCourseTrend = [
//     { month: 'Jan', value: 45 },
//     { month: 'Feb', value: 52 },
//     { month: 'Mar', value: 58 },
//     { month: 'Apr', value: 65 },
//     { month: 'May', value: 72 },
//     { month: 'Jun', value: 80 },
//   ];

//   const [employees, setEmployees] = useState<Employee[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState<NewEmployee>({
//     name: '',
//     email: '',
//     phone: '',
//     department: ''
//   });

//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       const newEmployeeWithDetails: Employee = {
//         ...newEmployee,
//         id: employees.length + 1,
//         joinDate: new Date().toISOString().split('T')[0],
//         completedCourses: 0,
//         activeCourses: 0
//       };
//       setEmployees([...employees, newEmployeeWithDetails]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id: number) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const StatCard = ({ title, value, trend, data, color, percentageChange }) => (
//     <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-gray-400 text-sm">{title}</h3>
//         <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
//           +{percentageChange}%
//         </span>
//       </div>
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="text-3xl font-bold mb-1">{value}</p>
//           <p className="text-sm text-gray-400">{trend}</p>
//         </div>
//         <div className="w-32 h-16">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke={`var(--${color}-500)`}
//                 strokeWidth={2}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 px-10 p-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-xl font-base text-white mb-8 mt-3">Accounts</h1>

//         {/* Enhanced Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             title="Total Employees"
//             value={employees.length}
//             trend="8 new this month"
//             data={employeeTrend}
//             color="green"
//             percentageChange={12}
//           />
          
//           <StatCard
//             title="Active Courses"
//             value={employees.reduce((sum, emp) => sum + emp.activeCourses, 0)}
//             trend="42 courses in progress"
//             data={activeCourseTrend}
//             color="blue"
//             percentageChange={5}
//           />
          
//           <StatCard
//             title="Completed Courses"
//             value={employees.reduce((sum, emp) => sum + emp.completedCourses, 0)}
//             trend="15 completed this month"
//             data={completedCourseTrend}
//             color="purple"
//             percentageChange={18}
//           />
//         </div>

//         {/* Rest of the component remains the same */}
//         {/* Search and Add Employee */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search employees..."
//               className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
//           </div>
//           <button
//             className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
//             onClick={() => setShowAddModal(true)}
//           >
//             <UserPlus size={20} className="mr-2" />
//             Add
//           </button>
//         </div>

//         {/* Employee List */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-800">
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Courses</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800">
//               {filteredEmployees.map((employee) => (
//                 <tr key={employee.id} className="hover:bg-gray-900/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div>
//                         <div className="text-sm font-medium text-white">{employee.name}</div>
//                         <div className="text-sm text-gray-400">{employee.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.department}</td>
//                   <td className="px-6 py-4 text-sm text-gray-300">{employee.joinDate}</td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-300">Completed: {employee.completedCourses}</div>
//                     <div className="text-sm text-gray-300">Active: {employee.activeCourses}</div>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <div className="flex space-x-3">
//                       <button
//                         className="text-gray-400 hover:text-red-400 transition-colors"
//                         onClick={() => handleRemoveEmployee(employee.id)}
//                       >
//                         <UserMinus size={20} />
//                       </button>
//                       <button className="text-gray-400 hover:text-blue-400 transition-colors">
//                         <BarChart2 size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add Employee Modal */}
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
//             <div className="bg-[#050607] border border-gray-800 p-6 rounded-lg w-96">
//               <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.name}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.email}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.phone}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Department"
//                 className="w-full bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:border-gray-700"
//                 value={newEmployee.department}
//                 onChange={handleInputChange}
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   className="px-4 py-2 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-800 transition-colors"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                   onClick={handleAddEmployee}
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountsPage;

'use client'
import React, { useState, ChangeEvent } from 'react';
import { Search, UserPlus, UserMinus, BarChart2, FolderOpen } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string;
  completedCourses: number;
  activeCourses: number;
}

interface NewEmployee {
  name: string;
  email: string;
  phone: string;
  department: string;
}

const AccountsPage = () => {
  // Mock data for trend visualizations
  const employeeTrend = [
    { month: 'Jan', value: 8 },
    { month: 'Feb', value: 10 },
    { month: 'Mar', value: 12 },
    { month: 'Apr', value: 15 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 20 },
  ];

  const activeCourseTrend = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 28 },
    { month: 'Mar', value: 30 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 38 },
    { month: 'Jun', value: 42 },
  ];

  const completedCourseTrend = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 58 },
    { month: 'Apr', value: 65 },
    { month: 'May', value: 72 },
    { month: 'Jun', value: 80 },
  ];

  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: '',
    email: '',
    phone: '',
    department: ''
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
      const newEmployeeWithDetails: Employee = {
        ...newEmployee,
        id: employees.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        completedCourses: 0,
        activeCourses: 0
      };
      setEmployees([...employees, newEmployeeWithDetails]);
      setNewEmployee({ name: '', email: '', phone: '', department: '' });
      setShowAddModal(false);
    }
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      {/* Removed max-w-7xl mx-auto to match other pages */}
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Accounts</h1>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employees.length}
            trend="8 new this month"
            data={employeeTrend}
            color="green"
            percentageChange={12}
          />
          
          <StatCard
            title="Active Courses"
            value={employees.reduce((sum, emp) => sum + emp.activeCourses, 0)}
            trend="42 courses in progress"
            data={activeCourseTrend}
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
          <button
            className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
            onClick={() => setShowAddModal(true)}
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

        {/* Employee List */}
        <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-[#050607] border border-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
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
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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